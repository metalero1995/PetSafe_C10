<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Uziel Admin',
            'email' => 'uzieladmin@petsafe.com',
            'password' => Hash::make('soyadmin'),
        ]);

        $user->assignRole('Administrador');


        $user2 = User::create([
            'name' => 'Uziel Org',
            'email' => 'uzielorg@petsafe.com',
            'password' => Hash::make('soyorg'),
        ]);

        $user2->assignRole('Organizacion');
        /*$user2 = User::find(1);
        $user2->assignRole('Cliente');*/
    }
}
