<?php
use Emeric0101\PHPAngular\Core\UnitTest;
use Emeric0101\PHPAngular\Service\Cache;

class TestCacheClass {

}

class CacheTest extends UnitTest
{
    function setUp() {
        $this->cache = $this->get('Emeric0101\PHPAngular\Service\Cache');

    }


    /**
     * @dataProvider pfetch
     */
    public function testfetch($key, $value) {
        $this->cache->save($key, $value);
        $this->assertEquals($this->cache->fetch($key), $value);
        $this->cache->delete($key);
        $this->assertEquals($this->cache->fetch($key), null);
    }

    public function pfetch() {
        return [
            ['firstValue', true],
            ['2nvalue', 12],
            ['3tdvalue', 'true'],
            ['array', [1,2]],
            ['assarray', ['ta' => 1, 'to' => 2]],
            ['class', new TestCacheClass()]
        ];
    }


}
