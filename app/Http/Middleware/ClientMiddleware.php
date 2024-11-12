<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class ClientMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if(!$user->hasRole('Miembro')) {
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
