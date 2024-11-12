<?php

use App\Http\Controllers\CreatePasswordController;
use App\Http\Controllers\Org\ProfileController;
use App\Http\Controllers\Org\PublicacionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'org'])->group(function() {
    Route::get('/panel/org/profile', [ProfileController::class, 'edit'])->name('org.profile');

    Route::post('/org/post', [PublicacionController::class, 'store']);
    Route::patch('/org/post/update/{id}', [PublicacionController::class, 'update']);
});

Route::get('/createpassword/{token}', [CreatePasswordController::class, 'create']);
Route::post('/createpassword', [CreatePasswordController::class, 'store']);