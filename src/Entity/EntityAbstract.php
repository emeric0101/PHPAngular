<?php
namespace Emeric0101\PHPAngular\Entity;

abstract class EntityAbstract implements \JsonSerializable{
    private $test;

    private function foreignKey(self $element) {
        // Cas d'un entity
        $reflexionClass = new \ReflectionClass($element);
        return [
            'id' => $element->getId(),
            'entity' => $reflexionClass->getShortName ()
        ];
    }
    private function persistentCollection(\Doctrine\ORM\PersistentCollection $element) {
        $array = [];
        foreach ($element as $elt) {
            $array[] = $this->foreignKey($elt);
        }
        return $array;
    }

    public function jsonSerialize () {
        $reflectionClass = new \ReflectionClass($this);
        $attributes = $reflectionClass->getMethods();
        $array = [];
        foreach ($attributes as $champ => $attribute) {
            $doc = $attribute->getDocComment();
            preg_match_all('#@API:private\n#s', $doc, $annotations);
            if (count($annotations) == 2 && !empty($annotations[1])) {
                continue;
            }
            if (substr($attribute->name, 0, 3) === "get") {
                $name = lcFirst(substr($attribute->name, 3));
                $element = $this->{$attribute->name}();

                // Need to fix the db !!!
                if (is_string($element)) {
                    $element = \ForceUTF8\Encoding::toUTF8($element);
                }

                if (is_object($element) && $element instanceof self) {
                    $array[$name] = $this->foreignKey($element);
                }
                else if (is_object($element) && $element instanceof \Datetime) {
                    // Cas d'un entity
                    $array[$name] = [
                        'date' => $element->format(\DateTime::ISO8601),
                        'class' => 'datetime'
                    ];
                }
                elseif (!empty($element) && is_array($element) && $element[0] instanceof self) {
                    $array[$name] = [];
                    foreach ($element as $e) {
                        $array[$name][] = $this->foreignKey($e);
                    }
                }
                else if(is_object($element) && $element instanceOf \Doctrine\ORM\PersistentCollection) {
                    $array[$name] = $this->persistentCollection($element);
                }
                else {
                    // Cas général
                    $array[$name] = $element;
                }
            }

        }
        return $array;
    }

}
