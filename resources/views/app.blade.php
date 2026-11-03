<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#DB2777">
    <meta name="description" content="MySembako - Belanja sembako dan kebutuhan dapur segar langsung dari warung dan toko terdekat.">
    <title>MySembako - Belanja Sembako Terdekat &amp; Terpercaya</title>
    <link rel="icon" type="image/svg+xml" href="/icon/Logo_Mysembako.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    {{-- Vite React preamble for @vitejs/plugin-react (required for React Refresh) --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @if (app()->environment('local'))
        @if (!file_exists(public_path('hot')))
            <script>
                console.warn('Vite dev server tidak berjalan. Silakan jalankan: npm run dev');
            </script>
        @endif
    @endif
</head>
<body>
    <div id="app"></div>
</body>
</html>

