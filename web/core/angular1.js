"use strict";
require("angular");
var UrlService_1 = require("./service/UrlService");
angular.module('phpangularModule').service('UrlService', UrlService_1.UrlService);
angular.module('phpangularModule').service('AjaxService', UrlService_1.UrlService);
var EntityManager_1 = require("./service/EntityManager");
angular.module('phpangularModule').service('EntityManager', EntityManager_1.EntityManager);
var Flashmessage_1 = require("./service/Flashmessage");
angular.module('phpangularModule').service('FlashmessageService', Flashmessage_1.FlashmessageService);
var LoginService_1 = require("./service/LoginService");
angular.module('phpangularModule').service('LoginServiceLoginService', LoginService_1.LoginService);
var RepositoryService_1 = require("./service/RepositoryService");
angular.module('phpangularModule').service('RepositoryService', RepositoryService_1.RepositoryService);
var StorageService_1 = require("./service/StorageService");
angular.module('phpangularModule').service('StorageService', StorageService_1.StorageService);
