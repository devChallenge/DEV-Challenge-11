<?php


namespace app\controllers\api;


use app\common\Graph;
use app\models\Flight;
use yii\rest\Controller;

/**
 * Class
 */
class TripsController extends Controller
{
    /**
     * @return \stdClass
     */
    public function actionIndex()
    {
        $params = \Yii::$app->request->queryParams;

        $routes = array();
        $data = Flight::find()->all();

        foreach ($data as $item) {
            $routes[] = [
                'from' => $item->origin,
                'to' => $item->destination,
                'value' => (int)$item->cost,
            ];
        }

        $graph = new Graph($params['origin'], $params['destination'], $routes);
        $result = $graph->result();

        $response = new \stdClass();
        $response->cost = $result['Total'];
        $response->connections = count($result['Route']) - 1;
        $response->flights = $result['Route'];

        return $response;
    }
}