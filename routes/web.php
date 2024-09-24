<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminDashboard;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdopcionController;
use App\Http\Controllers\Admin\AdopcionController as AdminAdopcionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/

Route::get('/', [LandingController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/panel/organizacion', [OrgDashboard::class, 'index'])->name('org.dashboard');

    Route::delete('/adopcion/eliminar/{id}', [AdopcionController::class, 'delete']);

    Route::post('/adopcion/publicar', [AdopcionController::class, 'publish']);
});

Route::middleware('auth')->group(function() {
    Route::get('/dar-adopcion', [AdopcionController::class, 'create'])->name('adopcion');
    Route::post('/dar-adopcion/store', [AdopcionController::class, 'store'])->name('adopcion.store');
    Route::get('/myadoptions', [AdopcionController::class, 'myadoptions']);

    Route::get('/app/directmessage/{id}', [AdopcionController::class, 'directmessage']);
});

Route::middleware('auth')->group(function() {
    Route::get('/panel/admin', [AdminDashboard::class, 'index'])->name('admin.dashboard');

    Route::get('/panel/admin/adopciones', [AdminAdopcionController::class, 'index']);

    Route::post('/panel/admin/adopciones/publicar', [AdminAdopcionController::class, 'publish']);
});

Route::get('/mascotas', [AdopcionController::class, 'index'])->name('mascotas.all');

require __DIR__.'/auth.php';
