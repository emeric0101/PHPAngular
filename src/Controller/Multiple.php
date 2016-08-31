<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\DbService;

class Multiple extends Controller {

	/**
	* Dispatch all request
	*/
    public function index($id = 0) {
		$post = $this->request->_getPost();
		$buffers = [];
		foreach ($post as $request) {
			$_GET['method'] = $request['method'];
			foreach ($request['params'] as $t => $p) { $_GET[$t] = $p;}
			static::callController($request['controller'], $request['method'], $request['id'], $request['params']);
			$buffer = $this->response->getBuffer();
			$buffer['requestid'] = $request['requestid']; // unique id
			$buffers[] = $buffer;
			$this->response->clear();
		}
		$this->response->setResponse('Multiple', $buffers);
		return true;

    }



}
