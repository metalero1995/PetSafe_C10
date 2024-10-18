<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    
    use RefreshDatabase;

    public function test_creacion_usuario(): void
    {
        $user = User::create([
            'name' => 'Uziel Admin',
            'email' => 'uzieladmin@petsafe.com',
            'password' => Hash::make('soyadmin'),
        ]);
        $this->assertInstanceOf(User::class, $user);
    }
}
