<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
            $table->integer('views')->default(0);
            $table->integer('purchases')->default(0);
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('analytics');
    }
};
