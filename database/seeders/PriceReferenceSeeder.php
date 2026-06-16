<?php

namespace Database\Seeders;

use App\Models\PriceReference;
use Illuminate\Database\Seeder;

class PriceReferenceSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'nama_komoditas' => 'Tandan Buah Segar (TBS)',
                'harga'          => 2150,
                'satuan'         => 'kg',
                'tanggal_update' => now()->toDateString(),
                'sumber'         => 'Disbun Riau',
            ],
            [
                'nama_komoditas' => 'Pupuk Urea',
                'harga'          => 3500,
                'satuan'         => 'kg',
                'tanggal_update' => now()->toDateString(),
                'sumber'         => 'Kios Pertanian',
            ],
            [
                'nama_komoditas' => 'Pupuk NPK Mutiara',
                'harga'          => 8500,
                'satuan'         => 'kg',
                'tanggal_update' => now()->toDateString(),
                'sumber'         => 'Kios Pertanian',
            ],
            [
                'nama_komoditas' => 'Pupuk MOP (KCl)',
                'harga'          => 9000,
                'satuan'         => 'kg',
                'tanggal_update' => now()->toDateString(),
                'sumber'         => 'Kios Pertanian',
            ],
            [
                'nama_komoditas' => 'Herbisida Roundup',
                'harga'          => 95000,
                'satuan'         => 'liter',
                'tanggal_update' => now()->toDateString(),
                'sumber'         => 'Toko Agro',
            ],
        ];

        foreach ($data as $item) {
            PriceReference::create($item);
        }
    }
}