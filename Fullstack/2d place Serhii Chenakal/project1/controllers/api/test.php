<?php

namespace app\libs\graph;

function printShortestPath($fromName, $toName, $routes)
{
    $graph = new Graph();
    foreach ($routes as $route) {
        $from = $route['from'];
        $to = $route['to'];
        $price = $route['price'];
        if (!array_key_exists($from, $graph->getNodes())) {
            $from_node = new Node($from);
            $graph->add($from_node);
        } else {
            $from_node = $graph->getNode($from);
        }
        if (!array_key_exists($to, $graph->getNodes())) {
            $to_node = new Node($to);
            $graph->add($to_node);
        } else {
            $to_node = $graph->getNode($to);
        }
        $from_node->connect($to_node, $price);
    }

    $g = new Dijkstra($graph);
    $start_node = $graph->getNode($fromName);
    $end_node = $graph->getNode($toName);
    $g->setStartingNode($start_node);
    $g->setEndingNode($end_node);
    echo "From: " . $start_node->getId() . "\n";
    echo "To: " . $end_node->getId() . "\n";
    echo "Route: " . $g->getLiteralShortestPath() . "\n";
    echo "Total: " . $g->getDistance() . "\n";
}

$routes = array();
$routes[] = array('from' => 'a', 'to' => 'b', 'price' => 100);
$routes[] = array('from' => 'c', 'to' => 'd', 'price' => 300);
$routes[] = array('from' => 'b', 'to' => 'c', 'price' => 200);
$routes[] = array('from' => 'a', 'to' => 'd', 'price' => 900);
$routes[] = array('from' => 'b', 'to' => 'd', 'price' => 300);

//printShortestPath('a', 'd', $routes);
@printShortestPath('c', 'a', $routes);