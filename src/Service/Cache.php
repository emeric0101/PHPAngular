<?php
namespace Emeric0101\PHPAngular\Service;
use Leafo\ScssPhp\Compiler;
class CacheException extends \Exception {

}
class Cache extends AService {
    private $cacheDriver = null;
    public function getCacheDriver () {
        return $this->cacheDriver;
    }
    public function __construct() {
        switch (\Emeric0101\PHPAngular\Config::$cache)
        {
            case 'APCU':
                $this->cacheDriver = new \Doctrine\Common\Cache\ApcuCache();
            break;
            case 'FILE':
                $this->cacheDriver = new \Doctrine\Common\Cache\FilesystemCache(APP_DIR . 'cache');
            break;
            case 'MEMCACHE':
                $this->cacheDriver = new \Doctrine\Common\Cache\MemcacheCache();
                $memcache = new \Memcache();
                $memcache->connect(\Emeric0101\PHPAngular\Config::$cacheHost, \Emeric0101\PHPAngular\Config::$cachePort);
                $this->cacheDriver->setMemcache($memcache);
            break;
            case 'MEMCACHED':
                $this->cacheDriver = new \Doctrine\Common\Cache\MemcachedCache();
                $memcached = new \Memcached();
                $memcached->connect(\Emeric0101\PHPAngular\Config::$cacheHost, \Emeric0101\PHPAngular\Config::$cachePort);
                $this->cacheDriver->setMemcache($memcached);
            break;
            case 'REDIS':
                $this->cacheDriver = new \Doctrine\Common\Cache\RedisCache();
            break;
            default:
                $this->cacheDriver = new \Doctrine\Common\Cache\ArrayCache();
        }
    }
    /** fetch value from the cache
    * @param $key string
    * return null if not exist
     */
    public function fetch($key) {
        if (!$this->cacheDriver->contains($key)) {return null;}
        return $this->cacheDriver->fetch($key);
    }
    /**
    * save an item into the cacheDriver
    * @param $key
    * @param $value
    * @param $lifetome (25200s)
    */
    public function save($key, $value, $lifetime = 25200) {
        $ret = $this->cacheDriver->save($key, $value);
        if (!$ret) {
            throw new CacheException("Unable to save : " . $key);
        }
        return true;
    }
    /** delete value from the cache
    * @param $key string
    * return null if not exist
     */
    public function delete($key) {
        $this->cacheDriver->delete($key);
    }

    /**
	 * Parse les dossiers à la recherche de fichier d'extension précisé et renvoi un tableau de ces fichiers
	 * recursif
	 * @param type $dir
	 * @param type $extention
	 * @param type $destinationArray
	 */
	private static function scandirOB($dir, $extention, &$destinationArray) {
		$jsFiles = scandir($dir);
		foreach ($jsFiles as $jsFile) {
			if (is_file($dir . '/' . $jsFile)) {
				if (substr($jsFile,  -strlen($extention)) == $extention) {
					$destinationArray[] = $dir . '/' . $jsFile;
				}
			}
			else {
				if (is_dir($dir . '/' . $jsFile) AND $jsFile != '.' AND $jsFile != '..') {
					static::scandirOB($dir . '/' . $jsFile, $extention, $destinationArray);
				}
			}
		}
	}
    /**
	 * Write a file with the content
	 * @param type $dir
	 * @param type $contents
	 * @param type $flags
	 * @return type
	 */
	public static function file_force_contents($dir, $contents, $flags = 0){
		$dir = explode('/', $dir);
		$file = array_pop($dir);
		$dir = implode('/', $dir);
		clearstatcache(true, $dir);
		if(!file_exists($dir)){mkdir($dir, 0705, true);}
		return file_put_contents($dir . '/' . $file, $contents, $flags);
	}

    public function generateIndex() {
        $baseUrl = URL_ABSOLUTE;
        ob_start();
        include(APP_DIR . 'src/layout/index.php');
        $content =  ob_get_contents();
        ob_end_clean();
        if (!PHPANGULAR_DEBUG) {
            static::file_force_contents(APP_DIR . 'web/index.php', $content);
        }
        return $content;
    }

    /**
    *   Generate a file in the cache folder from a set of file by extension
    *   @param $extension string The extension requested
    *   @param $test boolean Get only test file
    */
    public function generate($extension = 'js') {
        $dirs = [];
        if ($extension == 'js') {
            $dirs = \Emeric0101\PHPAngular\Config::$jsModule;
            $dirs[] = APP_DIR . 'web/config.js';
        }

        static::scandirOB(APP_DIR . 'web/core', $extension, $dirs);
        static::scandirOB(APP_DIR . 'web/' . $extension, $extension, $dirs);
        static::scandirOB(APP_DIR . 'web/template', $extension, $dirs);
        $content = '';
        $nbExtension = strlen($extension);
        foreach ($dirs as $dir) {
            if (substr($dir, -($nbExtension + 5)) == "test." . $extension) { continue;}
            $content .= file_get_contents($dir) . PHP_EOL;
        }
        if ($extension == 'scss') {
            $scss = new Compiler();
            if (!PHPANGULAR_DEBUG) {
                $scss->setFormatter("Leafo\ScssPhp\Formatter\Crunched");
            }
            $content = $scss->compile($content);
            $extension = 'css';
        }


        if (!PHPANGULAR_DEBUG) {
            static::file_force_contents(APP_DIR . 'web/cache/cache.' . $extension, $content);
        }
        return $content;
    }

}
