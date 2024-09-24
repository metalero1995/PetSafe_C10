<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Mascota;
use App\Models\Reporte;
use Inertia\Inertia;

class LandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $mascotas = Mascota::latest()->take(4)->get();
        $reportes = Reporte::latest()->take(4)->get();

        return Inertia::render('Welcome', [
            'mascotas' => $mascotas,
            'reportes' => $reportes,
        ]);

        //return view('welcome', compact('mascotas', 'reportes'));
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
        //
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
