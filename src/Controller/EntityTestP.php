<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Controller\Entity;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Entity\EntityTestP;
class EntityTestP extends Entity {

    public function post($id = 0) {
        if ($id == 0) {
            $entity = new EntityTestP();
        }
        else {
            $entity = $this->entityManager->find("Emeric0101\PHPAngular\Entity\EntityTestP", $id);
        }

        $entity->setTest($this->request->postFromArray("EntityTestP", "test"));
        $this->entityManager->persist($entity);
        $this->entityManager->flush();
        $this->response->setResponse("EntityTestP", $entity);
    }

}
