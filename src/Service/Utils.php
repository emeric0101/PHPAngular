<?php
namespace Emeric0101\PHPAngular\Service;
class CopyError extends \Exception {}
class Utils {

    public static function recurse_copy($src,$dst, $force = true) {
        $dir = opendir($src);
        @mkdir($dst);
        while(false !== ( $file = readdir($dir)) ) {
            if (( $file != '.' ) && ( $file != '..' )) {
                if ( is_dir($src . '/' . $file) ) {
                    self::recurse_copy($src . '/' . $file,$dst . '/' . $file, $force);
                }
                else {
                    if (!file_exists($dst . '/' . $file) || $force) {
                        $result = copy($src . '/' . $file,$dst . '/' . $file);
                        if ($result == false) {
							var_dump('src : ' . $src . '/' . $file, file_exists('src : ' . $src . '/' . $file));
							var_dump('dst: ' . $dst . '/' . $file);
                            throw new CopyError();
                        }
                    }
                }
            }
        }
        closedir($dir);
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


    public static function copyIfNotExists($file, $dst) {
        if (!file_exists($dst)) {
            copy($file, $dst);
        }
        else {
            echo 'Skipping ' . $dst . ' : already exists' . PHP_EOL;
        }
    }
}
