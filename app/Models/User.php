<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'nama_lengkap',
        'email',
        'no_hp',
        'password_hash',
        'role',
    ];

    protected $hidden = [
        'password_hash',
    ];

    // Penting! Beritahu Laravel kolom password kita
    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    public function pockets()
    {
        return $this->hasMany(Pocket::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}