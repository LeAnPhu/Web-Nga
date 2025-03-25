<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->enum('role', ['user', 'shop_owner', 'admin'])->default('admin');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('image')-> nullable();
            $table->boolean('isActive')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('admins');
    }
};
