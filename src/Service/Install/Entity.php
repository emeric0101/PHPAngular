<?php
namespace Emeric0101\PHPAngular\Service\Install;
use Doctrine\Common\Annotations\AnnotationReader;
use Emeric0101\PHPAngular\Service\Utils;

class CliCopyError extends \Exception {}
class Entity {
	private $entities = [];
	private $targetJs = "";
	public function __construct() {
		$this->targetJs = implode('.', explode('\\', substr(\Emeric0101\PHPAngular\Config::PHPANGULAR_BUNDLE, 1)));
	}


    public function createEntityFactory($entities) {
        $code = '
			import { Model } from "../Entity/AEntity";
			import { RepositoryService } from "./repository.service";
			';
			foreach ($entities as $entity) {
				$code .= 'import { ' . $entity . ' } from "../Entity/' . $entity . '"'. PHP_EOL;
			}
			$code .= '
            export class EntityFactory {
				public constructor(private $repo : RepositoryService) {}

				public create(entity : string) : Model
				{
					var created;
					switch (entity)
					{';
		foreach ($entities as $entity) {
			$code .= '		case "'. $entity .'" :
							created = new ' . $entity . '(this.$repo);
			';
		}
		$code .= '
					}
					return created;
				}
        	}';
        Utils::file_force_contents('app/Service/entityfactory.service.ts', $code);
    }

	public function getEntities() {
        $entitiesPath = 'src/Entity';
        $except = ['EntityAbstract.php'];
        $files = scandir($entitiesPath);
        $entities = ['Session'];
        foreach ($files as $file) {
            if ($file == '.' || $file == '..') {continue;}
            if (in_array($file, $except)) {continue;}
            $entities[] = substr($file, 0, -4);
        }
        return $entities;
    }
	/**
	* Return Entity from test\\tata\\Entity
	*/
	private function getNameFromFullName($full) {
		$array = explode("\\", $full);
		return $array[count($array)-1];
	}

    public function updateEntity($entity, $force = true) {
        $cwd = getcwd();
        $className = \Emeric0101\PHPAngular\Config::PHPANGULAR_BUNDLE . '\\Entity\\';
        if ($entity == '') {return false;}
        // path of the class
        $path = $cwd . '/app/Entity/' . $entity . '.ts';
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

		// Get all attributes
		$attributeCodes = '';
		$importEntities = [];
        $reflectionClass = new \ReflectionClass($classNameCurrent);
        $annotationReader = new AnnotationReader($reflectionClass);
        foreach ($reflectionClass->getProperties() as $property) {
            if ($property->name == 'id') {continue;}
            $methodInfo = $annotationReader->getPropertyAnnotations($property);
            switch (get_class($methodInfo[0])) {
                case 'Column':
                    $attributeCodes .= $this->createAttributes($property->name, $methodInfo[0]->type);
                break;
                case 'OneToOne':
					$targetEntity = $this->getNameFromFullName($methodInfo[0]->targetEntity);
                    $attributeCodes .= $this->createOneToOne($property->name, $targetEntity);
					$importEntities[] = $this->getNameFromFullName($targetEntity);
                break;
                case 'OneToMany':
					$targetEntity = $this->getNameFromFullName($methodInfo[0]->targetEntity);
                    $attributeCodes .= $this->createOneToMany($property->name, $targetEntity);
					$importEntities[] = $this->getNameFromFullName($targetEntity);
                break;
                case 'ManyToMany':
                break;
                case 'ManyToOne':
					$targetEntity = $this->getNameFromFullName($methodInfo[0]->targetEntity);
                    $attributeCodes .= $this->createOneToOne($property->name, $targetEntity);
					$importEntities[] = $this->getNameFromFullName($targetEntity);
                break;
                default:
                    throw new \Exception('Unable to find the type of this attribute');
            }
        }



        $code = 'import { Model } from "./AEntity";' . PHP_EOL;
		foreach ($importEntities as $import) {
			$code .= 'import {' . $import . ' } from "./' . $import . '";' . PHP_EOL;
		}
        $code .= 'export class '. $entity . ' extends Model {' . PHP_EOL;
		$code .= '	protected name = "' . $entity . '";' . PHP_EOL;
		$code .= $attributeCodes . PHP_EOL;
        $code .= '}' . PHP_EOL;
        Utils::file_force_contents($path, $code);
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
        $code = '  		private ' . $name . ' :' . $targetEntity . ' = null;'. PHP_EOL;
        $code .= '		get' . ucFirst($name) . '() : ' . $targetEntity . ' {' . PHP_EOL;
        $code .= '			return this.foreignKey(\'' . $name . '\');' . PHP_EOL;
        $code .= '		}' . PHP_EOL;
        $code .= '      set' . ucFirst($name) . '(v : ' . $targetEntity . ') {' . PHP_EOL;
        $code .= '          this.setValue(\'' . $name . '\', v);' . PHP_EOL;
        $code .= '      }' . PHP_EOL;
        return $code;
    }
    private function createOneToMany($name, $targetEntity) {
        $code = '  		private ' . $name . ' :' . $targetEntity . ' = null;'. PHP_EOL;
        $code .= '		get' . ucFirst($name) . '() : ' . $targetEntity . ' {' . PHP_EOL;
        $code .= '			return this.foreignKeys(\'' . $name . '\');' . PHP_EOL;
        $code .= '		}' . PHP_EOL;
        $code .= '      set' . ucFirst($name) . '(v : ' . $targetEntity . '[]) {' . PHP_EOL;
        $code .= '          this.setValue(\'' . $name . '\', v);' . PHP_EOL;
        $code .= '      }' . PHP_EOL;
        return $code;
    }
}
