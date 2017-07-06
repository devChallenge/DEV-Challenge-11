<?php


namespace app\libs\graph;


interface NodeInterface
{
    /**
     * Connects the node to another $node.
     * A $distance, to balance the connection, can be specified.
     *
     * @param Node $node
     * @param integer $distance
     */
    public function connect(NodeInterface $node, $distance = 1);

    /**
     * Returns the connections of the current node.
     *
     * @return Array
     */
    public function getConnections();

    /**
     * Returns the identifier of this node.
     *
     * @return mixed
     */
    public function getId();

    /**
     * Returns node's potential.
     *
     * @return integer
     */
    public function getPotential();

    /**
     * Returns the node which gave to the current node its potential.
     *
     * @return Node
     */
    public function getPotentialFrom();

    /**
     * Returns whether the node has passed or not.
     *
     * @return boolean
     */
    public function isPassed();

    /**
     * Marks this node as passed, meaning that, in the scope of a graph, he
     * has already been processed in order to calculate its potential.
     */
    public function markPassed();

    /**
     * Sets the potential for the node, if the node has no potential or the
     * one it has is higher than the new one.
     *
     * @param integer $potential
     * @param Node $from
     * @return boolean
     */
    public function setPotential($potential, NodeInterface $from);
}