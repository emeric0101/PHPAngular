<?php
use Symfony\Component\Console\Helper\HelperSet;
use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Emeric0101\PHPAngular\Controller\Comparator;
use Doctrine\Common\Annotations\AnnotationReader;

$autoloadFiles = array(__DIR__ . '/../../vendor/autoload.php',
                       __DIR__ . '/../../../autoload.php');

foreach ($autoloadFiles as $autoloadFile) {
    if (file_exists($autoloadFile)) {
        require_once $autoloadFile;
    }
}

$directories = array(getcwd(), getcwd() . DIRECTORY_SEPARATOR . 'config');

$configFile = null;
foreach ($directories as $directory) {
    $configFile = $directory . DIRECTORY_SEPARATOR . 'cli-config.php';

    if (file_exists($configFile)) {
        break;
    }
}

if ( ! file_exists($configFile)) {
    ConsoleRunner::printCliConfigTemplate();
    exit(1);
}

if ( ! is_readable($configFile)) {
    echo 'Configuration file [' . $configFile . '] does not have read permission.' . "\n";
    exit(1);
}

$commands = array();

$helperSet = require $configFile;

if ( ! ($helperSet instanceof HelperSet)) {
    foreach ($GLOBALS as $helperSetCandidate) {
        if ($helperSetCandidate instanceof HelperSet) {
            $helperSet = $helperSetCandidate;
            break;
        }
    }
}


/** @Annotation
*/
class Column {
	public $name;
	public $type;
	public $length;
    public $nullable;
    public $unique;
}
/**
 * @Annotation
 * @Target("PROPERTY")
 */
final class OneToMany
{
    public $mappedBy;
    public $targetEntity;
    public $cascade;
    public $fetch = 'LAZY';
    public $orphanRemoval = false;
    public $indexBy;
}


/**
 * @Annotation
 * @Target("PROPERTY")
 */
final class OneToOne
{
    /**
     * @var string
     */
    public $targetEntity;

    /**
     * @var string
     */
    public $mappedBy;

    /**
     * @var string
     */
    public $inversedBy;

    /**
     * @var array<string>
     */
    public $cascade;

    /**
     * The fetching strategy to use for the association.
     *
     * @var string
     *
     * @Enum({"LAZY", "EAGER", "EXTRA_LAZY"})
     */
    public $fetch = 'LAZY';

    /**
     * @var boolean
     */
    public $orphanRemoval = false;
}



/**
 * @Annotation
 * @Target("PROPERTY")
 */
final class ManyToOne
{
    /**
     * @var string
     */
    public $targetEntity;

    /**
     * @var array<string>
     */
    public $cascade;

    /**
     * The fetching strategy to use for the association.
     *
     * @var string
     *
     * @Enum({"LAZY", "EAGER", "EXTRA_LAZY"})
     */
    public $fetch = 'LAZY';

    /**
     * @var string
     */
    public $inversedBy;
}


/**
 * @Annotation
 * @Target("PROPERTY")
 */
final class ManyToMany
{
    /**
     * @var string
     */
    public $targetEntity;

    /**
     * @var string
     */
    public $mappedBy;

    /**
     * @var string
     */
    public $inversedBy;

    /**
     * @var array<string>
     */
    public $cascade;

    /**
     * The fetching strategy to use for the association.
     *
     * @var string
     *
     * @Enum({"LAZY", "EAGER", "EXTRA_LAZY"})
     */
    public $fetch = 'LAZY';

    /**
     * @var boolean
     */
    public $orphanRemoval = false;

    /**
     * @var string
     */
    public $indexBy;
}


    /** This script generate all typescript entities for Phangular.io
    *   Emeric BAVEUX 2016
    */
    class UpdateJS {
        private $entities = [];

        private function recurse_copy($src,$dst) {
            $dir = opendir($src);
            @mkdir($dst);
            while(false !== ( $file = readdir($dir)) ) {
                if (( $file != '.' ) && ( $file != '..' )) {
                    if ( is_dir($src . '/' . $file) ) {
                        $this->recurse_copy($src . '/' . $file,$dst . '/' . $file);
                    }
                    else {
                        copy($src . '/' . $file,$dst . '/' . $file);
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
            $code .= '          this.' . $name . ' = v;' . PHP_EOL;
            $code .= '      }' . PHP_EOL;
			return $code;
		}
		private function createOneToOne($name, $targetEntity) {
			$targetJs = implode('.', explode('\\', $targetEntity));
			$code = '  		private ' . $name . ' :' . $targetJs . ' = null;'. PHP_EOL;
			$code .= '		get' . ucFirst($name) . '() : ' . $targetJs . ' {' . PHP_EOL;
			$code .= '			return this.foreignKey(\'' . $name . '\');' . PHP_EOL;
			$code .= '		}' . PHP_EOL;
            $code .= '      set' . ucFirst($name) . '(v : ' . $targetJs . ') {' . PHP_EOL;
            $code .= '          this.' . $name . ' = v;' . PHP_EOL;
            $code .= '      }' . PHP_EOL;
			return $code;
		}
		private function createOneToMany($name, $targetEntity) {
            $targetJs = implode('.', explode('\\', $targetEntity));
			$code = '  		private ' . $name . ' :' . $targetJs . ' = null;'. PHP_EOL;
			$code .= '		get' . ucFirst($name) . '() : ' . $targetJs . ' {' . PHP_EOL;
			$code .= '			return this.foreignKeys(\'' . $name . '\');' . PHP_EOL;
			$code .= '		}' . PHP_EOL;
            $code .= '      set' . ucFirst($name) . '(v : ' . $targetJs . '[]) {' . PHP_EOL;
            $code .= '          this.' . $name . ' = v;' . PHP_EOL;
            $code .= '      }' . PHP_EOL;
			return $code;
		}


        function main() {
			echo 'Phangular.io - Generate entities' . PHP_EOL;
            $targetJs = implode('.', explode('\\', PHPANGULAR_BUNDLE));

            $cwd = getcwd();
            $this->createWeb();
            $this->createEntityFactory($targetJs);
			$className = PHPANGULAR_BUNDLE . '\\Entity\\';


			echo PHP_EOL;
            $this->entities = $this->getEntities();
            foreach ($this->entities as $entity) {
				if ($entity == '') {continue;}
				$classNameCurrent = $className . $entity;
				echo 'Class ' . $classNameCurrent . PHP_EOL;
                $class = new $classNameCurrent();
                $code = 'module ' . $targetJs . '.Entity {' . PHP_EOL;
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
                $this->file_force_contents($cwd . '/web/js/Entity/' . $entity . '.ts', $code);
            }
            echo 'Okay, everything is ready but.... you have to do a last little thing' . PHP_EOL;
            echo 'You have to run some commands : ' . PHP_EOL;
            echo 'cd web' . PHP_EOL;
            echo 'bower install' . PHP_EOL;
            echo 'Then, you have to compile everything with Typescript compiler (command "tsc")' . PHP_EOL;
        }

        private function createWeb() {
			$cwd = getcwd();
			// check if web dir exists
			if (file_exists($cwd . '/web')) {
				if (!resetWebDir) {
					return false;
				}
			}
            $packagePath = $cwd . '/vendor/emeric0101/phpangular/';
            @mkdir($cwd . '/web');
            $this->recurse_copy($packagePath . 'web', $cwd . '/web');
            // copy the layout
            @mkdir($cwd . '/src');
            @mkdir($cwd . '/src/layout');
            copy($packagePath . 'src/layout/index.php', $cwd . '/src/layout/index.php');

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
    $mainClass = new UpdateJS();
    $mainClass->main();
