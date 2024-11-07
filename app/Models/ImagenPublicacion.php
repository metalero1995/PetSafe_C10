<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenPublicacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'publicacion_id'
    ];
}
