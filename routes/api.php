<?php 
use App\Http\Controllers\UserController;

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/add', [UserController::class, 'store']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::get('/users/me', [UserController::class, 'me']); // Auto-fetch userlara
