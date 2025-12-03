<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>MySembako</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }
        #app {
            min-height: 100vh;
        }
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-size: 18px;
            color: #ef6b49;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="loading">Loading...</div>
    </div>
</body>
</html>

