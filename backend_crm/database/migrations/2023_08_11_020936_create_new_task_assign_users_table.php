<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_task_assign_users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('new_task_id')->unsigned()->nullable();
            $table->integer('assign_user_id');
            $table->foreign('new_task_id')->references('id')->on('new_tasks')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('new_task_assign_users');
    }
};
