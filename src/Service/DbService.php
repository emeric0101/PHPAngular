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
    public function __construct(CacheService $cache) {
        $this->log = new \Doctrine\DBAL\Logging\DebugStack();
        $isDevMode = true;
        $config = Setup::createAnnotationMetadataConfiguration(array("src/Entity",'vendor/Emeric0101/PHPAngular/src/Entity'), $isDevMode);
        // Cache
        $config->setQueryCacheImpl($cache->getCacheDriver());
        $config->setResultCacheImpl($cache->getCacheDriver());
        $config->setMetadataCacheImpl($cache->getCacheDriver());
        // database configuration parameters
        $conn = array(
            'driver'   => 'pdo_mysql',
            'host'     => DOCTRINE_HOST,
            'user'     => DOCTRINE_USER,
            'password' => DOCTRINE_PASSWORD,
            'dbname'   => DOCTRINE_DB,
        );

        // Add interface
        $evm  = new \Doctrine\Common\EventManager;
        $rtel = new \Doctrine\ORM\Tools\ResolveTargetEntityListener;
        foreach (\Emeric0101\PHPAngular\Config::$ResolveTargetEntities as $interface => $target) {
            $rtel->addResolveTargetEntity($interface, $target, array());

        }
        // Adds a target-entity class
        // Add the ResolveTargetEntityListener
        $evm->addEventListener(\Doctrine\ORM\Events::loadClassMetadata, $rtel);

        // obtaining the entity manager
        $this->entityManager = EntityManager::create($conn, $config, $evm);

        // Logging
        $this->entityManager->getConfiguration()->setSQLLogger($this->log);
    }


}
