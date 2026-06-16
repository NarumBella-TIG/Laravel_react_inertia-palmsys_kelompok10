<?php

namespace App\Http\Controllers;

use App\Models\Pocket;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Total semua user
        $totalUsers = User::where('role', 'pemilik')->count();

        // Total transaksi semua user
        $totalTransaksi = Transaction::count();

        // Total pemasukan semua user bulan ini
        $totalPemasukan = Transaction::where('tipe', 'pemasukan')
            ->whereMonth('tanggal', now()->month)
            ->whereYear('tanggal', now()->year)
            ->sum('nominal');

        // Total pengeluaran semua user bulan ini
        $totalPengeluaran = Transaction::where('tipe', 'pengeluaran')
            ->whereMonth('tanggal', now()->month)
            ->whereYear('tanggal', now()->year)
            ->sum('nominal');

        // Daftar semua user dengan statistik
        $users = User::where('role', 'pemilik')
            ->withCount('transactions')
            ->with('pockets')
            ->get()
            ->map(function ($user) {
                $pemasukan = Transaction::where('user_id', $user->id)
                    ->where('tipe', 'pemasukan')
                    ->whereMonth('tanggal', now()->month)
                    ->sum('nominal');

                $pengeluaran = Transaction::where('user_id', $user->id)
                    ->where('tipe', 'pengeluaran')
                    ->whereMonth('tanggal', now()->month)
                    ->sum('nominal');

                return [
                    'id'            => $user->id,
                    'nama_lengkap'  => $user->nama_lengkap,
                    'email'         => $user->email,
                    'no_hp'         => $user->no_hp,
                    'created_at'    => $user->created_at,
                    'total_transaksi' => $user->transactions_count,
                    'total_pocket'  => $user->pockets->count(),
                    'pemasukan'     => $pemasukan,
                    'pengeluaran'   => $pengeluaran,
                    'net_profit'    => $pemasukan - $pengeluaran,
                ];
            });

        // Transaksi terbaru semua user
        $recentTransactions = Transaction::with(['user', 'pocket'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Index', [
            'totalUsers'         => $totalUsers,
            'totalTransaksi'     => $totalTransaksi,
            'totalPemasukan'     => $totalPemasukan,
            'totalPengeluaran'   => $totalPengeluaran,
            'netProfit'          => $totalPemasukan - $totalPengeluaran,
            'users'              => $users,
            'recentTransactions' => $recentTransactions,
            'bulan'              => now()->locale('id')->monthName,
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::where('id', $id)->where('role', 'pemilik')->firstOrFail();
        $user->delete();

        return redirect()->route('admin.index')->with('success', 'User berhasil dihapus!');
    }
}