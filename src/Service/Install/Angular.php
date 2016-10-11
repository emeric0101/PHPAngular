<?php
namespace Emeric0101\PHPAngular\Service\Install;
use Doctrine\Common\Annotations\AnnotationReader;
use Emeric0101\PHPAngular\Service\Utils;

class Angular {
    private $packagePath = '';

    public function createApp() {
        $this->packagePath = getcwd() . '/vendor/emeric0101/phpangular/';
        if (!file_exists('app/Component'))
        {
            mkdir('app/Component/Index/Index', 0777, true);
            mkdir('app/Entity', 0777, true);
            mkdir('app/Service', 0777, true);
        }

        Utils::recurse_copy($this->packagePath . 'web', 'app');

    }
}
