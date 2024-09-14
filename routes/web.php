<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('master');
});
Route::get('/login', function () {
    return view('master');
});
Route::get('/register', function () {
    return view('master');
});
