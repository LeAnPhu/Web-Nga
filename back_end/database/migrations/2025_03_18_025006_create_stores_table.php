<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('shop_owners')->onDelete('cascade');
            $table->string('name');
            $table->string('img')->nullable();
            $table->string('address');
            $table->boolean('is_active')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('stores');
    }
};
