<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('contact.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Guardar los datos del formulario en la base de datos
        $contact = Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        // Datos del correo
        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'subject' => $request->input('subject'),
            'userMessage' => $request->input('message'), // Cambiado para evitar conflicto de nombre
        ];

        // Enviar correo de confirmación al usuario
        Mail::send('emails.contact', $data, function($message) use ($data) {
            $message->to($data['email'], $data['name'])
                    ->subject('Gracias por contactarnos-PetSafe');
        });

        return redirect()->back()->with('success', 'Tu mensaje ha sido enviado con éxito. Intentaremos atenderte lo más pronto posible.');
    }
}