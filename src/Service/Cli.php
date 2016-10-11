<?php
namespace Emeric0101\PHPAngular\Service;
use Doctrine\Common\Annotations\AnnotationReader;
use Emeric0101\PHPAngular\Service\Utils;
use Emeric0101\PHPAngular\Service\Install\Entity;
use Emeric0101\PHPAngular\Service\Install\Routing;
use Emeric0101\PHPAngular\Service\Install\Angular;

class Cli extends AService {
    private $targetJs = '';
	private $entity = null;
	private $routing = null;
    private $angular = null;
    public function __construct() {
		$this->entity = new Entity();
		$this->routing = new Routing();
        $this->angular = new Angular();
    }

    function install() {
        echo 'Phangular - Installation' . PHP_EOL;
        $this->angular->createApp();

        $this->entities = $this->entity->getEntities();
        $this->entity->createEntityFactory($this->entities);
        echo PHP_EOL;

        foreach ($this->entities as $entity) {
            $this->entity->updateEntity($entity, false);
        }
        $this->routing->createRoute();

        echo PHP_EOL . 'Okay, everything is ready but.... you have to do a last little thing' . PHP_EOL;
        echo 'You have to run some commands : ' . PHP_EOL;
        echo 'Then you can npm start' . PHP_EOL;

    }

    function update() {

    }

    function createRoute() {
        $this->routing->createRoute();
    }


    function main($argv) {
        $method = 'help';
        if (count($argv) > 1) {
            $method = $argv[1];
        }
        $argMethod = null;
        if (count($argv) > 2) {
            $argMethod = $argv[2];
        }
        $this->$method($argMethod);
    }

    function help() {
        echo 'Help : you can use "install", "update", "updateEntity" or "createRoute"' . PHP_EOL;
        echo 'For updateEntity, we have to provide the name of the entity : updateEntity User';
    }

}
