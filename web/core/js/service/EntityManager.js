var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
            var EntityManager = (function () {
                function EntityManager($ajax, $url, $repo, $injector) {
                    this.$ajax = $ajax;
                    this.$url = $url;
                    this.$repo = $repo;
                    this.$injector = $injector;
                    this.persistObjs = [];
                }
                EntityManager.prototype.getRespository = function (name) {
                    if (name == '') {
                        console.error("getRepository from EntityManager : bad name : ", name);
                        return null;
                    }
                    if (Emeric0101.PHPAngular.Repository[name + "Repository"] === 'function') {
                        return this.$injector.get(name + "Repository");
                    }
                    return this.$repo;
                };
                EntityManager.prototype.getPersistObjs = function () {
                    if (!PhpangularModule.debug) {
                        return [];
                    }
                    return this.persistObjs;
                };
                EntityManager.prototype.persist = function (obj, exclude) {
                    if (exclude === void 0) { exclude = []; }
                    var $this = this;
                    for (var i in this.persistObjs) {
                        if (this.persistObjs[i] == obj) {
                            return;
                        }
                    }
                    exclude.push(obj);
                    var checkForEntity = function (v) {
                        for (var i in exclude) {
                            if (exclude[i] == v) {
                                return false;
                            }
                        }
                        if (v instanceof Emeric0101.PHPAngular.Entity.Model) {
                            $this.persist(v, exclude);
                            return true;
                        }
                        return false;
                    };
                    for (var j in obj) {
                        if (checkForEntity(obj[j])) {
                            continue;
                        }
                    }
                    this.persistObjs.push(obj);
                };
                EntityManager.prototype.clear = function () {
                    this.persistObjs = [];
                };
                EntityManager.prototype.save = function (obj, callback) {
                    var $this = this;
                    var objs = {};
                    var dataToSend = {};
                    if (!obj.getChanged()) {
                        callback(true, []);
                        return;
                    }
                    for (var i in obj) {
                        var value = obj[i];
                        if (value === null || typeof (value) === 'undefined') {
                            continue;
                        }
                        if ((typeof (value) === 'array' || typeof (value) === 'object') && value.length > 0 && typeof (value[0].getId) === 'function') {
                            for (var objIndex in value) {
                                value[objIndex] = value[objIndex].getId();
                            }
                        }
                        if (typeof (value) === 'function') {
                            continue;
                        }
                        if (value instanceof Emeric0101.PHPAngular.Service.RepositoryService) {
                            continue;
                        }
                        if (typeof (value.getId) === 'function') {
                            value = value.getId();
                        }
                        if (typeof (value) === 'object' && typeof (value.entity) === 'string') {
                            value = value.id;
                        }
                        objs[i] = value;
                    }
                    dataToSend[obj.getName()] = objs;
                    this.$ajax.post(this.$url.makeApi(obj.getName(), 'post', obj.getId()), dataToSend, function (r) {
                        var data = r.data;
                        var errorMsg = 'OK';
                        if (data['errMsg'] !== undefined) {
                            errorMsg = data['errMsg'];
                        }
                        if (data.success !== true) {
                            callback(false, errorMsg);
                            return;
                        }
                        if (typeof (data[obj.getName()]) !== 'undefined') {
                            var nobj = $this.$repo.EntityFromJson(data[obj.getName()], obj.getName());
                            for (var i in nobj) {
                                obj[i] = nobj[i];
                            }
                        }
                        callback(true, []);
                    }, function () {
                        callback(false, 'UNABLE_TO_CONNECT');
                    });
                };
                EntityManager.prototype.flush = function (callback, autoclear) {
                    var _this = this;
                    if (autoclear === void 0) { autoclear = true; }
                    var $this = this;
                    $this.$repo.clearCache();
                    if (typeof (callback) === "undefined") {
                        callback = function (r) { };
                    }
                    if (this.persistObjs.length === 0) {
                        return;
                    }
                    var persistObjs = this.persistObjs;
                    if (autoclear) {
                        $this.clear();
                    }
                    var i = 0;
                    var magicFunction = function (response, errorMsg) {
                        if (!response) {
                            callback(false, errorMsg);
                            return;
                        }
                        i++;
                        if (i >= persistObjs.length) {
                            callback(true, errorMsg);
                            return;
                        }
                        _this.save(persistObjs[i], magicFunction);
                    };
                    $this.save(persistObjs[0], magicFunction);
                };
                EntityManager.$inject = ['AjaxService', 'UrlService', 'RepositoryService', '$injector'];
                return EntityManager;
            }());
            Service.EntityManager = EntityManager;
            phpangularModule.service("EntityManager", EntityManager);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
