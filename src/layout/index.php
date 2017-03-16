<!doctype html>
<html>
    <?php if (\Emeric0101\PHPAngular\Config::$phpSassCompiler): ?>
        <script src="cache/script-<?php echo VERSION; ?>.js"></script>
    <?php else: ?>
                <!-- Polyfill(s) for older browsers -->
        <script src="node_modules/core-js/client/shim.min.js"></script>
        <script src="node_modules/zone.js/dist/zone.js"></script>
        <script src="node_modules/reflect-metadata/Reflect.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
    <?php endif; ?>

    <?php foreach (\Emeric0101\PHPAngular\Config::$cssModule as $module): ?>
        <link rel="stylesheet" href="<?php echo $module; ?>" type="text/css" />
    <?php endforeach; ?>

    <link rel="stylesheet" href="cache/cache-<?php echo VERSION; ?>.css" type="text/css" />

    <?php foreach (\Emeric0101\PHPAngular\Config::$metaTags as $name => $content): ?>
        <meta name="<?php echo $name; ?>" content="<?php echo $content; ?>" />
    <?php endforeach; ?>

    <title><?php echo \Emeric0101\PHPAngular\Config::APP_TITLE; ?></title>
    <base href="<?php echo $baseUrl; ?>">

    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
  </script>
</head>
<body ng-app="phpangularModule">
<?php if (\Emeric0101\PHPAngular\Config::$angular == 1): ?>
    <div ng-view id="mainWrapper" class="container">
    </div>
<?php else: ?>
    <phpangular-app id="mainWrapper" class="container"></phpangular-app>
<?php endif; ?>
</body>
</html>
