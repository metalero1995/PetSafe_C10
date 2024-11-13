<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrgController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\AdopcionController;
use App\Http\Controllers\Api\ContactoController;
use App\Http\Controllers\Api\OrganizacionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/org', [OrganizacionController::class, 'store']);
Route::post('/contacto', [ContactoController::class, 'store']);

Route::get('/orgs', [OrgController::class, 'index']);
Route::get('/org', [OrgController::class], 'show');

Route::get('/mascotas', [AdopcionController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    Route::get('/mascotas/{id}', [AdopcionController::class, 'show']);
    Route::post('/mascotas', [AdopcionController::class, 'store']);
    Route::delete('/mascotas/{id}', [AdopcionController::class, 'destroy']);
    Route::patch('/mascotas/{id}', [AdopcionController::class, 'update']);

    Route::get('/mismascotas', [AdopcionController::class, 'myadoptions']);

    Route::post('/send/message', [ChatController::class, 'store']);
    Route::get('/chats', [ChatController::class, 'index']);
    Route::get('/chats/{id}', [ChatController::class, 'show']);
});

//Route::apiResource('adopcion', AdopcionController::class);