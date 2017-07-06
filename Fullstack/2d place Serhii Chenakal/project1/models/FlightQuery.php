<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[Flight]].
 *
 * @see Flight
 */
class FlightQuery extends \yii\db\ActiveQuery
{
    /**
     * @inheritdoc
     * @return Flight[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return Flight|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
