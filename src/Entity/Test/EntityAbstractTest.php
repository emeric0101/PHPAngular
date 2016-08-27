<?php
use PHPUnit\Framework\TestCase;
use Emeric0101\PHPAngular\Entity\EntityTestP;
class EntityAbstractTest extends TestCase
{
    /**
     * @dataProvider providerJsonSerialize
     */
    public function testJsonSerialize($user, $array)
    {
        $a = $user->jsonSerialize();
        $this->assertEquals($a, $array);
    }

    public function providerJsonSerialize() {
        $user1 = new EntityTestP();
        $array1 = [
            'id' => null,
            'test' => null
        ];
        $user2 = new EntityTestP();
        $user2->setTest("test1");
        $array2 = [
            'id' => null,
            'test' => 'test1'
        ];
        return [
            [$user1, $array1],
            [$user2, $array2]
        ];
    }
}
