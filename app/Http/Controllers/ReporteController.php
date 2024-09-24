<?php

namespace App\Http\Controllers;

use App\Models\Reporte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReporteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reportes = Reporte::with('usuario')->get();
        return view('reportes.index', compact('reportes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('reportes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $request->validate([
            'tipo_mascota' => 'required|string|max:255',
            'foto_mascota' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'descripcion' => 'required|string',
            'ubicacion' => 'required|string|max:255',
        ]);

        // Manejo del archivo de imagen
        if ($request->hasFile('foto_mascota')) {
            $image = $request->file('foto_mascota');
            $imagePath = $image->store('mascotas', 'public'); // Guarda la imagen en storage/app/public/mascotas
        }

        $reporte = new Reporte([
            'user_id' => Auth::id(),
            'tipo_mascota' => $request->tipo_mascota,
            'foto_mascota' => $imagePath ?? null,
            'descripcion' => $request->descripcion,
            'ubicacion' => $request->ubicacion,
            'estado' => 'en proceso',
        ]);

        $reporte->save();

        return redirect()->route('reportes.index');
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
        $reporte = Reporte::findOrFail($id);

        if($reporte->user_id != auth()->user()->id) {
            return redirect()->back();
        }
        
        return view('reportes.edit', compact('reporte'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'tipo_mascota' => 'required|string|max:255',
            'foto_mascota' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'descripcion' => 'required|string',
            'ubicacion' => 'required|string|max:255',
            'estado' => 'required|string|in:en_proceso,cerrado',
        ]);

        $reporte = Reporte::findOrFail($id);

        if($reporte->user_id != auth()->user()->id) {
            return redirect()->back();
        }

        // Manejo del archivo de imagen
        if ($request->hasFile('foto_mascota')) {
            $image = $request->file('foto_mascota');
            $imagePath = $image->store('mascotas', 'public'); // Guarda la imagen en storage/app/public/mascotas
            $reporte->foto_mascota = $imagePath;
        }

        $reporte->update([
            'tipo_mascota' => $request->tipo_mascota,
            'descripcion' => $request->descripcion,
            'ubicacion' => $request->ubicacion,
            'estado' => $request->estado,
        ]);

        $reporte->save();

        return redirect()->route('reportes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reporte = Reporte::findOrFail($id);
        $reporte->delete();
        return redirect()->route('reportes.index');
    }

    public function dashboard()
    {
        $reporte = Reporte::where('user_id', Auth::id())->first(); // O la lógica que necesites para obtener el reporte
        return view('dashboard', ['reporte' => $reporte]);
    }

    public function allReportsApi()
    {
        $reportes = Reporte::all();
        return response()->json($reportes);
    }

}
