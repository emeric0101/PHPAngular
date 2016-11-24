<?php
namespace Emeric0101\PHPAngular\Service;
interface ILogin {
    public function getUserFromPHPSession();
    public function getUserFromSession($sid);
    public function logout();
    public function hashPassword($p);
    public function login($mail, $password, $stayConnected);
    public function loginWithUser($user);
}
