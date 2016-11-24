<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\Auth as AuthService;

class Auth extends Controller {
    private $auth = null;
    public function __construct(AuthService $auth) {
        $this->auth = $auth;
    }



    public function getTable() {
        $table = $this->auth->getTable();
        $this->response->setResponse('authTable', $table);
        return true;
    }

}
