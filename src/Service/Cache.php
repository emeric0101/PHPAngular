<?php
namespace Emeric0101\PHPAngular\Service;
use Leafo\ScssPhp\Compiler;
class Cache{

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
