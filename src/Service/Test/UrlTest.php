<?php
use Emeric0101\PHPAngular\Core\UnitTest;
use Emeric0101\PHPAngular\Service\Url;

class UrlTest extends UnitTest
{
    private $url;
    public function setUp() {
        $this->url = $this->get('Emeric0101\PHPAngular\Service\Url');
    }
    /**
    * @dataProvider providerMake
    */
    public function testMake($module, $action, $id, $params, $result) {

        $r= $this->url->make($module,$action,$id,$params);
        $this->assertEquals($r, $result);
    }
    public function providerMake() {
        return [
            ['module1', 'action1', 52, [], 'http://localhost/phpangular/web/module1-action1-52'],
            ['module1', 'action1', null, [], 'http://localhost/phpangular/web/module1-action1'],
            ['module1', 'action1', null, ['param' => 'value'], 'http://localhost/phpangular/web/module1-action1?param=value'],
            ['module1', 'action1', null, ['param' => 'value','param1' => 'value1'], 'http://localhost/phpangular/web/module1-action1?param=value&param1=value1']
        ];
    }
    /**
    * @dataProvider providerMakeApi
    */
    public function testMakeApi($module, $action, $id, $params, $result) {
        $r= $this->url->makeApi($module,$action,$id,$params);
        $this->assertEquals($r, $result);
    }
    public function providerMakeApi() {
        return [
            ['module1', 'action1', 52, [], 'http://localhost/phpangular/web/Module1/action1/52.json'],
            ['module1', 'action1', null, [], 'http://localhost/phpangular/web/Module1/action1.json'],
            ['module1', 'action1', null, ['param' => 'value'], 'http://localhost/phpangular/web/Module1/action1.json?param=value'],
            ['module1', 'action1', null, ['param' => 'value','param1' => 'value1'], 'http://localhost/phpangular/web/Module1/action1.json?param=value&param1=value1']
        ];
    }
}
