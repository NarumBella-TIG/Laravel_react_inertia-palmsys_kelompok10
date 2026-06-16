<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pocket extends Model
{
    protected $fillable = [
        'user_id',
        'nama_pocket',
        'saldo',
        'tipe',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Transaction
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}