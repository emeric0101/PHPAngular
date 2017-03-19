<?php
namespace Emeric0101\PHPAngular\Core;
use DI\ContainerBuilder;
use phpunit\framework\TestCase;

abstract class UnitTest extends TestCase
{
    private $container = null;

    /**
    * Get a class from the DI system
    * @param $key name (Emeric0101\PHPAngular\Service\DbService)
    */
    public function get($key) {
        if ($this->container == null) {
            $containerBuilder = new ContainerBuilder;
            $this->container = $containerBuilder->build();
        }

        return $this->container->get($key);
    }

    /**
     * Call protected/private method of a class.
     *
     * @param object &$object    Instantiated object that we will run method on.
     * @param string $methodName Method name to call
     * @param array  $parameters Array of parameters to pass into method.
     *
     * @return mixed Method return.
     */
    public function invokeMethod(&$object, $methodName, array $parameters = array())
    {
        $reflection = new \ReflectionClass(get_class($object));
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);

        return $method->invokeArgs($object, $parameters);
    }
}
