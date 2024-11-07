<?php

namespace App\Http\Controllers\Org;

use App\Http\Controllers\Controller;
use App\Models\Organizacion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        $user = auth()->user();
        $org = Organizacion::where('user_id', $user->id)->first();

        return Inertia::render('Organizacion/Profile/Edit', [
            'org' => $org,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    public function updatePhoto(Request $request)
    {
        $org = Organizacion::where('user_id', auth()->user()->id)->first();

        if(!$org)
        {
            return response()->json([
                "mensaje" => "No tienes los permisos"
            ], 403);
        }

        $photo = $request->file('photo');

        if($photo) {
            $nombre = $photo->getClientOriginalName();
            $nombreUnico = uniqid() . '_' . $nombre;
            $photo->storeAs('public/mascotas', $nombreUnico);
            $tempFilePath = 'storage/mascotas/' . $nombreUnico;
            $org->photo = $tempFilePath;
        };

        $coverPhoto = $request->file('cover_photo');

        if($coverPhoto) {
            $nombre = $coverPhoto->getClientOriginalName();
            $nombreUnico = uniqid() . '_' . $nombre;
            $coverPhoto->storeAs('public/mascotas', $nombreUnico);
            $tempFilePath = 'storage/mascotas/' . $nombreUnico;
            $org->cover_photo = $tempFilePath;
        };

        $org->save();

        return [
            "mensaje" => "Información actualizada",
        ];
    }

    public function deleteProfileImage()
    {
        $org = Organizacion::where('user_id', auth()->user()->id)->first();

        if(!$org)
        {
            return response()->json([
                "mensaje" => "No tienes los permisos"
            ], 403);
        }

        $org->photo = null;
        $org->save();

        return [
            "mensaje" => ""
        ];
    }

    public function deleteCoverImage()
    {
        $org = Organizacion::where('user_id', auth()->user()->id)->first();

        if(!$org)
        {
            return response()->json([
                "mensaje" => "No tienes los permisos"
            ], 403);
        }

        $org->cover_photo = null;
        $org->save();

        return [
            "mensaje" => ""
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
