<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Mascota;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdopcionController extends Controller
{
    public function index() {
        $mascotas = Mascota::with(['imagenes', 'tipo', 'usuario'])
                        ->where('publicado', false)
                        ->where('adoptado', false)
                        ->get();

        return Inertia::render('Admin/Adoptions', [
            'mascotas' => $mascotas,
        ]);
    }

    public function publish(Request $request) {

        $mascota = Mascota::find($request->mascotaId);
        $mascota->publicado = true;
        $mascota->save();

        return [
            'mensaje' => 'ok',
        ];
    }
}
