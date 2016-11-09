<?php
namespace Emeric0101\PHPAngular\Service;

class RequestClass {
    private $variable = null;

	public function __construct(&$var) {
		$this->variable = &$var;
	}
	public function count() {
		return count($this->variable);
	}
	public function value($name, $default = '') {
		if ($this->variable == null || ! array_key_exists($name, $this->variable)) {
			return $default;
		}

		return $this->_collapseType($this->variable[$name], $default);
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
			case 'object':
				return new RequestClass($src);
			break;
			case 'array':
				return new RequestClass($src);
			break;
            default:

        }

        return $default;
    }

}

class Request extends AService
{
    const GET = 0;
    const POST = 1;
    const SESSION = 2;

    /** Return the reference of $_POST
    */
    public function &_getPost() {
        $global = &$_POST;
        $json = file_get_contents('php://input');
        if (empty($global) && !empty($json)) {
            $global = (array)json_decode($json, true);
        }
        return $global;
    }



	public function getAsRequestClass() {
		return $requestClass = new RequestClass($_GET);
	}
	public function postAsRequestClass() {
		return $requestClass = new RequestClass($this->_getPost());
	}
	public function sessionAsRequestClass() {
		return $requestClass = new RequestClass($_SESSION);
	}

	// DEPRECATED : using requestclass instead
    public function postFromArray(string $arrayName, string $key, $default = "") {
        $post = $this->_getPost();
        if (!is_array($post[$arrayName]) || !array_key_exists($key, $post[$arrayName])) {
            return $default;
        }
		$requestClass = $this->postAsRequestClass();
		$requestValues = $requestClass->value($arrayName, []);
        return $requestValues->value($key, $default);
    }

    public function get(string $name, $default = "") {
        $requestClass = $this->getAsRequestClass();
		return $requestClass->value($name, $default);
    }

    public function post(string $name, $default = "") {
        $requestClass = $this->postAsRequestClass();
		return $requestClass->value($name, $default);
		}

    public function session(string $name, $default = "") {
        $requestClass = $this->sessionAsRequestClass();
		return $requestClass->value($name, $default);
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
