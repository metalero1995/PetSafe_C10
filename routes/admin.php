<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminDashboard;
use App\Http\Controllers\Admin\AdopcionController as AdminAdopcionController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\OrganizacionController;
use App\Http\Controllers\Org\ProfileController;

Route::middleware(['auth'])->group(function() {

    Route::get('/panel/admin/adopciones', [AdminAdopcionController::class, 'index'])->name('admin.adopciones');

    Route::post('/panel/admin/adopciones/publicar', [AdminAdopcionController::class, 'publish'])->name('adop.index');

    Route::get('/panel/admin/contacts', [ContactController::class, 'index'])->name('contacts.index');

    Route::get('/panel/admin/organizaciones', [OrganizacionController::class, 'index'])->name('org.index');

    Route::post('/panel/admin/organizaciones/store', [OrganizacionController::class, 'store'])->name('org.store');

    Route::post('/org/profile/photo', [ProfileController::class, 'updatePhoto']);

    Route::delete('/org/profile/deletePhoto', [ProfileController::class, 'deleteProfileImage']);
    Route::delete('/org/profile/deleteCover', [ProfileController::class, 'deleteCoverImage']);
});