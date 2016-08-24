# PHPAngular

## The simpliest way to angularise the world !


### Installation
Define all namespace we will use for Entity in composer.json (you can use the namespace you want but it must be like XX\XX\Entity)
`
    "psr-4": {
        "Emeric0101\\PHPAngular\\Entity\\": "src/Entity/"
    }
`
Use composer with `composer require phpangular`

When everything is ok where composer, you have to go into **vendor/emeric0101/phpangular/bin/phpangular.php**, edit the file and set the correct name of entity.

Now you have to create the Entity with doctrine [Create Entities](http://symfony.com/doc/current/doctrine.html#creating-an-entity-class) ** You must use Annotation**
Every entity have to derived from **Emeric0101\PHPAngular\Entity\EntityAbstract**
You can use all association with doctrine you want !
You need to setup the mysql login settings in **bootstrap.php**
Then you can use doctrine to create the mysql database with `doctrine orm:schema-tool:create`
Now we have to setup PHPAngular correctly. In bootstrap.php, set your *targetEntity*, this is the name of your bundle, every Entities must be in this namespace but with "Entity" after
For example, the vendor name is Emeric, the bundle name is test, the entity is Post, you should have Emeric\test\Entity\Post

Run the script
`phpangular`
`
cd web
bower install
cd ..
`
Then `tsc` (you will get some error but don't worry, the system works and i'm working to fix this)