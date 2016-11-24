<?php
use Emeric0101\PHPAngular\Test\UnitTest;
use Emeric0101\PHPAngular\Service\Request;

class RequestTest extends UnitTest
{


    private $request = null;
    function setUp() {
        $this->request = $this->get('Emeric0101\PHPAngular\Service\Request');

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
        $t = [];
        $requestClass = new Emeric0101\PHPAngular\Service\RequestClass($t);
        $return = $this->invokeMethod($requestClass,'_collapseType', $args);
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
     * @dataProvider providerTestGet1
     */
    public function testGet1($name, $default, $value)
    {
        $a = $this->get('Emeric0101\PHPAngular\Service\Request')->get($name, $default);
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
