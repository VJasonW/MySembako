<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - MySembako</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background:#fafafa; margin:0; }
        .page { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; }
        .container { width:100%; max-width: 560px; margin: 0 auto; background:#fff; padding:32px; border-radius:12px; box-shadow:0 10px 24px rgba(0,0,0,.06); }
        h1 { font-size: 22px; margin: 0 0 6px; text-align:center; }
        p.muted { color:#666; font-size:12px; text-align:center; margin-top:0; }
        a { color:#2563eb; text-decoration:none; }
        .field { margin: 12px 0; }
        .field input { width:100%; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; background:#fcfcfd; outline:none; }
        .btn { width:100%; padding:12px; border:0; border-radius:10px; background:#f9b5a7; color:#222; font-weight:600; cursor:pointer; }
        .btn:hover { background:#f6a997; }
        .brand { font-weight:700; color:#ef6b49; }
    </style>
    <link rel="icon" href="/favicon.ico">
    </head>
<body>
    <div class="page">
    <div class="container">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <div style="width:20px; height:20px; background:#ef6b49; border-radius:4px;"></div>
            <div class="brand">MySembako</div>
        </div>
        <h1>Welcome to MySembako</h1>
        <p class="muted">New here? <a href="{{ route('register') }}">Create an account</a>.</p>

        <form id="login-form" method="POST" action="{{ route('login.submit') }}">
            @csrf
            <div class="field">
                <input type="text" name="username" placeholder="Username" required>
            </div>
            <div class="field">
                <input type="password" name="password" placeholder="Password" required>
            </div>
            <div style="text-align:right; margin-top:4px; font-size:12px; color:#777;">
                <a href="#" style="color:#9ca3af; text-decoration:none;">Forgot password?</a>
            </div>
            <button class="btn" type="submit" style="margin-top:12px;">Login</button>
            <div style="display:flex; align-items:center; gap:12px; margin:16px 0 0;">
                <div style="flex:1; height:1px; background:#e5e7eb;"></div>
                <div style="font-size:12px; color:#777;">or</div>
                <div style="flex:1; height:1px; background:#e5e7eb;"></div>
            </div>
            <div style="display:flex; justify-content:center; gap:14px; margin-top:10px;">
                <a href="#" title="Login with Google" style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:50%; border:1px solid #e5e7eb; background:#fff;">
                    <span style="font-weight:700; color:#ea4335;">G</span>
                </a>
                <a href="#" title="Login with Facebook" style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:50%; border:1px solid #e5e7eb; background:#fff;">
                    <span style="font-weight:700; color:#1877f2;">f</span>
                </a>
            </div>
        </form>
    </div>
    </div>
</body>
</html>


