<?php
namespace Emeric0101\PHPAngular\Service;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Emeric0101\PHPAngular\Service\Cache as CacheService;
class DbService extends AService {
    private $entityManager = null;
    private $log = null;

    public function getLog() {
        return $this->log;
    }

    public function getEntityManager() {
        return $this->entityManager;
    }

    public function close() {
        $this->entityManager->getConnection()->close();
    }
    // database configuration parameters
    private $conn = array(
        'driver'   => 'pdo_mysql',
        'host'     => DOCTRINE_HOST,
        'user'     => DOCTRINE_USER,
        'password' => DOCTRINE_PASSWORD,
        'dbname'   => DOCTRINE_DB,
    );
    private $config = null;
    private $evm = null;
    public function __construct(CacheService $cache) {
        $this->log = new \Doctrine\DBAL\Logging\DebugStack();
        $isDevMode = true;
        $this->config = Setup::createAnnotationMetadataConfiguration(array("src/Entity",'vendor/Emeric0101/PHPAngular/src/Entity'), $isDevMode);
        // Cache
        $this->config->setQueryCacheImpl($cache->getCacheDriver());
        $this->config->setResultCacheImpl($cache->getCacheDriver());
        //$config->setMetadataCacheImpl($cache->getCacheDriver()); bug with IUser


        // Add interface
        $this->evm  = new \Doctrine\Common\EventManager;
        $rtel = new \Doctrine\ORM\Tools\ResolveTargetEntityListener;
        foreach (\Emeric0101\PHPAngular\Config::$ResolveTargetEntities as $interface => $target) {
            $rtel->addResolveTargetEntity($interface, $target, array());

        }
        // Adds a target-entity class
        // Add the ResolveTargetEntityListener
        $this->evm->addEventListener(\Doctrine\ORM\Events::loadClassMetadata, $rtel);

        // obtaining the entity manager
        $this->createEntityManager();

        // Logging
        //$this->entityManager->getConfiguration()->setSQLLogger($this->log);
    }
    public function createEntityManager() {
      if ($this->entityManager != null) {
        $this->entityManager->close();
      }
      $this->entityManager = EntityManager::create($this->conn, $this->config, $this->evm);
    }

}
