<?php

namespace App\Http\Controllers;
use App\Models\Reporte;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    public function index()
    {
        $reportes = Reporte::all(); // Recuperar todos los reportes
        return view('publicaciones.index', compact('reportes'));
    }

    public function edit($id)
{
    $reporte = Reporte::findOrFail($id);
    return view('publicaciones.edit', compact('reporte'));
}

public function update(Request $request, $id)
{
    $reporte = Reporte::findOrFail($id);

    $reporte->tipo_mascota = $request->input('tipo_mascota');
    $reporte->descripcion = $request->input('descripcion');
    $reporte->ubicacion = $request->input('ubicacion');
    $reporte->estado = $request->input('estado');

    if ($request->hasFile('foto_mascota')) {
        $file = $request->file('foto_mascota');
        $path = $file->store('public/fotos_mascotas');
        $reporte->foto_mascota = $path;
    }

    $reporte->save();

    return redirect()->route('publicaciones.index')->with('success', 'Publicación actualizada correctamente');
}

}
