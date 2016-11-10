<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Service\Response;
use Emeric0101\PHPAngular\Service\Request;

abstract class Controller {
    /**
     * @Inject
     * @var Response
     */
    protected $response;
    /**
     * @Inject
     * @var DbService
     */
    protected $dbService;
    /**
     * @Inject
     * @var Request
     */
    protected $request;

    /** We use this method to let user set their own constructor with injection */
    public function setBaseService() {
        $this->entityManager = $this->dbService->getEntityManager();
    }
}
