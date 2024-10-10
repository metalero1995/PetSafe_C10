<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminDashboard;
use App\Http\Controllers\Admin\AdopcionController as AdminAdopcionController;

Route::middleware(['auth'])->group(function() {
    Route::get('/panel/admin', [AdminDashboard::class, 'index'])->name('admin.dashboard');

    Route::get('/panel/admin/adopciones', [AdminAdopcionController::class, 'index'])->name('admin.adopciones');

    Route::post('/panel/admin/adopciones/publicar', [AdminAdopcionController::class, 'publish']);
});