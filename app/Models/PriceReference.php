<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PriceReference extends Model
{
    protected $fillable = [
        'nama_komoditas',
        'harga',
        'satuan',
        'tanggal_update',
        'sumber',
    ];

    protected $casts = [
        'tanggal_update' => 'date',
        'harga' => 'decimal:2',
    ];
}