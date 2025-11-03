<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - MySembako</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background:#fafafa; margin:0; }
        .page { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; }
        .container { width:100%; max-width: 560px; margin: 0 auto; background:#fff; padding:32px; border-radius:12px; box-shadow:0 10px 24px rgba(0,0,0,.06); }
        h1 { font-size: 22px; margin: 0 0 6px; text-align:center; }
        p.muted { color:#666; font-size:12px; text-align:center; margin-top:0; }
        a { color:#2563eb; text-decoration:none; }
        .field { margin: 12px 0; }
        .field input { width:100%; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; background:#fcfcfd; outline:none; }
        .btn { width:100%; padding:12px; border:0; border-radius:10px; background:#ef6b49; color:#fff; font-weight:600; cursor:pointer; }
        .btn:hover { background:#e15536; }
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
        <h1>Create New Account</h1>
        <p class="muted">Already have an account? <a href="{{ route('login') }}">Login</a>.</p>

        <form id="register-form" method="POST" action="{{ route('register.submit') }}">
            @csrf
            @if ($errors->any())
                <div style="background:#fff1f2;border:1px solid #fecdd3;color:#9f1239;padding:10px;border-radius:8px;margin-bottom:10px;">
                    <ul style="margin:0;padding-left:18px;">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            @if (session('success'))
                <div style="background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;padding:10px;border-radius:8px;margin-bottom:10px;">
                    {{ session('success') }}
                </div>
            @endif
            <div class="field">
                <input type="text" name="name" placeholder="Name" value="{{ old('name') }}" required>
            </div>
            <div class="field">
                <input type="email" name="email" placeholder="Email" value="{{ old('email') }}" required>
            </div>
            <div class="field">
                <input type="password" name="password" placeholder="Password" required>
            </div>
            <div class="field">
                <input type="password" name="password_confirmation" placeholder="Confirm Password" required>
            </div>
            <button class="btn" type="submit">Sign Up</button>
        </form>
    </div>
    </div>
</body>
</html>


