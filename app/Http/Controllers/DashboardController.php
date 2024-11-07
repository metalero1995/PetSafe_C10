<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Publicacion;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if(auth()->user()->hasRole('Administrador')) {
            return Inertia::render('Admin/Dashboard');
        }

        if(auth()->user()->hasRole('Organizacion')) {
            $posts = Publicacion::where('user_id', auth()->user()->id)
                ->with([
                    'imagenes:id,url,created_at,publicacion_id',
                    'org:id,nombre_organizacion,photo',
                ])
                ->get();
            return Inertia::render('Organizacion/Dashboard', [
                'posts' => $posts,
            ]);
        }

        return redirect()->back();
    }
}
