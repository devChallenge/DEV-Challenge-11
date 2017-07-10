<?php

function parseQueryString($query)
{
    $exploded = explode('&', $query);
    $params = [];

    foreach ($exploded as $row) {
        list($param, $value)= explode('=', $row);
        $value = trim(urldecode($value));

        if (array_key_exists($param, $params)) {
            if (is_scalar($params[$param])) {
                $tmp = $params[$param];
                $params[$param] = [$tmp];
            }

            $params[$param][] = $value;
        } else {
            $params[$param] = $value;
        }
    }

    return $params;
}
