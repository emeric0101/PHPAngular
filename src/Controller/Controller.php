<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Service\Response;
use Emeric0101\PHPAngular\Service\Request;

abstract class Controller {
    protected $response = null;
    protected $request = null;
    protected $entityManager = null;

    public function __construct(Response $response, DbService $dbservice, Request $request) {
        $this->response = $response;
        $this->entityManager = $dbservice->getEntityManager();
        $this->request = $request;
    }



}
