<?php

use App\Http\Controllers\ContactController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrgDashboard;
use Illuminate\Foundation\Application;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdopcionController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;

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
Route::get('/adopciones', [AdopcionController::class, 'index'])->name('mascotas.all');
Route::get('/mascotas/{id}', [AdopcionController::class, 'show'])->name('mascotas.show');
Route::get('/contactanos', [ContactController::class, 'create'])->name('contactanos');
Route::post('/contactanos', [ContactController::class, 'store'])->name('contactanos.store');

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::delete('/adopcion/eliminar/{id}', [AdopcionController::class, 'delete']);
    Route::post('/dar-adopcion/store', [AdopcionController::class, 'store'])->name('adopcion.store');
    Route::patch('/dar-adopcion/update/{id}', [AdopcionController::class, 'update']);
    Route::get('/myadoptions', [AdopcionController::class, 'myadoptions']);

    Route::post('/send/message', [ChatController::class, 'store']);
    Route::get('/chats', [ChatController::class, 'index']);
    Route::get('/chats/{id}', [ChatController::class, 'show']);
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/org.php';
