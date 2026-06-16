<?php

namespace App\Http\Controllers;

use App\Models\PriceReference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PriceReferenceController extends Controller
{
    // Tampilkan semua harga
    public function index()
    {
        $prices = PriceReference::orderBy('tanggal_update', 'desc')->get();

        return Inertia::render('Price/Index', [
            'prices' => $prices,
            'isAdmin' => Auth::user()->role === 'admin',
        ]);
    }

    // Simpan harga baru (admin only)
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Hanya admin yang bisa menambah harga.');
        }

        $request->validate([
            'nama_komoditas'  => 'required|string|max:255',
            'harga'           => 'required|numeric|min:0',
            'satuan'          => 'required|string|max:50',
            'tanggal_update'  => 'required|date',
            'sumber'          => 'nullable|string|max:255',
        ]);

        PriceReference::create($request->all());

        return redirect()->route('price.index')
            ->with('success', 'Harga berhasil ditambahkan!');
    }

    // Update harga (admin only)
    public function update(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Hanya admin yang bisa mengubah harga.');
        }

        $request->validate([
            'harga'          => 'required|numeric|min:0',
            'tanggal_update' => 'required|date',
            'sumber'         => 'nullable|string|max:255',
        ]);

        $price = PriceReference::findOrFail($id);
        $price->update($request->all());

        return redirect()->route('price.index')
            ->with('success', 'Harga berhasil diupdate!');
    }

    // Hapus harga (admin only)
    public function destroy($id)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Hanya admin yang bisa menghapus harga.');
        }

        PriceReference::findOrFail($id)->delete();

        return redirect()->route('price.index')
            ->with('success', 'Harga berhasil dihapus!');
    }
}
