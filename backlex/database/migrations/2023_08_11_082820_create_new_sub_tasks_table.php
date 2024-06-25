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
        Schema::create('new_sub_tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('new_task_id')->unsigned()->nullable();
            $table->string('title');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->longText('description')->nullable();
            $table->integer('progress')->default(0);
            $table->string('status');
            $table->integer('created_by');
            $table->timestamp('created_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->integer('updated_by')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('deleted_by')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->foreign('new_task_id')->references('id')->on('new_tasks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('new_sub_tasks');
    }
};
