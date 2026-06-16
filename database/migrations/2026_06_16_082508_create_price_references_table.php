<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('price_references', function (Blueprint $table) {
            $table->id();
            $table->string('nama_komoditas');
            $table->decimal('harga', 15, 2);
            $table->string('satuan');
            $table->date('tanggal_update');
            $table->string('sumber')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('price_references');
    }
};