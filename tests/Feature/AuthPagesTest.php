<?php

namespace Tests\Feature;

use Tests\TestCase;

class AuthPagesTest extends TestCase
{
    /**
     * Test that the login page can be rendered via GET /login.
     */
    public function test_login_page_returns_successful_response(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertSee('Welcome to MySembako');
        $response->assertSee('loginForm');
    }

    /**
     * Test that the root path GET / renders the login page.
     */
    public function test_root_path_returns_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('id="app"', false);
    }

    /**
     * Test that the register page can be rendered via GET /register.
     */
    public function test_register_page_returns_successful_response(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
        $response->assertSee('Create an Account');
    }
}
