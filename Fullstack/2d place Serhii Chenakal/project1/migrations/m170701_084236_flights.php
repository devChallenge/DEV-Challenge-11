<?php

use yii\db\Migration;

class m170701_084236_flights extends Migration
{
    public function up()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%flights}}', [
            'id' => $this->primaryKey(),
            'start' => $this->time(),
            'duration' => $this->integer(),
            'origin' => $this->string(),
            'destination' => $this->string(),
            'cost' => $this->float(),
        ], $tableOptions);

    }

    public function down()
    {
        $this->dropTable('{{%flights}}');
    }
}
