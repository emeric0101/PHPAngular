<?php
namespace Emeric0101\PHPAngular\Service;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Service\Request;
use Emeric0101\PHPAngular\Service\Singleton;
use AFE\DmoBundle\Entity\Variable;
use Emeric0101\PHPAngular\Service\AService;

class Login extends AService {
    private $user = null;
    private $entityManager = null;

    /** try to find the logged user with sessionid
    */
    private function getUserFromSession() {
        $sessionid = $this->request->session('usersid', '');
        return $this->entityManager->getRepository("Emeric0101\PHPAngular\Entity\Session")->findBySid($sessionid);
    }

    function __construct(DbService $db, Request $request) {
        $this->entityManager = $db->getEntityManager();
        $this->request = $request;
        $this->user = $this->getUserFromSession();
    }

    function logout() {
        $sessionid = $this->request->session('usersid', '');
        if ($sessionid === '') {
            return false;
        }
        $sessions = $this->entityManager->getRepository("Emeric0101\PHPAngular\Entity\Session")->findBySid($sessionid);
        $this->request->setSession('usersid', '');
        if (empty($sessions)) {
            return false;
        }
        foreach ($sessions as $session)
            $this->entityManager->remove($session);

        $this->entityManager->flush();
        $this->user = null;
        return true;
    }

    function login($mail, $password, $stayConnected) {
        $password = \Emeric0101\PHPAngular\Entity\User::hashPassword($password);
        $user = $this->entityManager->getRepository("Emeric0101\PHPAngular\Entity\IUser")->getUserByMailPassword($mail, $password);
        if ($user === null) {
            return false;
        }
        $session = new \Emeric0101\PHPAngular\Entity\Session();
        $session->setUser($user);
        $sid = bin2hex(random_bytes(100));
        $this->request->setSession('usersid', $sid);
        $session->setSid($sid);
        $session->setDate(new \Datetime());
        $this->entityManager->persist($session);
        $this->entityManager->flush();
        $this->user = $user;
        return true;
    }
    function loginWithUser(\Emeric0101\PHPAngular\Entity\IUser $user) {
        $session = new \Emeric0101\PHPAngular\Entity\Session();
        $session->setUser($user);
        $sid = bin2hex(random_bytes(100));
        $this->request->setSession('usersid', $sid);
        $session->setSid($sid);
        $session->setDate(new \Datetime());
        $this->entityManager->persist($session);
        $this->entityManager->flush();
        $this->user = $user;
        return true;
    }
    /**
    * Get the current logged user or null
    */
    function getUser() {
        return $this->user;
    }


}
