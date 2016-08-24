<?php
use phpunit\framework\TestCase;
use Emeric0101\PHPAngular\Service\Request;

class RequestTest extends TestCase
{
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
