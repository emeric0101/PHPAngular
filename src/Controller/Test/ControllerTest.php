<?php
use phpunit\framework\TestCase;
use Emeric0101\PHPAngular\Controller\Controller;


class ControllerTest extends TestCase
{
    public function testGetControllerName()
    {
        $name = Controller::getControllerName('Entity');
        $this->assertEquals('Emeric0101\\PHPAngular\\Controller\\Entity', $name);
    }

}
