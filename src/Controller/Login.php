<?php
namespace Emeric0101\PHPAngular\Controller;
class Login extends Emeric0101\PHPAngular\Controller\Controller {
    private $login = null;
    public function __construct(LoginService $login) {
        $this->login = $login;
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
        if (!$this->login->login($mail, $this->request->post("password", ""), $stayConnected)) {
            $this->response->setError("BAD_LOGIN");
            return false;
        }
        return true;
    }
}
