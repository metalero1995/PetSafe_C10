<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Token;
use App\Models\Organizacion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class OrganizacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orgs = Organizacion::all();
        return Inertia::render('Admin/Orgs', [
            'orgs' => $orgs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'nombre_organizacion' => 'required|string|max:255',
            'latLng.lat' => 'required|numeric|between:-90,90',
            'latLng.lng' => 'required|numeric|between:-180,180',
            'telefono' => 'required|string|max:20',
            'ubicacion' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        $user = User::create([
            'name' => $request->nombre_organizacion,
            'email' => $request->email,
            'password' => 'hola',
        ]);

        $user->assignRole('Organizacion');

        $id = $user->id;

        $org = Organizacion::create([
            'nombre_organizacion' => $request->nombre_organizacion,
            'telefono' => $request->telefono,
            'ubicacion' => $request->ubicacion,
            'latitud' => $request->latLng->lat,
            'longitud' => $request->latLng->lng,
            'user_id' => $id,
        ]);

        $token = bin2hex(random_bytes(16));

        Token::create([
            'token' => $token,
            'user_id' => $user->id,
        ]);

        // Datos del correo
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'token' => $token,
        ];

        // Enviar correo de confirmación al usuario
        Mail::send('emails.createpassword', $data, function($message) use ($data) {
            $message->to($data['email'], $data['name'])
                    ->subject('Creación de cuenta');
        });

        return [
            "mensaje" => "Organización creada",
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
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
