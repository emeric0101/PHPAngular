<?php
namespace Emeric0101\PHPAngular;
use Emeric0101\PHPAngular\Entity\User;
use Emeric0101\PHPAngular\Service\Response;
use Emeric0101\PHPAngular\Service\ControllerService;
use Emeric0101\PHPAngular\Service\DbService;
use Symfony\Component\HttpFoundation\Request;
use DI\ContainerBuilder;

chdir("..");
require_once "bootstrap.php";

$containerBuilder = new ContainerBuilder;
$container = $containerBuilder->build();

$controllerService = new ControllerService($container);
$controllerService->callController();
$controllerService->render();
