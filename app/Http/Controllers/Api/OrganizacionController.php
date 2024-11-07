<?php

namespace App\Http\Controllers\Api;

use App\Models\Organizacion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrganizacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'nombre_organizacion' => 'required|string|max:255',
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-180,180',
            'telefono' => 'required|string|max:20',
            'ubicacion' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        Organizacion::create([
            'nombre_organizacion' => $request->nombre_organizacion,
            'telefono' => $request->telefono,
            'ubicacion' => $request->ubicacion,
            'latitud' => $request->lat,
            'longitud' => $request->lng,
            'user_id' => 1,
        ]);

        return [
            "mensaje" => "Organización creada",
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
