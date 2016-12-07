<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Controller\Controller;
use Emeric0101\PHPAngular\Service\Cache;
use Emeric0101\PHPAngular\Service\Sprite;

class CacheController extends Controller {
    private $cache = null;
    private $sprite = null;

    public function __construct(Cache $cache, Sprite $sprite) {
        $this->cache = $cache;
        $this->sprite = $sprite;
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
        if (!\Emeric0101\PHPAngular\Config::$phpSassCompiler) {
            return false;
        }
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
        $spriteService = $this->sprite->cacheSprite(APP_DIR . 'web/images');
    }

}
