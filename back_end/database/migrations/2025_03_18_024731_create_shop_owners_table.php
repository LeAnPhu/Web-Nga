<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('shop_owners', function (Blueprint $table) {
            $table->id();
            $table->enum('role', ['user', 'shop_owner', 'admin'])->default('shop_owner');
            $table->string('phone') -> default('null');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('name');
            $table->string('image')->nullable();
            $table->boolean('isActive')->default(true);
            $table->integer('otp');
            $table-> boolean('confirm')->default(0);
            $table-> timestamp('otp_expired');
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_owners');
    }
};
