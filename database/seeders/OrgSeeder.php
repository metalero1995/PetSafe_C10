<?php

namespace Database\Seeders;

use App\Models\Organizacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrgSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Organizacion::create([
            'nombre_organizacion' => "Prueba 1",
            'telefono' => "9831574359",
            'ubicacion' => "Colonia centro Av. Heroes",
            'latitud' => "18.508005",
            'longitud' => "-88.313735",
            'user_id' => 2,
        ]);
    }
}
