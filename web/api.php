<?php
namespace Emeric0101\PHPAngular;
use Emeric0101\PHPAngular\Core\Bootstraper;
chdir("..");
require_once "bootstrap.php";

$bootstraper = new Bootstraper();
$bootstraper->start();
