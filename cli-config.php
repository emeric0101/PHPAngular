<?php
// cli-config.php
use Emeric0101\PHPAngular\Service\DbService;
require_once "bootstrap.php";

$dbService = new DbService();
$entityManager = $dbService->getEntityManager();

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);
