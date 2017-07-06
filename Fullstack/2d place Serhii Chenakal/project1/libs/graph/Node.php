<?php


namespace app\libs\graph;


class Node implements NodeInterface
{
    protected $id;
    protected $potential;
    protected $potentialFrom;
    protected $connections = array();
    protected $passed = false;

    /**
     * Instantiates a new node, requiring a ID to avoid collisions.
     *
     * @param mixed $id
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Connects the node to another $node.
     * A $distance, to balance the connection, can be specified.
     *
     * @param Node $node
     * @param integer $distance
     */
    public function connect(NodeInterface $node, $distance = 1)
    {
        $this->connections[$node->getId()] = $distance;
    }

    /**
     * Returns the distance to the node.
     *
     * @return Array
     */
    public function getDistance(NodeInterface $node)
    {
        return $this->connections[$node->getId()];
    }

    /**
     * Returns the connections of the current node.
     *
     * @return Array
     */
    public function getConnections()
    {
        return $this->connections;
    }

    /**
     * Returns the identifier of this node.
     *
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Returns node's potential.
     *
     * @return integer
     */
    public function getPotential()
    {
        return $this->potential;
    }

    /**
     * Returns the node which gave to the current node its potential.
     *
     * @return Node
     */
    public function getPotentialFrom()
    {
        return $this->potentialFrom;
    }

    /**
     * Returns whether the node has passed or not.
     *
     * @return boolean
     */
    public function isPassed()
    {
        return $this->passed;
    }

    /**
     * Marks this node as passed, meaning that, in the scope of a graph, he
     * has already been processed in order to calculate its potential.
     */
    public function markPassed()
    {
        $this->passed = true;
    }

    /**
     * Sets the potential for the node, if the node has no potential or the
     * one it has is higher than the new one.
     *
     * @param integer $potential
     * @param Node $from
     * @return boolean
     */
    public function setPotential($potential, NodeInterface $from)
    {
        $potential = ( int )$potential;
        if (!$this->getPotential() || $potential < $this->getPotential()) {
            $this->potential = $potential;
            $this->potentialFrom = $from;
            return true;
        }
        return false;
    }
}