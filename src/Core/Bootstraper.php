<?php
namespace Emeric0101\PHPAngular\Core;

use Emeric0101\PHPAngular\Entity\User;
use Emeric0101\PHPAngular\Service\Response;
use Emeric0101\PHPAngular\Service\ControllerService;
use Emeric0101\PHPAngular\Service\DbService;
use Symfony\Component\HttpFoundation\Request;
use DI\ContainerBuilder;

class Bootstraper {
    public function start() {
        $containerBuilder = new ContainerBuilder;
        $container = $containerBuilder->build();

        $db = $container->get('Emeric0101\PHPAngular\Service\DbService');

        $controllerService = new ControllerService($container);
        $controllerService->callController();
        $controllerService->render();

        $db->close();
    }
}
