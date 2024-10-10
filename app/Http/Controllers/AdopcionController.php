<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mascota;
use App\Models\ImagenMascota;
use Inertia\Inertia;

class AdopcionController extends Controller
{
    public function index() {
        $mascotas = Mascota::with(['imagenes', 'tipo', 'usuario'])
            ->where('publicado', true)
            ->where('adoptado', false)
            ->get();

        return Inertia::render('Mascotas', [
            'mascotas' => $mascotas,
        ]);
    }

    public function show($id) {
        $mascota = Mascota::with(['imagenes', 'tipo', 'usuario'])
            ->find($id);
        
        return Inertia::render('Mascota', [
            'mascota' => $mascota,
        ]);
    }

    public function create()
    {
        return Inertia::render('Adopcion/PostAdoptionForm');
    }

    public function store(Request $request)
    {

        $mascota = Mascota::create([
            'tipo_id' => $request->tipo,
            'descripcion' => $request->descripcion,
            'peso' => $request->peso,
            'edad' => $request->edad,
            'sexo' => $request->sexo,
            'user_id' => auth()->user()->id,
        ]);

        $imagenes = $request->file('imagenes');
        if ($imagenes != null) {
            foreach ($imagenes as $imagen) {
                $nombre = $imagen->getClientOriginalName();
                $nombreUnico = uniqid() . '_' . $nombre;
                $imagen->storeAs('public/mascotas', $nombreUnico, );
                $tempFilePath = 'storage/mascotas/' . $nombreUnico;

                ImagenMascota::create([
                    'url' => $tempFilePath,
                    'mascota_id' => $mascota->id,
                ]);
            }
        }

        return response([
            'mensaje' => 'Creado',
        ], 200);

    }

    public function myadoptions()
    {
        $mascotas = Mascota::with(['imagenes', 'tipo', 'usuario'])->where('user_id', auth()->user()->id)->get();

        return Inertia::render('Adopcion/MyAdoptions', [
            'mascotas' => $mascotas,
        ]);
    }

    public function update() {

    }

    public function delete($id) {
        $mascota = Mascota::find($id);
        $mascota->delete();

        return [
            "mensaje" => "Mascota eliminada correctamente"
        ];
    }

    public function directmessage($id) {
        $mascota = Mascota::find($id);
        return Inertia::render('DirectMessage', [
            'mascota' => $mascota
        ]);
    }

}
