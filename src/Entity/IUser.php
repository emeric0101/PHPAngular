<?php

namespace Emeric0101\PHPAngular\Entity;
use Emeric0101\PHPAngular\Entity\EntityAbstract;

interface IUser
{
    public function setMail($mail);
    public function getMail();


    public function getPassword();
    public function setHashedPassword(string $p);
}
