<?php

namespace App\Http\Controllers;

use App\Models\Pocket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PocketController extends Controller
{
    // Tampilkan semua pocket milik user
    public function index()
    {
        $pockets = Pocket::where('user_id', Auth::id())->get();

        return Inertia::render('Pocket/Index', [
            'pockets' => $pockets,
        ]);
    }

    // Simpan pocket baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_pocket' => 'required|string|max:255',
            'tipe'        => 'required|in:kebun,pribadi,talangan',
            'saldo'       => 'nullable|numeric|min:0',
        ]);

        Pocket::create([
            'user_id'     => Auth::id(),
            'nama_pocket' => $request->nama_pocket,
            'tipe'        => $request->tipe,
            'saldo'       => $request->saldo ?? 0,
        ]);

        return redirect()->route('pocket.index')->with('success', 'Pocket berhasil dibuat!');
    }

    // Transfer saldo antar pocket
    public function transferSaldo(Request $request)
    {
        $request->validate([
            'dari_pocket_id' => 'required|exists:pockets,id',
            'ke_pocket_id'   => 'required|exists:pockets,id|different:dari_pocket_id',
            'nominal'        => 'required|numeric|min:1',
        ]);

        $dari = Pocket::where('id', $request->dari_pocket_id)
                      ->where('user_id', Auth::id())
                      ->firstOrFail();

        $ke = Pocket::where('id', $request->ke_pocket_id)
                    ->where('user_id', Auth::id())
                    ->firstOrFail();

        if ($dari->saldo < $request->nominal) {
            return back()->withErrors(['nominal' => 'Saldo tidak mencukupi.']);
        }

        $dari->decrement('saldo', $request->nominal);
        $ke->increment('saldo', $request->nominal);

        return redirect()->route('pocket.index')->with('success', 'Transfer berhasil!');
    }

    // Hapus pocket
    public function destroy($id)
    {
        $pocket = Pocket::where('id', $id)
                        ->where('user_id', Auth::id())
                        ->firstOrFail();

        $pocket->delete();

        return redirect()->route('pocket.index')->with('success', 'Pocket berhasil dihapus!');
    }
}