<?php

namespace App\Http\Controllers;

use App\Models\Pocket;
use App\Models\Receipt;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TransactionController extends Controller
{
    // Tampilkan riwayat transaksi
    public function index()
    {
        $transactions = Transaction::with(['pocket', 'receipt'])
            ->where('user_id', Auth::id())
            ->orderBy('tanggal', 'desc')
            ->get();

        $pockets = Pocket::where('user_id', Auth::id())->get();

        return Inertia::render('Transaction/Index', [
            'transactions' => $transactions,
            'pockets'      => $pockets,
        ]);
    }

    // Simpan transaksi baru
    public function store(Request $request)
    {
        $request->validate([
            'pocket_id' => 'required|exists:pockets,id',
            'tipe'      => 'required|in:pemasukan,pengeluaran',
            'nominal'   => 'required|numeric|min:1',
            'kategori'  => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal'   => 'required|date',
            'foto_nota' => 'nullable|image|max:2048',
        ]);

        // Simpan transaksi
        $transaction = Transaction::create([
            'user_id'     => Auth::id(),
            'pocket_id'   => $request->pocket_id,
            'tipe'        => $request->tipe,
            'nominal'     => $request->nominal,
            'kategori'    => $request->kategori,
            'deskripsi'   => $request->deskripsi,
            'tanggal'     => $request->tanggal,
            'status_sync' => 'synced',
        ]);

        // Update saldo pocket
        $pocket = Pocket::findOrFail($request->pocket_id);
        if ($request->tipe === 'pemasukan') {
            $pocket->increment('saldo', $request->nominal);
        } else {
            $pocket->decrement('saldo', $request->nominal);
        }

        // Upload foto nota jika ada
        if ($request->hasFile('foto_nota')) {
            $file     = $request->file('foto_nota');
            $path     = $file->store('receipts', 'public');
            $sizeKb   = round($file->getSize() / 1024);

            Receipt::create([
                'transaction_id' => $transaction->id,
                'file_path'      => $path,
                'file_size_kb'   => $sizeKb,
                'uploaded_at'    => now(),
            ]);
        }

        return redirect()->route('transaction.index')
            ->with('success', 'Transaksi berhasil disimpan!');
    }

    // Update transaksi
    public function update(Request $request, $id)
    {
        $request->validate([
            'kategori'  => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal'   => 'required|date',
        ]);

        $transaction = Transaction::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $transaction->update([
            'kategori'  => $request->kategori,
            'deskripsi' => $request->deskripsi,
            'tanggal'   => $request->tanggal,
        ]);

        return redirect()->route('transaction.index')
            ->with('success', 'Transaksi berhasil diupdate!');
    }

    // Hapus transaksi
    public function destroy($id)
    {
        $transaction = Transaction::with('receipt')
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Kembalikan saldo pocket
        $pocket = Pocket::findOrFail($transaction->pocket_id);
        if ($transaction->tipe === 'pemasukan') {
            $pocket->decrement('saldo', $transaction->nominal);
        } else {
            $pocket->increment('saldo', $transaction->nominal);
        }

        // Hapus foto nota jika ada
        if ($transaction->receipt) {
            Storage::disk('public')->delete($transaction->receipt->file_path);
            $transaction->receipt->delete();
        }

        $transaction->delete();

        return redirect()->route('transaction.index')
            ->with('success', 'Transaksi berhasil dihapus!');
    }
}
