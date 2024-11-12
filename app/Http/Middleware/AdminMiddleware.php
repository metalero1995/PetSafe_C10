<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if(!$user->hasRole('Administrador')) {
            if($request->expectsJson()) {
                return response()->json([
                    'error' => 'No tienes permiso para acceder a esta ruta.'
                ], 403);
            };
            return redirect('/');
        };

        return $next($request);
    }
}
