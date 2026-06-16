<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'pocket_id',
        'tipe',
        'nominal',
        'kategori',
        'deskripsi',
        'tanggal',
        'status_sync',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'nominal' => 'decimal:2',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Pocket
    public function pocket()
    {
        return $this->belongsTo(Pocket::class);
    }

    // Relasi ke Receipt
    public function receipt()
    {
        return $this->hasOne(Receipt::class);
    }
}