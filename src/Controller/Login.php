<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\Login as LoginService;

class Login extends Controller {
    private $login = null;
    public function __construct(LoginService $login) {
        $this->login = $login;
    }

    public function getLoginInfo() {
        $user = $this->login->getUser();
        if ($user === null) {
            $this->response->setError("NOT_LOGGED");
            return false;
        }

        $this->response->setResponse("user", $user);
    }

    public function logout() {
        if (!$this->login->logout()) {
            $this->response->setError("NOT_LOGGED");
            return false;
        }
        return true;
    }

    public function login() {
        $mail = $this->request->post("mail", "");
        $stayConnected = $this->request->post("stay", "");
        $sid = $this->login->login($mail, $this->request->post("password", ""), $stayConnected);
        if ($sid === false) {
            $this->response->setError("BAD_LOGIN");
            return false;
        }
        $this->response->setResponse('sessionid',$sid );
        return true;
    }
}
