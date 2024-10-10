<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        /*if(auth()->user()->hasRole('Administrador')) {
            return redirect()->intended('/panel/admin');
        }

        if(auth()->user()->hasRole('Organizacion')) {
            return redirect()->intended('/panel/organizacion');
        }

        return redirect()->intended(RouteServiceProvider::HOME);*/
        $user = auth()->user();
        $userArray = $user->toArray();
        $userArray['roles'] = $user->getRoleNames();

        return response()->json($userArray);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function google() {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'password' => 'hola',
                'photo' => $googleUser->getAvatar(),
            ]
        );

        Auth::login($user);

        $userAgent = request()->header('User-Agent');

    // Patrón para detectar dispositivos móviles
        $esMovil = preg_match('/mobile|android|iphone|ipad|ipod|windows phone/i', $userAgent);

        if ($esMovil) {
            return redirect()->intended();
        } else {
            return view('redirect'); 
        }
    }
}
