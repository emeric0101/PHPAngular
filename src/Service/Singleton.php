<?php
namespace Emeric0101\PHPAngular\Service;

class Singleton
{
    /**
     * @var Singleton The reference to *Singleton* instance of this class
     */
    public static $instance = [];

    /**
     * Returns the *Singleton* instance of this class.
     *
     * @return Singleton The *Singleton* instance.
     */
    public static function getInstance()
    {
        // Il y a visiblement un soucis sur php7, lorsqu'on accede à
        // static::$instance, la variable est globale alors qu'elle devrait dépendre du context d'où elle est appelée
        $name = get_called_class();
        if (!array_key_exists($name, self::$instance)) {
            self::$instance[$name] = new static();
        }
        return self::$instance[$name];
    }

    /**
     * Protected constructor to prevent creating a new instance of the
     * *Singleton* via the `new` operator from outside of this class.
     */
    protected function __construct()
    {
    }

    /**
     * Private clone method to prevent cloning of the instance of the
     * *Singleton* instance.
     *
     * @return void
     */
    private function __clone()
    {
    }

    /**
     * Private unserialize method to prevent unserializing of the *Singleton*
     * instance.
     *
     * @return void
     */
    private function __wakeup()
    {
    }
}
