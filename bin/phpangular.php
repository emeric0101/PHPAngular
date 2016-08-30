<?php
use Symfony\Component\Console\Helper\HelperSet;
use Doctrine\ORM\Tools\Console\ConsoleRunner;
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


    $mainClass = new Emeric0101\PHPAngular\Service\Cli();
    $mainClass->main($argv);
