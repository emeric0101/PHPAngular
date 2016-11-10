<?php
use Emeric0101\PHPAngular\Core\UnitTest;
use Emeric0101\PHPAngular\Entity\EntityTestP;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\Response;

class EntityControllerTest extends UnitTest
{

    /**
     * @dataProvider providerTestGets1
     */
    public function testGets1($model, $result, $entity)
    {
        Response::getInstance()->clear();

        $_GET['controller'] = 'Entity';
        $_GET['method'] = $model;
        $_GET['id'] = 0;

        Controller::callController();
        $buffer = Response::getInstance()->getBuffer();
        var_dump($buffer,$result);
        foreach ($result[$model . 's'] as $r) {
            $this->assertEquals($r->jsonSerialize(), $result);
        }
        $em = DbService::getInstance()->getEntityManager();
        // Cleaning
        if (!empty($entity)) {
            foreach ($entity as $e) {
                $em->remove($e);
            }
            $em->flush();
        }
    }

    public function providerTestGets1() {
        $entityManager = DbService::getInstance()->getEntityManager();

    // Cleaning
        $entities = $entityManager->getRepository('Emeric0101\\PHPAngular\\Entity\\EntityTestP')->findAll();
        foreach ($entities as $e) {
            $entityManager->remove($e);
        }
        $entityManager->flush();


        $entityTest1 = new EntityTestP();
        $entityTest1->setTest("tata1");
        $entityTest2 = new EntityTestP();
        $entityTest2->setTest("tata2");


        $entityManager->persist($entityTest1);
        $entityManager->persist($entityTest2);
        $entityManager->flush();
        $array =
            [$entityTest1->jsonSerialize(),$entityTest2->jsonSerialize()]
        ;
        return [
            ["EntityTestP", $array, [$entityTest1, $entityTest2]]
        ];
    }
}
