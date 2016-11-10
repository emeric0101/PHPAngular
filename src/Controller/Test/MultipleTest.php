<?php
use Emeric0101\PHPAngular\Core\UnitTest;
use Emeric0101\PHPAngular\Entity\EntityTestP;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\Response;

class MultipleControllerTest extends UnitTest
{
    private $multiple = null;
    public function setUp() {
        $this->multiple = $this->get('Emeric0101\PHPAngular\Controller\Multiple');
    }
    /**
     * @dataProvider providerPrepareGetRequest
     */
    public function testPrepareGetRequest($request)
    {
        $this->invokeMethod($this->multiple, 'prepareGetRequest', [$request]);
        $this->assertEquals($_GET['method'], $request['method']);
        foreach ($request['params'] as $nom => $v) {
            $this->assertEquals($_GET[$nom], $v);
        }

    }

    public function providerPrepareGetRequest()
    {
        return [
            [[
                'method' => 'test',
                'params' => []
            ]]
        ];
    }

}
