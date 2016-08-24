<!doctype html>
<html>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <?php if (PHPANGULAR_DEBUG): ?>
        <script src="bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
        <script src="bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
        <script src="bower_components/angular-mocks/angular-mocks.js"></script>
    <?php endif; ?>

    <script src="cache/script-<?php echo VERSION; ?>.js"></script>
    <link rel="stylesheet" href="cache/cache-<?php echo VERSION; ?>.css" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PHPAngular !</title>
    <base href="<?php echo $baseUrl; ?>">
</head>
<body ng-app="phpangularModule">
    <div ng-view id="mainWrapper" class="container">
    </div>
</body>
</html>
