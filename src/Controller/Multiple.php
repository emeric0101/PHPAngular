<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Service\{ControllerService, Request, Response};
class Multiple extends Controller {
	private $controllerService = null;
	public function __construct(
	ControllerService $controllerService,
	Request $request,
	Response $response
	) {
		$this->controllerService = $controllerService;
		$this->request = $request;
		$this->response = $response;
	}

	private function prepareGetRequest($request) {
		$_GET['method'] = $request['method'];
		foreach ($request['params'] as $t => $p) { $_GET[$t] = $p;}
	}

	/**
	* Dispatch all request
	*/
    public function index($id = 0) {
		$post = $this->request->_getPost();
		$buffers = [];
		foreach ($post as $request) {
			$this->prepareGetRequest($request);
			$this->controllerService->callController($request['controller'], $request['method'], $request['id'], $request['params']);
			$buffer = $this->response->getBuffer();
			$buffer['requestid'] = $request['requestid']; // unique id
			$buffers[] = $buffer;
			$this->response->clear();
		}
		$this->response->setResponse('Multiple', $buffers);
		return true;

    }



}
