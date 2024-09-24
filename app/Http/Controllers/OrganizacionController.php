<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organizacion;

class OrganizacionController extends Controller
{
    public function index()
    {
        $organizaciones = Organizacion::all();
        return view('organizaciones.index', compact('organizaciones'));
    }

    public function create()
    {
        return view('organizaciones.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre_organizacion' => 'required|string|max:255',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'telefono' => 'required|string|max:20',
            'ubicacion' => 'required|string|max:255',
        ]);

        Organizacion::create($request->all());

        return redirect()->route('organizaciones.index')
                        ->with('success', 'Organización creada exitosamente.');
    }

    public function edit($id)
    {
        $organizacion = Organizacion::findOrFail($id);
        return view('organizaciones.edit', compact('organizacion'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre_organizacion' => 'required|string|max:255',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'telefono' => 'required|string|max:20',
            'ubicacion' => 'required|string|max:255',
        ]);

        $organizacion = Organizacion::findOrFail($id);
        $organizacion->update($request->all());

        return redirect()->route('organizaciones.index')
                        ->with('success', 'Organización actualizada exitosamente.');
    }

    public function destroy($id)
    {
        $organizacion = Organizacion::findOrFail($id);
        $organizacion->delete();

        return redirect()->route('organizaciones.index')
                        ->with('success', 'Organización eliminada exitosamente.');
    }

    public function allOrganizationsApi()
    {
        $organizaciones = Organizacion::all();
        return response()->json($organizaciones);
    }

}
