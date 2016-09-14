<?php
namespace Emeric0101\PHPAngular\Service;
class Request extends AService
{
    const GET = 0;
    const POST = 1;
    const SESSION = 2;

    /** Return the reference of $_POST
    */
    private function &_getPost() {
        $global = &$_POST;
        $json = file_get_contents('php://input');
        if (empty($global) && !empty($json)) {
            $global = (array)json_decode($json, true);
        }
        return $global;
    }
    /**
    * Check type of src with default
    */
    private function _collapseType($src, $default) {
        $type = gettype($src);
        $typeTargetd = gettype($default);
        switch ($typeTargetd) {
            case 'integer':
                if ($type == "string" || $type == "integer") {
                    return intval($src);
                }
            break;
            case 'double':
                if ($type == "string" || $type == "integer" || $type == "double") {
                    return floatval($src);
                }
            break;
            case 'string':
                if ($type == 'string') {
                    return strval($src);
                }
            break;
            case 'boolean':
                if ($type == 'boolean' || $type == 'string' || $type == 'integer') {
                    return boolval($src);
                }
            break;
            default:
        }

        return $default;
    }

    /**
    * get
    * @param string name
    * @param mixed default Default variable to return if not exist (must be the same type than the requested var)
    **/
    private function _global(string $name, $default, $type)
    {
        switch ($type) {
            case static::GET:
                $global = &$_GET;
                break;
            case static::POST:
                $global = &$this->_getPost();
                break;
            case static::SESSION:
                $global = &$_SESSION;
                break;

            default:
                throw new \Exception("Unknown global type : " . $type);
                break;
        }
        if (!isset($global[$name])) {
            return $default;
        }
        return $this->_collapseType($global[$name], $default);
    }

    public function postFromArray(string $arrayName, string $key, $default = "") {
        $post = $this->_getPost();
        if (!is_array($post[$arrayName]) || !array_key_exists($key, $post[$arrayName])) {
            return $default;
        }
        return $this->_collapseType($post[$arrayName][$key], $default);
    }

    public function get(string $name, $default = "") {
        return $this->_global($name, $default, static::GET);
    }

    public function post(string $name, $default = "") {
        return $this->_global($name, $default, static::POST);
    }

    public function session(string $name, $default = "") {
        return $this->_global($name, $default, static::SESSION);
    }

    /**
    *    Return if the POST is empty
    **/
    public function isPostEmpty() {
        return $this->isEmpty(static::POST);
    }
    /**
    *    Return if the var is empty
    *   @param type static::POST, static::GET, static::SESSION
    **/
    private function isEmpty($type) {
        switch ($type) {
            case static::GET:
                $global = &$_GET;
                break;
            case static::POST:
                $global = &$this->_getPost();
                break;
            case static::SESSION:
                $global = &$_SESSION;
                break;

            default:
                throw new \Exception("Unknown global type : " . $type);
                break;
        }
        return empty($global);
    }

    /**
    * Unset a var
    */
    private function unsetGlobal($var, $type) {
        switch ($type) {
            case static::GET:
                $global = &$_GET;
                break;
            case static::POST:
                $global = &$this->_getPost();
                break;
            case static::SESSION:
                $global = &$_SESSION;
                break;

            default:
                throw new \Exception("Unknown global type : " . $type);
                break;
        }
        if (!array_key_exists($var, $global)) {
            return false;
        }
        unset($global[$var]);
        return true;
    }
    /**
    * Unset a var from SESSION
    * @param var string
    */
    public function unsetSession($var) {
        $this->unsetGlobal($var, static::SESSION);
    }
    /**
    * Unset a var from Get
    * @param var string
    */
    public function unsetGet($var) {
        $this->unsetGlobal($var, static::GET);
    }
    /**
    * Unset a var from Post
    * @param var string
    */
    public function unsetPost($var) {
        $this->unsetGlobal($var, static::POST);
    }


    /* Set value to session **/
    public function setSession(string $name, $var) {
        $_SESSION[$name] = $var;
    }
    /**
    * Return a file from $_FILES
    */
    public function file(string $name) {
        if ( !empty( $_FILES ) ) {
            return $_FILES[ $name ];
        } else {
            return false;
        }

    }
}
