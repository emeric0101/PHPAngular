<!doctype html>
<html>
    <script src="cache/script-<?php echo VERSION; ?>.js"></script>

    <?php foreach (\Emeric0101\PHPAngular\Config::$cssModule as $module): ?>
        <link rel="stylesheet" href="<?php echo $module; ?>" type="text/css" />
    <?php endforeach; ?>

    <link rel="stylesheet" href="cache/cache-<?php echo VERSION; ?>.css" type="text/css" />

    <?php foreach (\Emeric0101\PHPAngular\Config::$metaTags as $name => $content): ?>
        <meta name="<?php echo $name; ?>" content="<?php echo $content; ?>" />
    <?php endforeach; ?>

    <title><?php echo \Emeric0101\PHPAngular\Config::APP_TITLE; ?></title>
    <base href="<?php echo $baseUrl; ?>">
</head>
<body ng-app="phpangularModule">
    <div ng-view id="mainWrapper" class="container">
    </div>
</body>
</html>
