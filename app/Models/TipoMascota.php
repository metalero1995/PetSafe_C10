<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoMascota extends Model
{
    use HasFactory;

    protected $table = "tipo_mascota";

    protected $fillable = [
        'nombre',
    ];
}
