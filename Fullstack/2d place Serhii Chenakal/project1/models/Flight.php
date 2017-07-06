<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "flights".
 *
 * @property integer $id
 * @property string $start
 * @property integer $duration
 * @property string $origin
 * @property string $destination
 * @property double $cost
 */
class Flight extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'flights';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['start'], 'safe'],
            [['duration'], 'integer'],
            [['cost'], 'number'],
            [['origin', 'destination'], 'string', 'max' => 255],
            [['start', 'duration', 'cost', 'origin'], 'required'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'start' => 'Start',
            'duration' => 'Duration',
            'origin' => 'Origin',
            'destination' => 'Destination',
            'cost' => 'Cost',
        ];
    }

    /**
     * @inheritdoc
     * @return FlightQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new FlightQuery(get_called_class());
    }
}
