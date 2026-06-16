<?php

namespace App\Http\Controllers;

use App\Models\Pocket;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SyncController extends Controller
{
    public function syncOfflineData(Request $request)
    {
        $request->validate([
            'transactions'   => 'required|array',
            'transactions.*.pocket_id' => 'required|exists:pockets,id',
            'transactions.*.tipe'      => 'required|in:pemasukan,pengeluaran',
            'transactions.*.nominal'   => 'required|numeric|min:1',
            'transactions.*.kategori'  => 'required|string',
            'transactions.*.tanggal'   => 'required|date',
        ]);

        $synced  = 0;
        $gagal   = 0;

        foreach ($request->transactions as $item) {
            try {
                // Cek apakah sudah ada (hindari duplikat)
                $existing = Transaction::where('user_id', Auth::id())
                    ->where('pocket_id', $item['pocket_id'])
                    ->where('nominal', $item['nominal'])
                    ->where('tanggal', $item['tanggal'])
                    ->where('kategori', $item['kategori'])
                    ->where('status_sync', 'pending')
                    ->first();

                if (!$existing) {
                    $transaction = Transaction::create([
                        'user_id'     => Auth::id(),
                        'pocket_id'   => $item['pocket_id'],
                        'tipe'        => $item['tipe'],
                        'nominal'     => $item['nominal'],
                        'kategori'    => $item['kategori'],
                        'deskripsi'   => $item['deskripsi'] ?? null,
                        'tanggal'     => $item['tanggal'],
                        'status_sync' => 'synced',
                    ]);

                    // Update saldo pocket
                    $pocket = Pocket::findOrFail($item['pocket_id']);
                    if ($item['tipe'] === 'pemasukan') {
                        $pocket->increment('saldo', $item['nominal']);
                    } else {
                        $pocket->decrement('saldo', $item['nominal']);
                    }

                    $synced++;
                }
            } catch (\Exception $e) {
                $gagal++;
            }
        }

        return response()->json([
            'success' => true,
            'synced'  => $synced,
            'gagal'   => $gagal,
            'message' => $synced . ' transaksi berhasil disync, ' . $gagal . ' gagal.',
        ]);
    }

    public function getPendingCount(Request $request)
    {
        $count = Transaction::where('user_id', Auth::id())
            ->where('status_sync', 'pending')
            ->count();

        return response()->json(['pending' => $count]);
    }
}