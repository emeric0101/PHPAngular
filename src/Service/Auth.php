<?php
namespace Emeric0101\PHPAngular\Service;

use Emeric0101\PHPAngular\Service\Login as LoginService;


abstract class IRight{
    protected $flag;
    public function getFlag() {return $this->flag;}
    abstract public function getRight($rightName);
}
class RightGroup extends IRight  implements \JsonSerializable  {
    private $rights = [];
    public function addRight(IRight $right) {
        $this->rights[] = $right;
    }
    public function getRight($rightName) {
        foreach ($this->rights as $right) {
            if ($right->getRight($rightName)) {
                return true;
            }
        }
        return false;
    }
    public function jsonSerialize() {
        $array = [];
        foreach ($this->rights as $right) {
            if ($right instanceof RightGroup) {
                $array[$right->getFlag()] = 'P';
            }
            else {
                $array[$right->getFlag()] = true;

            }
        }
        return $array;
    }
    public function __construct($flag) {
        $this->flag = $flag;
    }
}
class Right extends IRight {
    public function getRight($rightName) {
        if ($this->flag != $rightName) {return false;}
        return true;
    }
    public function __construct(string $flag) {
        $this->flag = $flag;
    }

}
class Auth extends AService {
    private $login;
    private $table = null;
    private function parseRightGroup($rights, $flag, &$table) {
        foreach ($rights as $right) {
            if (is_array($right) && array_key_exists($right[0],$table)) {
                $table[$flag]->addRight($table[$right[0]]);
            }
            elseif (is_string($right)) {
                $table[$flag]->addRight(new Right($right));
            }
        }
    }
    /** Create the right table from the Config
    **/
    private function createTable($rights) {

        $table = [];
        foreach ($rights as $flag => $right) {
            $table[$flag] = new RightGroup($flag);
        }
        foreach ($rights as $flag => $right) {
            $this->parseRightGroup($right, $flag, $table);
        }
        return $table;
    }

    public function getTable() {
        return $this->table;
    }

    public function getRightFromFlag($flag, $right) {
        return $this->table[$flag]->getRight($rightName);
    }

    public function getRight($rightName, $user = null) {
        if ($user == null) {
            $user = $this->login->getUserFromPHPSession();
        }
        if ($user == null) {
            return $this->getRightFromFlag('PUBLIC', $right);
        }
        $groupe = $user->getGroupe();
        if ($groupe == null) {
            return $this->getRightFromFlag('USER', $right);
        }
        $flag = $groupe->getFlag();
        if ($flag == 'ADMIN') {
            return true;
        }
        if ($this->table == null || !array_key_exists($flag, $this->table)) {
            return false;
        }
        return $this->getRightFromFlag($flag, $right);
    }

    public function __construct(ILogin $login) {
        $this->login = $login;
        $this->table = $this->createTable(\Emeric0101\PHPAngular\Config::$rights);
    }
}
