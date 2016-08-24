<?php
// cli-config.php
use Emeric0101\PHPAngular\Service\DbService;

require_once "bootstrap.php";
$entityManager = DbService::getInstance()->getEntityManager();

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);
