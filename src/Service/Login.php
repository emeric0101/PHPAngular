<?php
namespace Emeric0101\PHPAngular\Service;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Service\Request;
use Emeric0101\PHPAngular\Service\Singleton;
use Emeric0101\PHPAngular\Service\AService;
use Emeric0101\PHPAngular\Service\ILogin;

class Login extends AService implements ILogin {
    protected $user = null;
    protected $entityManager = null;

    /** try to find the logged user with sid
    */
    private function getUserFromSession($sid) {
        $session = $this->entityManager->getRepository("Emeric0101\PHPAngular\Entity\Session")->findBySid($sid);
        if (empty($session)) {
            return null;
        }
        // fix some bug with entity conflit
        $userLogged = $this->entityManager->find("Emeric0101\PHPAngular\Entity\IUser", $session[0]->getUser()->getId());

        return $userLogged;
    }

    function __construct(DbService $db, Request $request) {
        $this->entityManager = $db->getEntityManager();
        $this->request = $request;
		// need this to link IUser to User :/ bug in doctrine
        $this->entityManager->getRepository("Emeric0101\PHPAngular\Entity\Session")->findBySid(null);

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

    function hashPassword($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    function login($mail, $password, $stayConnected) {




        $user = $this->entityManager->getRepository("Emeric0101\PHPAngular\Entity\IUser")->findByMail($mail);
        if (empty($user)) {
            return false;
        }
        // check password
        if (!password_verify($password, $user[0]->readPassword())) {
            return false;
        }
        $session = new \Emeric0101\PHPAngular\Entity\Session();
        $session->setUser($user[0]);
        $sid = bin2hex(random_bytes(100));
        $this->request->setSession('usersid', $sid);
        $session->setSid($sid);
        $session->setDate(new \Datetime());
        $this->entityManager->persist($session);
        $this->entityManager->flush();
        $this->user = $user[0];
        return $sid;
    }
    function loginWithUser($user) {
        $session = new \Emeric0101\PHPAngular\Entity\Session();
        $session->setUser($user);
        $sid = bin2hex(random_bytes(100));
        $this->request->setSession('usersid', $sid);
        $session->setSid($sid);
        $session->setDate(new \Datetime());
        $this->entityManager->persist($session);
        $this->entityManager->flush();
        $this->user = $user;
        return $sid;
    }
    /**
    * Get the current logged user or null
    */
    function getUser($sid) {
		if ($this->user == null) {
			$this->user = $this->getUserFromSession($sid);
		}
        return $this->user;
    }
    /**
    * Get the current logged user or null
    */
    function getUserFromPHPSession() {
		if ($this->user == null) {
            $sid = $this->request->session('usersid', '');
            if ($sid == '') {
                // try with a get key
                $sid = $this->request->get('sessionid', '');
            }
			$this->user = $this->getUserFromSession($sid);
		}
        return $this->user;
    }


}
