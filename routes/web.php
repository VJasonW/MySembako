<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthPagesController;

Route::get('/', function () {
    return view('app');
})->name('intro');

Route::get('/login', [AuthPagesController::class, 'showLogin'])->name('login');

Route::get('/register', [AuthPagesController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthPagesController::class, 'submitRegister'])->name('register.submit');

Route::post('/login', [AuthPagesController::class, 'submitLogin'])->name('login.submit');

Route::get('/index', [AuthPagesController::class, 'index'])->name('index');

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');