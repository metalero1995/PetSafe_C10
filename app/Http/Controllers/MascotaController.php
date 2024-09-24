<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mascota;

class MascotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $mascotas = Mascota::where('user_id', auth()->user()->id)->get();
        return view('mascotas.index', compact('mascotas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('mascotas.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los campos
        $request->validate([
            'tipo' => 'required',
            'descripcion' => 'required',
            'imagen' => 'required|image|mimes:jpeg,png,svg|max:1024'
        ]);

        // Excluir el campo _token
        $mascota = $request->except('_token', 'imagen');

        // Manejar la carga de la imagen
        if ($imagen = $request->file('imagen')) {
            $rutaGuardarImagen = 'mascota-o/';
            $imagenMascota = date('YmdHis') . "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImagen, $imagenMascota);
            // Guardar la ruta de la imagen en los datos de la mascota
            $mascota['imagen'] = $rutaGuardarImagen . $imagenMascota;
        }

        $mascota['user_id'] = auth()->user()->id;

        // Crear el registro de la mascota
        Mascota::create($mascota);

        // Redirigir al índice de mascotas
        return redirect()->route('mascotas.index');
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
        $mascota = Mascota::findOrFail($id);

        if($mascota->user_id != auth()->user()->id) {
            return redirect()->back();
        }
        return view('mascotas.edit', compact('mascota'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mascota $mascota)
    {
        if($mascota->user_id != auth()->user()->id) {
            return redirect()->back();
        }
        // Validar los campos
        $request->validate([
            'tipo' => 'required',
            'descripcion' => 'required',
            'imagen' => 'nullable|image|mimes:jpeg,png,svg|max:1024'
        ]);
    
        $masc = $request->except(['imagen']);
        
        if ($imagen = $request->file('imagen')) {
            $rutaGuardarImagen = 'mascota-o/';
            $imagenMascota = date('YmdHis') . "." . $imagen->getClientOriginalExtension();
            $imagen->move(public_path($rutaGuardarImagen), $imagenMascota);
            // Guardar la ruta de la imagen en los datos de la mascota
            $masc['imagen'] = $rutaGuardarImagen . $imagenMascota;
        }
        
        $mascota->update($masc);
        
        return redirect()->route('mascotas.index')->with('success', 'Mascota actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $mascota = Mascota::findOrFail($id);

        if($mascota->user_id != auth()->user()->id) {
            return redirect()->back();
        }
        
        $mascota->delete();
        return redirect()->route('mascotas.index');
    }

    public function allPetsApi()
    {
        $mascotas = Mascota::all();
        return response()->json($mascotas);
    }

}
