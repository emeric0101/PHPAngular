<?php
use phpunit\framework\TestCase;
use Emeric0101\PHPAngular\Entity\User;
use Emeric0101\PHPAngular\Service\DbService;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\Response;

class EntityControllerTest extends TestCase
{
    /**
     * @dataProvider providerTestGet1
     */
    public function testGet1($model, $id, $result, $entity)
    {
        $_GET['controller'] = 'Entity';
        $_GET['method'] = $model;
        $_GET['id'] = $id . "";
        Controller::callController();
        $buffer = Response::getInstance()->getBuffer();
        $this->assertEquals($buffer[$model]->jsonSerialize(), $result);
        $em = DbService::getInstance()->getEntityManager();
        // Cleaning
        if ($entity !== null) {
            $em->remove($entity);
            $em->flush();
        }
    }

    public function providerTestGet1() {
        $entityManager = DbService::getInstance()->getEntityManager();
        $user = new User();
        $user->setPassword("tata");
        $user->setNickname("tata");
        $user->setSex(0);
        $user->setMail("emeric" . time() . "@tata.fr");

        $entityManager->persist($user);
        $entityManager->flush();
        $array = $user->jsonSerialize();
        return [
            ["User", $user->getId(), $array, $user]
        ];
    }
}
