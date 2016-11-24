<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Test\UnitTest;
use Emeric0101\PHPAngular\Controller\Auth as AuthController;

class AuthTest extends UnitTest
{

    private $auth = null;
    public function setUp() {
        $this->auth = $this->get('Emeric0101\PHPAngular\Controller\Auth');
        $response = $this->get('Emeric0101\PHPAngular\Service\Response');
        $this->auth->setBaseService($response, null, null);
    }

    public function testGetTable() {
        $this->auth->getTable();
    }
}
