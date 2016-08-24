<?php

namespace Emeric0101\PHPAngular\Entity;
use Emeric0101\PHPAngular\Entity\EntityAbstract;

use Doctrine\Mapping as ORM;

/**
 * Post
 *
 * @Table(name="EntityTestP")
 * @Entity(repositoryClass="Emeric0101\PHPAngular\Repository\EntityTestPRepository")
 */
class EntityTestP extends EntityAbstract
{
    /**
     * @var int
     *
     * @Column(name="id", type="integer")
     * @Id
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @Column(name="title", type="string", length=255)
     */
    private $test;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set test
     *
     * @param string $test
     *
     * @return Post
     */
    public function setTest(string $test)
    {
        $this->test = $test;

        return $this;
    }

    /**
     * Get test
     *
     * @return string
     */
    public function getTest()
    {
        return $this->test;
    }


}
