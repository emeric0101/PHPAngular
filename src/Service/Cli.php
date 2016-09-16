<?php
namespace Emeric0101\PHPAngular\Service;
use Doctrine\Common\Annotations\AnnotationReader;
class CliCopyError extends \Exception {}
class Cli extends AService {
    private $targetJs = '';
    public function __construct() {
        $this->targetJs = implode('.', explode('\\', substr(\Emeric0101\PHPAngular\Config::PHPANGULAR_BUNDLE, 1)));

    }
    private $entities = [];

    private function recurse_copy($src,$dst, $force = true) {
        $dir = opendir($src);
        @mkdir($dst);
        while(false !== ( $file = readdir($dir)) ) {
            if (( $file != '.' ) && ( $file != '..' )) {
                if ( is_dir($src . '/' . $file) ) {
                    $this->recurse_copy($src . '/' . $file,$dst . '/' . $file, $force);
                }
                else {
                    if (!file_exists($dst . '/' . $file) || $force) {
                        $result = copy($src . '/' . $file,$dst . '/' . $file);
                        if ($result == false) {
							var_dump('src : ' . $src . '/' . $file, file_exists('src : ' . $src . '/' . $file));
							var_dump('dst: ' . $dst . '/' . $file);
                            throw new CliCopyError();
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

    private function createAttributes($name, $type) {
        $types = [
            'text' => 'string',
            'string' => 'string',
            'integer' => 'number',
            'float' => 'number'
        ];
        if (array_key_exists($type, $types)) {
            $type = $types[$type];
        }
        else {
            $type = 'any';
        }
        $code = '  		private ' . $name . ' :' . $type . ';'. PHP_EOL;
        $code .= '		get' . ucFirst($name) . '() : ' . $type . ' {' . PHP_EOL;
        $code .= '			return this.' . $name . ';' . PHP_EOL;
        $code .= '		}' . PHP_EOL;
        $code .= '      set' . ucFirst($name) . '(v : ' . $type . ')  {' . PHP_EOL;
        $code .= '          this.setValue(\'' . $name . '\', v);' . PHP_EOL;
        $code .= '      }' . PHP_EOL;
        return $code;
    }
    private function createOneToOne($name, $targetEntity) {
        $typeFnc = implode('.', explode('\\', $targetEntity));
        $code = '  		private ' . $name . ' :' . $typeFnc . ' = null;'. PHP_EOL;
        $code .= '		get' . ucFirst($name) . '() : ' . $typeFnc . ' {' . PHP_EOL;
        $code .= '			return this.foreignKey(\'' . $name . '\');' . PHP_EOL;
        $code .= '		}' . PHP_EOL;
        $code .= '      set' . ucFirst($name) . '(v : ' . $typeFnc . ') {' . PHP_EOL;
        $code .= '          this.setValue(\'' . $name . '\', v);' . PHP_EOL;
        $code .= '      }' . PHP_EOL;
        return $code;
    }
    private function createOneToMany($name, $targetEntity) {
        $typeFnc = implode('.', explode('\\', $targetEntity));
        $code = '  		private ' . $name . ' :' . $typeFnc . ' = null;'. PHP_EOL;
        $code .= '		get' . ucFirst($name) . '() : ' . $typeFnc . ' {' . PHP_EOL;
        $code .= '			return this.foreignKeys(\'' . $name . '\');' . PHP_EOL;
        $code .= '		}' . PHP_EOL;
        $code .= '      set' . ucFirst($name) . '(v : ' . $typeFnc . '[]) {' . PHP_EOL;
        $code .= '          this.setValue(\'' . $name . '\', v);' . PHP_EOL;
        $code .= '      }' . PHP_EOL;
        return $code;
    }



    function install() {
        echo 'Phangular.io - Generate entities' . PHP_EOL;

        $this->createWeb(false);
        $this->createEntityFactory($this->targetJs);
        echo PHP_EOL;
        $this->entities = $this->getEntities();
        foreach ($this->entities as $entity) {
            $this->updateEntity($entity, false);
        }
        echo PHP_EOL . 'Okay, everything is ready but.... you have to do a last little thing' . PHP_EOL;
        echo 'You have to run some commands : ' . PHP_EOL;
        echo 'cd web' . PHP_EOL;
        echo 'bower install' . PHP_EOL;
        echo 'Then, you have to compile everything with Typescript compiler (command "tsc")' . PHP_EOL;

    }

    function update() {
        $this->createWeb();
    }

    function updateEntity($entity, $force = true) {
        $cwd = getcwd();
        $className = \Emeric0101\PHPAngular\Config::PHPANGULAR_BUNDLE . '\\Entity\\';
        if ($entity == '') {return false;}
        // path of the class
        $path = $cwd . '/web/js/Entity/' . $entity . '.ts';
        // name of the class
        $classNameCurrent = $className . $entity;
        echo 'Class ' . $classNameCurrent . '...';
        // skip if exist
        if (file_exists($path) && !$force) {
            echo 'file already exist' . PHP_EOL;
            return false;
        }
        else {
            echo PHP_EOL;
        }
        if (!class_exists($classNameCurrent)) {
            echo 'ERROR : class' . $classNameCurrent . ' does not exist !' . PHP_EOL;
            return false;
        }
        $class = new $classNameCurrent();
        $code = 'module ' . $this->targetJs . '.Entity {' . PHP_EOL;
        $code .= '    export class '. $entity . ' extends Emeric0101.PHPAngular.Entity.Model {' . PHP_EOL;

        $reflectionClass = new \ReflectionClass($classNameCurrent);
        $annotationReader = new AnnotationReader($reflectionClass);
        foreach ($reflectionClass->getProperties() as $property) {
            if ($property->name == 'id') {continue;}
            $methodInfo = $annotationReader->getPropertyAnnotations($property);
            switch (get_class($methodInfo[0])) {
                case 'Column':
                    $code .= $this->createAttributes($property->name, $methodInfo[0]->type);
                break;
                case 'OneToOne':
                    $code .= $this->createOneToOne($property->name, $methodInfo[0]->targetEntity);

                break;
                case 'OneToMany':
                    $code .= $this->createOneToMany($property->name, $methodInfo[0]->targetEntity);
                break;
                case 'ManyToMany':
                break;
                case 'ManyToOne':
                    $code .= $this->createOneToOne($property->name, $methodInfo[0]->targetEntity);

                break;
                default:
                    throw new \Exception('Unable to find the type of this attribute');
            }
        }
        $code .= '        constructor(repositoryService) {' . PHP_EOL;
        $code .= '          super("' . $entity . '", repositoryService);' . PHP_EOL;
        $code .= '        }' . PHP_EOL;
        $code .= '  }' . PHP_EOL;
        $code .= '}' . PHP_EOL;
        $this->file_force_contents($path, $code);
    }


    function main($argv) {
        $method = 'help';
        if (count($argv) > 1) {
            $method = $argv[1];
        }
        $argMethod = null;
        if (count($argv) > 2) {
            $argMethod = $argv[2];
        }
        $this->$method($argMethod);
    }

    function help() {
        echo 'Help : you can use "install", "update" or "updateEntity"' . PHP_EOL;
        echo 'For updateEntity, we have to provide the name of the entity : updateEntity User';
    }

    private function createWeb() {
        $cwd = getcwd();

        $packagePath = $cwd . '/vendor/emeric0101/phpangular/';
        @mkdir($cwd . '/web');
        @mkdir($cwd . '/web/js');
        @mkdir($cwd . '/web/core');
        @mkdir($cwd . '/web/lib');
        @mkdir($cwd . '/web/template');
        try {
            // This file must be created ONLY if not exist
            $this->copyIfNotExists($packagePath . 'PHPAngularConfig.php', $cwd . '/PHPAngularConfig.php');

            $this->recurse_copy($packagePath . 'web/core', $cwd . '/web/core');
            $this->recurse_copy($packagePath . 'web/lib', $cwd . '/web/lib');
            $this->recurse_copy($packagePath . 'web/template', $cwd . '/web/template');

            $this->copyIfNotExists($packagePath . 'web/config.ts', $cwd . '/web/config.ts');
            $this->copyIfNotExists($packagePath . 'web/bower.json', $cwd . '/web/bower.json');
            $this->copyIfNotExists($packagePath . 'web/.htaccess', $cwd . '/web/.htaccess');
            copy($packagePath . 'web/api.php', $cwd . '/web/api.php');
            copy($packagePath . 'web/.gitignore', $cwd . '/web/.gitignore');

        }
        catch (CliCopyError $e) {
            echo 'Unable to copy web directory : ' . $e->getMessage() . PHP_EOL;
            return false;
        }

        // copy the layout
        @mkdir($cwd . '/src');
        @mkdir($cwd . '/src/layout');
        copy($packagePath . 'src/layout/index.php', $cwd . '/src/layout/index.php');

    }
    private function copyIfNotExists($file, $dst) {
        if (!file_exists($dst)) {
            copy($file, $dst);
        }
        else {
            echo 'Skipping ' . $dst . ' : already exists' . PHP_EOL;
        }
    }

    private function getEntities() {
        $entitiesPath = 'src/Entity';
        $except = ['EntityAbstract.php'];
        $files = scandir($entitiesPath);
        $entities = [];
        foreach ($files as $file) {
            if ($file == '.' || $file == '..') {continue;}
            if (in_array($file, $except)) {continue;}
            $entities[] = substr($file, 0, -4);
        }
        return $entities;
    }

    private function createEntityFactory($bundle) {
        $code = 'module Emeric0101.PHPAngular.Service {
            export class EntityFactory {
                private bundle = '.$bundle.';
                getBundle() : any {
                    return this.bundle;
                }
                create(model : string) {
                    return new (this.getBundle()).Entity[model](0, model);
                }
                /** Create a model from a id object
                * @param id number Id of the object
                * @param model string : name of the model we want \'User\', ...
                * @param callback Function(result) called when object is ready to use (with data)
                */
                createFromId(id : number, model : string, callback? : (result : boolean) => void) {
                    if (typeof(this.getBundle().Entity[model]) !== \'function\') {
                        throw \'Model not found : \' + model;
                    }
                    return new (this.getBundle().Entity[model](id, callback));
                }
            }
            phpangularModule.service("EntityFactory", EntityFactory);
        }';
        $this->file_force_contents('web/js/service/EntityFactory.ts', $code);
    }


}
