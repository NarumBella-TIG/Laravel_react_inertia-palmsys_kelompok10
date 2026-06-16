<?php

namespace App\Http\Controllers;

use App\Models\Pocket;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Ambil semua pocket user
        $pockets = Pocket::where('user_id', $userId)->get();

        // Total saldo semua pocket
        $totalSaldo = $pockets->sum('saldo');

        // Total pemasukan bulan ini
        $totalPemasukan = Transaction::where('user_id', $userId)
            ->where('tipe', 'pemasukan')
            ->whereMonth('tanggal', now()->month)
            ->whereYear('tanggal', now()->year)
            ->sum('nominal');

        // Total pengeluaran bulan ini
        $totalPengeluaran = Transaction::where('user_id', $userId)
            ->where('tipe', 'pengeluaran')
            ->whereMonth('tanggal', now()->month)
            ->whereYear('tanggal', now()->year)
            ->sum('nominal');

        // Net profit bulan ini
        $netProfit = $totalPemasukan - $totalPengeluaran;

        // Transaksi terbaru (5 terakhir)
        $recentTransactions = Transaction::with('pocket')
            ->where('user_id', $userId)
            ->orderBy('tanggal', 'desc')
            ->limit(5)
            ->get();

        // Pengeluaran per kategori bulan ini
        $pengeluaranPerKategori = Transaction::where('user_id', $userId)
            ->where('tipe', 'pengeluaran')
            ->whereMonth('tanggal', now()->month)
            ->whereYear('tanggal', now()->year)
            ->selectRaw('kategori, SUM(nominal) as total')
            ->groupBy('kategori')
            ->get();

        return Inertia::render('Dashboard', [
            'pockets'                 => $pockets,
            'totalSaldo'              => $totalSaldo,
            'totalPemasukan'          => $totalPemasukan,
            'totalPengeluaran'        => $totalPengeluaran,
            'netProfit'               => $netProfit,
            'recentTransactions'      => $recentTransactions,
            'pengeluaranPerKategori'  => $pengeluaranPerKategori,
            'bulan'                   => now()->locale('id')->monthName,
        ]);
    }

    public function getNetProfit(Request $request)
    {
        $userId = Auth::id();
        $bulan  = $request->bulan ?? now()->month;
        $tahun  = $request->tahun ?? now()->year;

        $pemasukan = Transaction::where('user_id', $userId)
            ->where('tipe', 'pemasukan')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->sum('nominal');

        $pengeluaran = Transaction::where('user_id', $userId)
            ->where('tipe', 'pengeluaran')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->sum('nominal');

        return response()->json([
            'pemasukan'   => $pemasukan,
            'pengeluaran' => $pengeluaran,
            'net_profit'  => $pemasukan - $pengeluaran,
        ]);
    }

    public function getPriceInfo()
    {
        $prices = \App\Models\PriceReference::orderBy('tanggal_update', 'desc')->get();
        return response()->json($prices);
    }
}