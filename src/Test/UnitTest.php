<?php
namespace Emeric0101\PHPAngular\Test;
use DI\ContainerBuilder;
use PHPUnit\Framework\TestCase;
use Emeric0101\PHPAngular\Service\ILogin;
use Emeric0101\PHPAngular\Entity\{IUser ,IGroup};

class GroupTest implements IGroup {
    private $flag;
    public function getFlag() {
        return $this->flag;
    }
    public function __construct($flag) {
        $this->flag = $flag;
    }
}

class UserTest implements IUser {
    public function setMail($mail) {}
    public function getMail() {}

        private $groupe;
    public function getPassword() {}
    public function setHashedPassword(string $p) {}
        public function __construct($flag) {
            $this->groupe = new GroupTest($flag);
        }
    /**
    @return IGroupe
    **/
    public function getGroupe() {

        return $this->groupe;
    }
}


class LoginTest implements ILogin {
    public function getUserFromPHPSession() {
        $user = new UserTest('USER');
        return $user;
    }
    public function getUserFromSession($sid) {

    }
    public function logout() {

    }
    public function hashPassword($p) {

    }
    public function login($mail, $password, $stayConnected) {

    }
    public function loginWithUser($user){

    }
}

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
            if (file_exists('src/core/config-di.test.php')) {
                $containerBuilder->addDefinitions('src/core/config-di.test.php');
            }
            else {
                $containerBuilder->addDefinitions('vendor/emeric0101/PHPAngular/src/core/config-di.test.php');
            }
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
