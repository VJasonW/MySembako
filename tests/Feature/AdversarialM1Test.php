<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AdversarialM1Test extends TestCase
{
    /**
     * Test Category 1: DB Outage Resilience.
     * Ensure GET /login, GET /register, and GET / never attempt DB connection or fail when DB is dead.
     */
    public function test_get_routes_survive_dead_database_connection(): void
    {
        // Reconfigure DB connection to an unreachable IP and non-existent port
        Config::set('database.default', 'mysql');
        Config::set('database.connections.mysql.host', '192.0.2.1');
        Config::set('database.connections.mysql.port', 33999);
        Config::set('database.connections.mysql.options', [
            \PDO::ATTR_TIMEOUT => 1,
        ]);
        Config::set('session.driver', 'cookie');
        Config::set('cache.default', 'array');
        DB::purge('mysql');

        $endpoints = ['/login', '/register', '/'];
        foreach ($endpoints as $endpoint) {
            $response = $this->get($endpoint);
            $response->assertStatus(200);
        }
    }

    /**
     * Test Category 2: Corrupted, Tampered, and Oversized Cookies.
     * Ensure EncryptCookies and StartSession middleware don't throw unhandled 500 on bad cookies.
     */
    public function test_get_routes_survive_corrupted_and_tampered_cookies(): void
    {
        $corruptedCookies = [
            'mysembako_session' => 'completely_invalid_garbage_base64!@#$',
            'XSRF-TOKEN' => 'tampered_token_payload_without_signature',
            'large_cookie' => str_repeat('X', 3800),
            'null_byte_cookie' => "bad\0cookie\0data",
            'json_cookie' => '{"iv":"invalid","value":"garbage","mac":"bad"}',
        ];

        foreach ($corruptedCookies as $name => $val) {
            $response = $this->call('GET', '/login', [], [$name => $val]);
            $this->assertNotEquals(500, $response->getStatusCode(), "GET /login threw 500 with cookie $name");
            $response->assertStatus(200);

            $regResponse = $this->call('GET', '/register', [], [$name => $val]);
            $this->assertNotEquals(500, $regResponse->getStatusCode(), "GET /register threw 500 with cookie $name");
            $regResponse->assertStatus(200);
        }
    }

    /**
     * Test Category 3: Malformed & Extreme Query Parameters.
     * Ensure SQLi, XSS, null bytes, array injection, and long query strings do not crash the routes.
     */
    public function test_get_routes_survive_malformed_query_parameters(): void
    {
        $attackQueries = [
            'sqli' => "id=1' OR '1'='1'--",
            'xss' => 'redirect=<script>alert("xss")</script>',
            'null_byte' => 'name=test%00admin',
            'array_injection' => 'email[]=admin@example.com&email[]=attacker@example.com',
            'deep_array' => 'a[b][c][d][e][f]=deep',
            'huge_query' => 'param=' . str_repeat('A', 4000),
            'unicode_emoji' => 'q=🔥🚀💯💥',
            'empty_keys' => '&=&&=1&foo=',
        ];

        foreach ($attackQueries as $desc => $query) {
            $response = $this->get('/login?' . $query);
            $this->assertNotEquals(500, $response->getStatusCode(), "GET /login threw 500 with query: $desc");
            $response->assertStatus(200);

            $regResponse = $this->get('/register?' . $query);
            $this->assertNotEquals(500, $regResponse->getStatusCode(), "GET /register threw 500 with query: $desc");
            $regResponse->assertStatus(200);
        }
    }

    /**
     * Test Category 4: Alternate HTTP Methods.
     * Ensure HEAD and OPTIONS do not return 500.
     */
    public function test_get_routes_handle_head_and_options_methods(): void
    {
        foreach (['/login', '/register', '/'] as $endpoint) {
            $headResponse = $this->call('HEAD', $endpoint);
            $this->assertNotEquals(500, $headResponse->getStatusCode(), "HEAD $endpoint threw 500");
            $headResponse->assertStatus(200);

            $optionsResponse = $this->call('OPTIONS', $endpoint);
            $this->assertNotEquals(500, $optionsResponse->getStatusCode(), "OPTIONS $endpoint threw 500");
        }
    }

    /**
     * Test Category 5: Ephemeral / Temp Storage View Compilation.
     * Ensure Blade view compilation works smoothly when storage path / view compiled path is redirected.
     */
    public function test_views_compile_in_isolated_temp_directory(): void
    {
        $tempDir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'mys_test_views_' . uniqid();
        @mkdir($tempDir, 0755, true);

        try {
            Config::set('view.compiled', $tempDir);

            $loginRes = $this->get('/login');
            $loginRes->assertStatus(200);
            $loginRes->assertSee('Welcome to MySembako');

            $registerRes = $this->get('/register');
            $registerRes->assertStatus(200);
            $registerRes->assertSee('Create an Account');

            // Verify compiled blade files were created in temp dir
            $compiledFiles = glob($tempDir . DIRECTORY_SEPARATOR . '*.php');
            $this->assertGreaterThanOrEqual(2, count($compiledFiles), 'Compiled blade files were not created in temp storage');
        } finally {
            if (is_dir($tempDir)) {
                foreach (glob($tempDir . DIRECTORY_SEPARATOR . '*') as $file) {
                    @unlink($file);
                }
                @rmdir($tempDir);
            }
        }
    }

    /**
     * Test Category 6: Reverse Proxy Headers & Route Helper URL Generation.
     * Ensure route() inside views properly generates URLs under HTTPS reverse proxy conditions.
     */
    public function test_routes_render_correctly_under_reverse_proxy_headers(): void
    {
        $proxyHeaders = [
            'HTTP_X_FORWARDED_PROTO' => 'https',
            'HTTP_X_FORWARDED_FOR' => '203.0.113.195',
            'HTTP_X_FORWARDED_HOST' => 'mysembako.vercel.app',
            'HTTP_X_FORWARDED_PORT' => '443',
            'HTTPS' => 'on',
        ];

        $response = $this->call('GET', '/login', [], [], [], $proxyHeaders);
        $response->assertStatus(200);
        $content = $response->getContent();

        // Check that route('register') and route('login.submit') are present and contain https://
        $this->assertStringContainsString('https://mysembako.vercel.app/register', $content);
        $this->assertStringContainsString('https://mysembako.vercel.app/login', $content);

        $regResponse = $this->call('GET', '/register', [], [], [], $proxyHeaders);
        $regResponse->assertStatus(200);
        $regContent = $regResponse->getContent();

        $this->assertStringContainsString('https://mysembako.vercel.app/login', $regContent);
        $this->assertStringContainsString('https://mysembako.vercel.app/register', $regContent);
    }

    /**
     * Test Category 7: Rapid Sequential Stress Execution.
     * Run 50 rapid requests across auth endpoints to detect memory corruption or state leakage.
     */
    public function test_rapid_consecutive_requests_stability(): void
    {
        for ($i = 0; $i < 50; $i++) {
            $loginRes = $this->get('/login');
            $this->assertSame(200, $loginRes->getStatusCode());

            $regRes = $this->get('/register');
            $this->assertSame(200, $regRes->getStatusCode());
        }
    }
}
