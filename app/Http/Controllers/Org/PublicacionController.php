<?php

namespace App\Http\Controllers\Org;

use App\Http\Controllers\Controller;
use App\Models\ImagenPublicacion;
use App\Models\Organizacion;
use App\Models\Publicacion;
use App\Services\ImageService;
use Illuminate\Http\Request;

class PublicacionController extends Controller
{
    
    public function index()
    {
        $posts = Publicacion::with(['imagenes'])->where('user_id', auth()->user()->id)->get();
        
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $org = Organizacion::where('user_id', auth()->user()->id)->first();

        if(!$org) {
            return response()->json([
                "mensaje" => "No tienes los permisos",
            ], 403);
        };

        $publicacion = Publicacion::create([
            'user_id' => auth()->user()->id,
            'organizacion_id' => $org->id,
            'contenido' => $request->contenido,
        ]);

        $imagenes = $request->file('imagenes');
        if($imagenes != null) {
            foreach($imagenes as $imagen) {
                $url = ImageService::uploadImage($imagen, "posts");

                $publicacion->imagenes()->create([
                    'url' => $url,
                ]);
            }
        }

        return [
            "mensaje" => "Publicación creada correctamente",
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Publicacion::find($id);

        if($post)
        {
            $post->fill($request->only(['contenido']))->save();
        }

        $deletedImages = $request->deletedImages;
        if($deletedImages) {
            ImagenPublicacion::destroy($deletedImages);
        }

        $imagenes = $request->file('imagenes');
        if ($imagenes != null) {
            foreach ($imagenes as $imagen) {
                $url = ImageService::uploadImage($imagen, "posts");

                $post->imagenes()->create([
                    'url' => $url,
                ]);
            }
        }

        return [
            "mensaje" => "Publicación actualizada correctament",
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
