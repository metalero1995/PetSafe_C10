<?php

namespace App\Models;

use App\Models\User;
use App\Models\Mascota;
use App\Models\Mensaje;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'mascota_id',
        'user_id',
        'owner_id',
    ];

    public static function obtenerChatsDeUsuario($userId)
    {
        return self::where('user_id', $userId)
            ->orWhere('owner_id', $userId)
            ->with([
                'ultimoMensaje:id,chat_id,user_id,contenido,created_at',
            ])
            ->select("id", "mascota_id", "user_id", "owner_id")
            ->get()
            ->sortByDesc(function ($chat) {
                return $chat->ultimoMensaje->created_at;
            })
            ->map(function ($chat) use ($userId) {
                // Determinar el otro usuario dependiendo de quién sea el usuario autenticado
                $otroUsuario = $chat->user_id == $userId ? $chat->owner : $chat->usuario;
                
                // Mantener solo el campo del otro usuario
                $chat->unsetRelation('usuario');
                $chat->unsetRelation('owner');
                $chat->person = [
                    "nombre" => $otroUsuario->name,
                    "foto" => $otroUsuario->photo,
                ];

                unset($chat->ultimoMensaje->id);
                unset($chat->ultimoMensaje->chat_id);
                unset($chat->user_id);
                unset($chat->owner_id);
    
                return $chat;
            })
            ->values() // Añadir este método para asegurar que la colección se convierte en un array indexado
            ->toArray();
    }

    public function mascota()
    {
        return $this->belongsTo(Mascota::class, 'mascota_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function mensajes()
    {
        return $this->hasMany(Mensaje::class, 'chat_id')->orderBy("created_at", "asc");
    }

    public function ultimoMensaje()
    {
        return $this->hasOne(Mensaje::class, 'chat_id')->latest();
    }
}
