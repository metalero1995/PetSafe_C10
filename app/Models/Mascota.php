<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mascota extends Model
{
    protected $fillable = [
        'descripcion', 
        'user_id',
        'peso',
        'edad',
        'tipo_id',
        'publicado',
        'adoptado',
        'sexo',
        // otros campos que desees permitir para asignación masiva
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function imagenes()
    {
        return $this->hasMany(ImagenMascota::class, 'mascota_id');
    }

    public function tipo()
    {
        return $this->belongsTo(TipoMascota::class, 'tipo_id');
    }
}
