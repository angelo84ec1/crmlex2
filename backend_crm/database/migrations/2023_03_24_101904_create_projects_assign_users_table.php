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
        Schema::create('projects_assign_user', function (Blueprint $table) {
             $table->increments('id');
             $table->integer('project_id')->unsigned()->nullable();
             $table->integer('assign_user_id');
             $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
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
        Schema::dropIfExists('projects_assign_user');
    }
};
