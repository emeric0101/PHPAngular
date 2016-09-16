<?php

namespace Emeric0101\PHPAngular\Entity;
use Emeric0101\PHPAngular\Entity\EntityAbstract;
use Emeric0101\PHPAngular\Entity\IUser;
use Doctrine\Mapping as ORM;

/**
 * Price
 *
 * @Table(name="session")
 * @Entity(repositoryClass="Emeric0101\PHPAngular\Repository\SessionRepository")
 */
class Session extends EntityAbstract
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
     * @var \DateTime
     *
     * @Column(name="date", type="datetime")
     */
    private $date;
    /**
     * @var $user
     * @ManyToOne(targetEntity="Emeric0101\PHPAngular\Entity\IUser")
     */
    private $user;

    /**
     * @var string
     *
     * @Column(name="sid", type="string", length=255, unique=true)
     */
    private $sid;

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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Price
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }
    public function getUser() {
        return $this->user;
    }
    public function setUser(IUser $u) {
        $this->user = $u;
        return $this;
    }

    public function getSid() {
        return $this->sid;
    }

    public function setSid(string $s) {
        $this->sid = $s;
        return $this;
    }
}
