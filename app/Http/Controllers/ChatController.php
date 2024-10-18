<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Mascota;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chats = Chat::obtenerChatsDeUsuario(auth()->user()->id);
        return Inertia::render("Chats", [
            "chats" => $chats,
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'mascotaId' => 'required',
            'contenido' => 'required',
        ]);

        $userId = auth()->user()->id;

        $chat = Chat::where('mascota_id', $request->mascotaId)
                ->where(function ($query) use ($userId) {
                    $query->where('owner_id', $userId)
                        ->orWhere('user_id', $userId);
                })
                ->first();

        if($chat != null) {

            $chat->mensajes()->create([
                'user_id' => $userId,
                'contenido' => $request->contenido,
            ]);

            return [
                "mensaje" => "Mensaje enviado",
            ];

        } else {

            $mascota = Mascota::find($request->mascotaId);
            $nuevoChat = Chat::create([
                'user_id' => $userId,
                'owner_id' => $mascota->usuario->id,
                'mascota_id' => $mascota->id,
            ]);
            $nuevoChat->mensajes()->create([
                'user_id' => $userId,
                'contenido' => $request->contenido,
            ]);

            return [
                "mensaje" => "Mensaje enviado",
            ];
        }
    }

    public function show(Chat $chat)
    {
        return $chat->mensajes;
        return Inertia::render("Chat", [
            "mensaje" => $chat->mensajes,
            "mascota" => $chat->mascota
        ]);
    }

    public function destroy(Chat $chat)
    {
        $chat->delete();
        return [
            "mensaje" => "Mensaje eliminado",
        ];
    }
}
