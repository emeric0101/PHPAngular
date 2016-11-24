<?php
// cli-config.php
use DI\ContainerBuilder;

use Emeric0101\PHPAngular\Service\DbService;

require_once "bootstrap.php";
$containerBuilder = new ContainerBuilder;
$container = $containerBuilder->build();
$dbService = $container->get('Emeric0101\PHPAngular\Service\DbService');
$entityManager = $dbService->getEntityManager();

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);
