<?php


namespace app\controllers\api;


use app\models\Flight;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;
use yii\web\BadRequestHttpException;


/**
 * Class
 */
class FlightsController extends ActiveController
{
    /** @var string */
    public $modelClass = Flight::class;

    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        return $actions;
    }

    public function prepareDataProvider()
    {
        $searchModel = new \app\models\FlightSearch();
        return $searchModel->search(\Yii::$app->request->queryParams);
    }
}