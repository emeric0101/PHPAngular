var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
            var RepositoryService = (function () {
                function RepositoryService(AjaxService, UrlService, EntityFactory) {
                    this.AjaxService = AjaxService;
                    this.UrlService = UrlService;
                    this.EntityFactory = EntityFactory;
                    this.entities = [];
                    this.requestById = [];
                }
                RepositoryService.prototype.clearCache = function () {
                    this.entities = [];
                };
                RepositoryService.prototype.getFromCache = function (name, id) {
                    if (typeof (this.entities[name]) === 'undefined' || typeof (this.entities[name][id]) === "undefined") {
                        return null;
                    }
                    return this.entities[name][id];
                };
                RepositoryService.prototype.findById = function (name, id, callback, error) {
                    if (typeof (error) === 'undefined') {
                        error = function () {
                            console.error("findById : unable to get " + name + " id : " + id);
                        };
                    }
                    if (id === 0) {
                        error();
                        return;
                    }
                    var $this = this;
                    var fromCache = $this.getFromCache(name, id);
                    if (fromCache !== null) {
                        callback(fromCache);
                        return;
                    }
                    var callbackItem = {
                        callback: callback,
                        error: error
                    };
                    if (typeof (this.requestById[name + id]) === 'undefined' || $this.requestById[name + id].length == 0) {
                        $this.requestById[name + id] = [callbackItem];
                    }
                    else {
                        $this.requestById[name + id].push(callbackItem);
                        return;
                    }
                    this.AjaxService.get($this.UrlService.makeApi("Entity", name, id), {}, function (result) {
                        var data = result.data;
                        if (!data.success) {
                            error();
                            return;
                        }
                        var obj = $this.EntityFromJson(data[name], name);
                        for (var i in $this.requestById[name + id]) {
                            $this.requestById[name + id][i].callback(obj);
                        }
                        $this.requestById[name + id] = [];
                    }, function () {
                        for (var i in $this.requestById[name + id]) {
                            $this.requestById[name + id][i].error();
                        }
                        $this.requestById[name + id] = [];
                    });
                };
                RepositoryService.prototype.EntityFromJson = function (obj, name) {
                    if (typeof (this.EntityFactory.getBundle().Entity[name]) !== "function") {
                        throw 'EntityFromJson : unable to find entity : ' + name;
                    }
                    var entity = new (this.EntityFactory.getBundle()).Entity[name](this);
                    entity.setValues(obj);
                    if (typeof (this.entities[name]) === "undefined") {
                        this.entities[name] = [];
                    }
                    this.entities[name][entity.getId()] = entity;
                    return entity;
                };
                RepositoryService.prototype.EntitiesFromJson = function (objs, name) {
                    var objArray = [];
                    for (var i in objs) {
                        objArray.push(this.EntityFromJson(objs[i], name));
                    }
                    return objArray;
                };
                RepositoryService.prototype.findAll = function (name, callback, error) {
                    var $this = this;
                    if (typeof (error) !== 'function') {
                        error = function () { };
                    }
                    this.AjaxService.get(this.UrlService.makeApi('Entity', name), {}, function (result) {
                        var data = result.data;
                        if (data.success !== true || typeof (data[name + "s"]) === 'undefined') {
                            error();
                            return;
                        }
                        var objArray = $this.EntitiesFromJson(data[name + "s"], name);
                        callback(objArray);
                    }, function () {
                        error();
                    });
                };
                RepositoryService.$inject = ['AjaxService', 'UrlService', 'EntityFactory'];
                return RepositoryService;
            }());
            Service.RepositoryService = RepositoryService;
            phpangularModule.service("RepositoryService", RepositoryService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
