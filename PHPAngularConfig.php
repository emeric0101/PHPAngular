<?php
namespace Emeric0101\PHPAngular;
final class Config {
    const PHPANGULAR_BUNDLE = '\\Emeric0101\\PHPAngular';
    const APP_TITLE = 'PHPAngular !';
    /**
    *   All file to load in the index.php
    */
    static $jsModule = [
        'node_modules/es6-promise/dist/es6-promise.auto.js'
    ];
    /**
    *   All css files to load in the index.php
    */
    static $cssModule = [

    ];
    /**
    *   All meta tags files to load in the index.php
    */
    static $metaTags = [
        'viewport' => 'width=device-width, initial-scale=1'
    ];
    static $ResolveTargetEntities = [
    ];
    // flag => rights
    static $rights = [
        'MODERATOR' => ['user-edit', ['USER']],
        'USER' => ['user-edit-itself']
    ];
    static $cache = 'FILE';
    static $scssPath = [];

    // enable the phpSass compiler
    static $phpSassCompiler = true;

}
