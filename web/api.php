<?php
namespace Emeric0101\PHPAngular;
use Emeric0101\PHPAngular\Entity\User;
use Emeric0101\PHPAngular\Service\Response;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\DbService;
use Symfony\Component\HttpFoundation\Request;

chdir("..");
require_once "bootstrap.php";

Controller::callController();

$response = Response::getInstance();
$response->render();
