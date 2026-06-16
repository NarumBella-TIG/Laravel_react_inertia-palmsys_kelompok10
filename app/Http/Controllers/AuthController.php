<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Tampilkan halaman register
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    // Proses register
    public function register(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email',
            'no_hp'        => 'nullable|string|max:20',
            'password'     => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'nama_lengkap'  => $request->nama_lengkap,
            'email'         => $request->email,
            'no_hp'         => $request->no_hp,
            'password_hash' => Hash::make($request->password),
            'role'          => 'pemilik',
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    // Tampilkan halaman login
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    // Proses login
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return back()->withErrors([
                'email' => 'Email atau password salah.',
            ]);
        }

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    // Logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}