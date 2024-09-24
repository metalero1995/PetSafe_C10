<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenMascota extends Model
{
    use HasFactory;

    protected $table = "imagenes_mascota";

    protected $fillable = [
        'url',
        'mascota_id',
    ];
}
