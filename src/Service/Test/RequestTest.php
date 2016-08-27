<?php
use phpunit\framework\TestCase;
use Emeric0101\PHPAngular\Service\Request;

class RequestTest extends TestCase
{
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

    private $request = null;
    function setUp() {
        $this->request = Request::getInstance();

    }

    public function test_getPost() {
        $args = [];
        $_POST = [];
    //    $return = $this->invokeMethod($this->request,'_getPost', $args);
    //    $this->assertEquals($return, []);
    }

    /**
     * @dataProvider providerCollapseType
     */
    public function testCollapseType($src, $default, $resultExpect) {
        $args = [$src, $default];
        $_POST = [];
        $return = $this->invokeMethod($this->request,'_collapseType', $args);
        $this->assertEquals($return, $resultExpect);
    }

    public function providerCollapseType() {
        return [
            ['test', '', 'test'],
            [54, '', ''],
            ['d54ed', 0, 0],
            [53.2, 0.0, 53.2],
            [true, true, true],
            ['true', true, true],
            ['false', true, true]
        ];
    }

    /**
     * @dataProvider provider_global
     */
    public function test_global(string $name, $default, $type, $resultExpect) {
        $args = [
            $name, $default, $type
        ];
        $result = $this->invokeMethod($this->request, '_global', $args);
        $this->assertEquals($resultExpect, $result);
    }
    /** Todo : POST test !! */
    public function provider_global() {
        $_GET['test'] = 'testget';

        return [
            ['test', '', Request::GET, 'testget']
        ];
    }


    /**
     * @dataProvider providerTestGet1
     */
    public function testGet1($name, $default, $value)
    {
        $a = Request::getInstance()->get($name, $default);
        $this->assertEquals($a, $value);
    }

    public function providerTestGet1() {
        $_GET["var1"] = "test";

        return [
            ["var1", "", "test"],
            ["var2", "", ""]
        ];
    }
}
