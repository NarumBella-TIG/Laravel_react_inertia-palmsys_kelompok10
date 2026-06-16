<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PocketController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\PriceReferenceController;
use App\Http\Controllers\SyncController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing page - public
Route::get('/', function () {
    return Inertia::render('Landing');
})->name('landing');

// Auth routes (hanya untuk yang belum login)
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes (harus login dulu)
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/api/net-profit', [DashboardController::class, 'getNetProfit'])->name('net.profit');

    // Pocket routes
    Route::get('/pocket', [PocketController::class, 'index'])->name('pocket.index');
    Route::post('/pocket', [PocketController::class, 'store'])->name('pocket.store');
    Route::post('/pocket/transfer', [PocketController::class, 'transferSaldo'])->name('pocket.transfer');
    Route::delete('/pocket/{id}', [PocketController::class, 'destroy'])->name('pocket.destroy');

    // Transaction routes
    Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
    Route::post('/transaction', [TransactionController::class, 'store'])->name('transaction.store');
    Route::put('/transaction/{id}', [TransactionController::class, 'update'])->name('transaction.update');
    Route::delete('/transaction/{id}', [TransactionController::class, 'destroy'])->name('transaction.destroy');

    // Price Reference routes
    Route::get('/price', [PriceReferenceController::class, 'index'])->name('price.index');
    Route::post('/price', [PriceReferenceController::class, 'store'])->name('price.store');
    Route::put('/price/{id}', [PriceReferenceController::class, 'update'])->name('price.update');
    Route::delete('/price/{id}', [PriceReferenceController::class, 'destroy'])->name('price.destroy');

    // Sync routes
    Route::post('/sync/offline', [SyncController::class, 'syncOfflineData'])->name('sync.offline');
    Route::get('/sync/pending', [SyncController::class, 'getPendingCount'])->name('sync.pending');
});

// Admin routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::delete('/admin/user/{id}', [AdminController::class, 'deleteUser'])->name('admin.deleteUser');
});