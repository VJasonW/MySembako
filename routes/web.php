<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthPagesController;

Route::get('/', [AuthPagesController::class, 'showLogin'])->name('login');

Route::get('/register', [AuthPagesController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthPagesController::class, 'submitRegister'])->name('register.submit');

Route::post('/login', [AuthPagesController::class, 'submitLogin'])->name('login.submit');

Route::get('/index', [AuthPagesController::class, 'index'])->name('index');

// Route-route berikut di-comment sementara karena controller belum dibuat
// Route::middleware(['auth', 'admin'])->group(function () {
//     Route::resource('products', ProductController::class);
// });

// Route::middleware(['auth', 'user'])->group(function () {
//     Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
// });

// Route::middleware(['auth', 'client'])->group(function () {
//     Route::resource('cart', CartController::class);
//     Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
//     Route::get('checkout', [TransactionController::class, 'checkout'])->name('transactions.checkout');
//     Route::post('checkout', [TransactionController::class, 'processCheckout'])->name('transactions.processCheckout');
//     Route::post('/payment', [PaymentController::class, 'processPayment'])->name('payment.process');
// });

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');