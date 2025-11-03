<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class AuthPagesController extends BaseController
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function submitLogin(Request $request)
    {
        // This is a placeholder submit that simply redirects to index.
        // Implement real authentication later.
        return redirect()->route('index');
    }

    public function showRegister()
    {
        return view('auth.register');
    }

    public function submitRegister(Request $request)
    {
        // Validasi data input user
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Masukkan data ke database (gunakan model User)
        $user = new \App\Models\User();
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->password = bcrypt($validated['password']);
        $user->save();

        // Setelah berhasil register, redirect ke halaman login
        return redirect()->route('login')->with('success', 'Registration successful. Please log in.');
    }

    public function index()
    {
        return view('index');
    }
}


