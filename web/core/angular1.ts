import 'angular';

import { UrlService } from './service/UrlService';
angular.module('phpangularModule').service('UrlService', UrlService);

import { AjaxService } from './service/AjaxService';
angular.module('phpangularModule').service('AjaxService', UrlService);

import { EntityManager } from './service/EntityManager';
angular.module('phpangularModule').service('EntityManager', EntityManager);

import { FlashmessageService } from './service/Flashmessage';
angular.module('phpangularModule').service('FlashmessageService', FlashmessageService);

import { LoginService } from './service/LoginService';
angular.module('phpangularModule').service('LoginServiceLoginService', LoginService);

import { RepositoryService } from './service/RepositoryService';
angular.module('phpangularModule').service('RepositoryService', RepositoryService);

import { StorageService } from './service/StorageService';
angular.module('phpangularModule').service('StorageService', StorageService);
