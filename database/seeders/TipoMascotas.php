<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TipoMascota;

class TipoMascotas extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TipoMascota::create([
            'nombre' => 'Perro'
        ]);

        TipoMascota::create([
            'nombre' => 'Gato'
        ]);
    }
}
