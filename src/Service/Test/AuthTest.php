<?php
use Emeric0101\PHPAngular\Test\UnitTest;
use Emeric0101\PHPAngular\Service\Auth;
use Emeric0101\PHPAngular\Test\LoginTest;
use Emeric0101\PHPAngular\Test\UserTest;


class AuthTest extends UnitTest
{
    function setUp() {
        $this->login = new LoginTest();
        $this->auth = new Auth($this->login);
    }

    /**
     * @dataProvider ptestUser
     */
    public function testUser($droit, $valid, $user) {
        $this->assertEquals($this->auth->getRight($droit, $user), $valid);
    }
    public function ptestUser() {
        $user = new UserTest('MODERATOR');
        $userAdmin = new UserTest('ADMIN');
        return [
            ['user-edit', false, null],
            ['user-edit-itself', true, null],
            ['user-edit', true, $user],
            ['user-edit-itself', true, $user],
            ['admin', false, $user],
            ['admin', true, $userAdmin],
            ['user-edit', true, $userAdmin],
            ['user-edit-itself', true, $userAdmin]
        ];
    }

    /**
     * @dataProvider providerCreateTable
     */
    public function testCreateTable($table, $tests) {
        $ret = $this->invokeMethod($this->auth,'createTable', [$table]);
        foreach ($tests as $test) {
            $this->assertEquals($ret[$test[0]]->getRight($test[1]), $test[2]);
        }

    }

    public function providerCreateTable() {
        return [
            [[
                'MODERATOR' => [
                    ['USER'],
                    'user-edit'
                ],
                'USER' => [
                    'user-edit-itself'
                ],
                'PUBLIC' => []
            ], [
                ['MODERATOR', 'user-edit', true],
                ['MODERATOR', 'user-edit-itself', true],
                ['USER', 'user-edit', false],
                ['USER', 'user-edit-itself', true],
                ['PUBLIC', 'user-edit-itself', false],
                ['PUBLIC', 'user-edit', false],
                ]]
        ];
    }



}
