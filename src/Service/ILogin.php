<?php
namespace Emeric0101\PHPAngular\Service;
interface ILogin {
    public function getUserFromPHPSession();
    public function logout();
    public function hashPassword($p);
    public function login($mail, $password, $stayConnected);
    public function loginWithUser(\Emeric0101\PHPAngular\Entity\IUser $user);
}
