<?php


namespace app\common;

use app\libs\graph\Dijkstra;
use app\libs\graph\Node;

/**
 * Class
 */
class Graph
{
    /** @var string */
    private $fromName = '';
    /** @var string */
    private $toName = '';
    /** @var array */
    private $routes = [];

    /**
     * Constructor.
     * @param string $fromName
     * @param string $toName
     * @param array $routes
     */
    public function __construct(string $fromName, string $toName, array $routes)
    {
        $this->fromName = $fromName;
        $this->toName = $toName;
        $this->routes = $routes;
    }

    /**
     * @return array
     */
    public function result():? array
    {
        if (!$this->routes) {
            return null;
        }

        $graph = new \app\libs\graph\Graph();
        foreach ($this->routes as $route) {
            $from = $route['from'];
            $to = $route['to'];
            $value = $route['value'];
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
            $from_node->connect($to_node, $value);
        }

        $g = new Dijkstra($graph);
        $start_node = $graph->getNode($this->fromName);
        $end_node = $graph->getNode($this->toName);
        $g->setStartingNode($start_node);
        $g->setEndingNode($end_node);

        return [
            'From' => $start_node->getId(),
            'To' => $end_node->getId(),
            'Route' => $g->getArrayPath(),
            'Total' => $g->getDistance(),
        ];
    }

}