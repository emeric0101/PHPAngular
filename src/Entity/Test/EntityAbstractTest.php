<?php
use PHPUnit\Framework\TestCase;
use Emeric0101\PHPAngular\Entity\User;
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
        $user1 = new User();
        $array1 = [
            'id' => null,
            'firstName' => null,
            'lastName' => null,
            'nickname' => null,
            'password' => null,
            'presentation' => null,
            'address' => null,
            'cp' => null,
            'fbid' => null,
            'city' => null,
            'country' => null,
            'sex' => null,
            'mail' => null,
            'created' => null,
            'birthday' => null,
            'score' => null,
            'avatar' => null,
            'photos' => null,
            'userFriends' => null,
            'pets' => null
        ];
        $user2 = new User();
        $user2->setNickname("emeric");
        $user2->setAddress("adresse");
        $user2->setCp("cp");
        $user2->setCity("city");
        $array2 = [
            'id' => null,
            'firstName' => null,
            'lastName' => null,
            'nickname' => "emeric",
            'password' => null,
            'presentation' => null,
            'address' => 'adresse',
            'cp' => 'cp',
            'city' => 'city',
            'fbid' => null,
            'country' => null,
            'sex' => null,
            'mail' => null,
            'created' => null,
            'birthday' => null,
            'score' => null,
            'avatar' => null,
            'photos' => null,
            'userFriends' => null,
            'pets' => null
        ];
        return [
            [$user1, $array1],
            [$user2, $array2]
        ];
    }
}
