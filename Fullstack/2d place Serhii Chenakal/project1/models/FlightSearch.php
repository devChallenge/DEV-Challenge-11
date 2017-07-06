<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Flight;

/**
 * FlightSearch represents the model behind the search form about `app\models\Flight`.
 */
class FlightSearch extends Flight
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'duration'], 'integer'],
            [['start', 'origin', 'destination'], 'safe'],
            [['cost'], 'number'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Flight::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load(['FlightSearch' => $params]);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'start' => $this->start,
            'duration' => $this->duration,
            'cost' => $this->cost,
        ]);

        $query->andFilterWhere(['like', 'origin', $this->origin])
            ->andFilterWhere(['like', 'destination', $this->destination]);

        $query->limit = 100;

        return $dataProvider;
    }
}
