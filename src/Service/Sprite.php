<?php
namespace Emeric0101\PHPAngular\Service;
use \ForceUTF8\Encoding;
use Emeric0101\PHPAngular\Service\Cache;

class Sprite extends AService {
    function cacheSprite($path, $racine = '', &$width = 1, &$height = 1) {
		static $imageType = [
			'image/png',
            'image/jpeg'
		];

        $imageArray = [];
        $css = '/* Sprite DMO */';
        // On va d'abord chercher tous les fichiers à inclure
        $fileList = scandir($path);
		foreach ($fileList as $file) {
			$pathFile = $path . '/' . $file;
			if (is_dir($pathFile) && $file != '.' && $file != '..') {
				$imageArray = array_merge(self::cacheSprite($pathFile, $file, $width, $height), $imageArray);
			}
			else
            {
				$finfo = finfo_open(FILEINFO_MIME_TYPE);
				$fileInfo = finfo_file($finfo, $pathFile);
				finfo_close($finfo);
				if (in_array($fileInfo, $imageType)) {
					$imageSize = getimagesize($pathFile);
					if ($fileInfo == 'image/png') {
						$imageImported = imagecreatefrompng($pathFile);
						imagesavealpha($imageImported, true);
					}
					else if ($fileInfo == 'image/jpeg') {
						$imageImported = imagecreatefromjpeg($pathFile);
					}
					$width = max($width, $imageSize[0]);
					$oldHeight = $height;
					$height = $height + 10 + $imageSize[1];
                    $imageArray[] = [
                        'classname' => ucfirst($racine). ucfirst(substr($file, 0, -4)),
                        'imageBuffer' => $imageImported,
                        'width' => $imageSize[0],
                        'height' => $imageSize[1]
                    ];
				}
			}
		}
        // Uniquement pour la fonction père
        if ($racine == '') {
            // Création de l'image de base
            $imageSprite = imagecreatetruecolor($width, $height);
            imagealphablending($imageSprite, false);
            imagesavealpha($imageSprite, true);
            $white = imagecolortransparent  ( $imageSprite );
            imagefill($imageSprite, 0, 0, $white);
            imagealphablending($imageSprite, true);
            imagealphablending($imageSprite, false);
            imagesavealpha($imageSprite, true);
            $offsetHeight = 10;
            $css .= PHP_EOL;
            $css .= '.imgSprite';
            $css .= '{ background-image: url("' . URL_ABSOLUTE . 'cache/sprite-' . VERSION . '.png"); }';
            $css .= PHP_EOL;

            foreach ($imageArray as $image) {

                imagecopy($imageSprite, $image['imageBuffer'], 0, 0 + $offsetHeight, 0, 0, $image['width'], $image['height']);
                $css .= PHP_EOL;
                $css .= '.img' . $image['classname'];
                $css .= '{ @extend .imgSprite; background-position: 0px -' . (0+$offsetHeight) . 'px; width: ' . $image['width'] . 'px; height: ' . $image['height'] . 'px}';
                $offsetHeight += $image['height'] + 10;

            }
            // On enregistre l'image
            imagepng($imageSprite, APP_DIR . 'web/cache/sprite.png');

            if (!DMO_DEBUG) {
                $chmod =fileperms (APP_DIR . 'web/scss/_sprite.scss') ;
                if (!($chmod & 0x0010) && !($chmod & 0x0080) && !($chmod & 0x0004)) {
                    echo 'ATTENTION : le chmod de sprite.less est incorrect (droit d\'écriture requis';
                    exit();
                }
            }
            Cache::file_force_contents(APP_DIR . 'web/scss/_sprite.scss', $css);
        }

        return $imageArray;
	}
}
