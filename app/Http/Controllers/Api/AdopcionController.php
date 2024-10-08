<?php

namespace App\Http\Controllers\Api;

use App\Models\Mascota;
use Illuminate\Http\Request;
use App\Models\ImagenMascota;
use App\Http\Controllers\Controller;

class AdopcionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mascotas = Mascota::with(['imagenes', 'tipo', 'usuario'])
            ->where('publicado', true)
            ->where('adoptado', false)
            ->get();

        return [
            'mascotas' => $mascotas
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mascota = Mascota::with(['imagenes', 'tipo', 'usuario'])
            ->find($id);

        return [
            'mascota' => $mascota
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mascota = Mascota::find($id);
        $mascota->delete();

        return [
            "mensaje" => "Mascota eliminada correctamente"
        ];
    }
}