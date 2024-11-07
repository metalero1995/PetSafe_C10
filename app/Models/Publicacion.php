<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    use HasFactory;

    protected $table = "publicaciones";
    protected $fillable = [
        'contenido',
        'user_id',
        'organizacion_id',
    ];

    public function imagenes() {
        return $this->hasMany(ImagenPublicacion::class, 'publicacion_id');
    }

    public function org() {
        return $this->belongsTo(Organizacion::class, 'organizacion_id');
    }
}
