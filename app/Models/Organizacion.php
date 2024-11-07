<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizacion extends Model
{
    use HasFactory;

    protected $table = "organizaciones";

    protected $fillable = [
        'nombre_organizacion',
        'latitud',
        'longitud',
        'telefono',
        'ubicacion',
        'descripcion',
        'photo',
        'cover_photo',
        'user_id',
    ];
}
