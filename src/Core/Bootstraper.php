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
        $containerBuilder->addDefinitions('src/Core/config-di.php');
        $container = $containerBuilder->build();

        $db = $container->get('Emeric0101\PHPAngular\Service\DbService');
        $controllerService = $container->get('Emeric0101\PHPAngular\Service\ControllerService');
        $controllerService->setContainer($container);
        $controllerService->callController();
        $controllerService->render();

        $db->close();
    }
}
