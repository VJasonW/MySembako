<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

// Hapus route default, akan diganti dengan route register dan login jika diperlukan
