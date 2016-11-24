<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Service\Response;
use Emeric0101\PHPAngular\Service\Request;

abstract class Controller {
    protected $response = null;
    protected $request = null;
    protected $entityManager = null;
    /** We use this method to let user set their own constructor with injection */
    public function setBaseService( $response,  $dbService,  $request) {
        $this->response = $response;
        if ($dbService != null) { // unit testintg
            $this->entityManager = $dbService->getEntityManager();

        }
        $this->request = $request;
    }
}
