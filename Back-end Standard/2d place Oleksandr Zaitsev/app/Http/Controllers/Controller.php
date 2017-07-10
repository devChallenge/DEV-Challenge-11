<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;

abstract class Controller extends BaseController
{
    /**
     * @param Request $request
     * @return array
     */
    public function validateInput(Request $request): array
    {
        $query = parseQueryString($request->getQueryString());

        if (!isset($query['area']) || empty($query['area'])) {
            abort(400, "'area' param is necessary");
        }

        $query['area'] = is_scalar($query['area']) ? [$query['area']] : $query['area'];

        return $query;
    }
}
