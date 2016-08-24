<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\Cache;
use Emeric0101\PHPAngular\Service\Sprite;

class CacheController extends Controller {
    private $cache = null;

    public function __construct() {
        $this->cache = new Cache();
    }
    private function _generate($extension, $test = false) {
        echo $this->cache->generate($extension, $test);
        exit();
    }
    public function generateJs() {
        header('Content-type: application/javascript');
        $this->_generate("js");
    }

    public function generateCss() {
        header("Content-type: text/css");
        $this->_generate("scss");
    }


    public function clearCache() {
        ob_start();
        $this->generateSprite();
        ob_end_clean();
        echo 'Cache vide';
        exit();
    }

    public function generateIndex() {
        echo $this->cache->generateIndex();
        exit();
    }
    public function generateSprite() {
        $spriteService = Sprite::getInstance()->cacheSprite(APP_DIR . 'web/images');
    }

}
