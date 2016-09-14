<?php
use phpunit\framework\TestCase;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\ServiceBlank;
use DI\ContainerBuilder;

class InjectorClass {
    private $service;
    public function __construct(ServiceBlank $service) {
        $this->service = $service;
    }
    public function getService() {
        return $this->service;
    }
}

class ServiceInjectorTest extends TestCase
{
    public function testServiceInjector()
    {
        // PHP-DI
        $containerBuilder = new ContainerBuilder;
        $container = $containerBuilder->build();

        $injectorClass = $container->get('InjectorClass');
        $this->assertEquals($injectorClass->getService() instanceof ServiceBlank, true);
    }

}
