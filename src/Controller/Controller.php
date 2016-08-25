<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Service\Response;
use Emeric0101\PHPAngular\Service\Request;

abstract class Controller {
    protected $response = null;
    protected $request = null;
    protected $entityManager = null;
    public function __construct() {
        $this->response = Response::getInstance();
        $this->entityManager = DbService::getInstance()->getEntityManager();
        $this->request = Request::getInstance();
    }
    static function callController() {
        // Getting the controller asked
        $controller = 'Home';
        $method = 'index';
        $request = Request::getInstance();
        $response = Response::getInstance();
        $controllerGet = $request->get("controller", "Home");
        $methodGet = $request->get("method", "index");
        $idGet = intval($request->get('id', ""));
        if (class_exists(PHPANGULAR_BUNDLE . '\\Controller\\' . $controllerGet)) {
			$controllerName = PHPANGULAR_BUNDLE . '\\Controller\\' . $controllerGet;
        }
        else if (class_exists('Emeric0101\\PHPAngular\\Controller\\' . $controllerGet)) {
			$controllerName = 'Emeric0101\\PHPAngular\\Controller\\' . $controllerGet;
        }
        else {
            throw new \Exception("Controller not found");
        }
        $controllerInstance = new $controllerName();
        if (method_exists($controllerInstance, $methodGet)) {
            $method = $methodGet;
        }

        // Manage the return values of the controller called, default TRUE
        $ret = $controllerInstance->$method($idGet);
        if ($ret === null) {
            $response->setResponse('success', true);
        }
        else {
            $response->setResponse('success', $ret);
        }
    }
}
