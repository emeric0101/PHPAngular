<?php
namespace Emeric0101\PHPAngular\Service;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
class DbService extends Singleton {
    private $entityManager = null;

    public function getEntityManager() {
        return $this->entityManager;
    }
    protected function __construct() {
        parent::__construct();
        $isDevMode = true;
        $config = Setup::createAnnotationMetadataConfiguration(array("src/Entity"), $isDevMode);

        // database configuration parameters
        $conn = array(
            'driver'   => 'pdo_mysql',
            'host'     => DOCTRINE_HOST,
            'user'     => DOCTRINE_USER,
            'password' => DOCTRINE_PASSWORD,
            'dbname'   => DOCTRINE_DB,
        );

        // obtaining the entity manager
        $this->entityManager = EntityManager::create($conn, $config);
    }
}
