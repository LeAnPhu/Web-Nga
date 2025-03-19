<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('role');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('image')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->boolean('isActive')->default(0)->nullable();
            $table->integer('otp');
            $table-> boolean('confirm')->default(0);
            $table-> timestamp('otp_expired');
            $table-> timestamp('email_verified_at')->nullable(); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
