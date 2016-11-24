<?php
use Emeric0101\PHPAngular\Test\UnitTest;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\ServiceController;


class ControllerServiceTest extends UnitTest
{

    function setUp() {
        $this->controller = $this->get('Emeric0101\PHPAngular\Service\ControllerService');

    }


    /**
     * @dataProvider pGetControllerName
     */
    public function testGetControllerName($key, $result) {
        $this->assertEquals($this->controller->getControllerName($key), $result);
    }

    public function pGetControllerName() {
        return [
            ['Login', '\Emeric0101\PHPAngular\Controller\Login'],
        ];
    }


}
