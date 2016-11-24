<?php
use Emeric0101\PHPAngular\Core\UnitTest;
use Emeric0101\PHPAngular\Service\Auth;
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
