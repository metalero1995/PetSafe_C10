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
        //dd($chats);
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

    public function show($id)
    {
        $chat = Chat::with([
            "mensajes:id,contenido,chat_id,user_id,created_at", 
            "owner:id,name", 
            "usuario:id,name", 
            "mascota"
        ])->find($id);
        
        if($chat) {
            $userId = auth()->user()->id;

            if($chat->owner_id === $userId || $chat->user_id === $userId) {

                $otroUsuario = $chat->user_id == $userId ? $chat->owner : $chat->usuario;

                $chat->unsetRelation('usuario');
                $chat->unsetRelation('owner');
                $chat->person = [
                    "nombre" => $otroUsuario->name,
                    "foto" => $otroUsuario->photo,
                    "id" => $otroUsuario->id,
                ];

                unset($chat->user_id);
                unset($chat->owner_id);

                return Inertia::render("Chat", [
                    "chat" => $chat,
                ]);
            } else {
                return redirect()->back();
            }
        }

        return redirect()->back();

    }

    public function destroy(Chat $chat)
    {
        $chat->delete();
        return [
            "mensaje" => "Mensaje eliminado",
        ];
    }
}
