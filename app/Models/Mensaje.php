<?php

namespace App\Models;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mensaje extends Model
{
    use HasFactory;

    protected $table = "mensajes";

    protected $fillable = [
        'chat_id',
        'user_id',
        'contenido',
    ];

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
