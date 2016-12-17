"use strict";
var Request = (function () {
    function Request(controller, method, id, params, entity, callback, error) {
        if (error === void 0) { error = function () { }; }
        this.controller = controller;
        this.method = method;
        this.id = id;
        this.params = params;
        this.entity = entity;
        this.callback = callback;
        this.error = error;
        this.requestid = Request.globalrequestid++;
    }
    Request.prototype.getRequestId = function () { return this.requestid; };
    Request.prototype.getId = function () { return this.id; };
    Request.prototype.getController = function () { return this.controller; };
    Request.prototype.getMethod = function () { return this.method; };
    Request.prototype.getParams = function () { return this.params; };
    Request.prototype.getEntity = function () { return this.entity; };
    Request.prototype.getCallback = function () { return this.callback; };
    Request.prototype.getError = function () { return this.error; };
    return Request;
}());
Request.globalrequestid = 1;
var RepositoryService = (function () {
    function RepositoryService(AjaxService, UrlService, EntityFactory, $interval) {
        this.AjaxService = AjaxService;
        this.UrlService = UrlService;
        this.EntityFactory = EntityFactory;
        this.$interval = $interval;
        this.entities = [];
        this.requestById = [];
        this.requests = [];
        this.requestTimer = null;
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
    RepositoryService.prototype.addGetRequest = function (request) {
        var _this = this;
        this.requests.push(request);
        if (this.requestTimer == null) {
            this.requestTimer = this.$interval(function () {
                _this.runRequests(_this.requests.slice(0));
                _this.requestTimer = null;
            }, 10, 1);
        }
    };
    RepositoryService.prototype.prepareRequests = function (requests) {
        var params = [];
        for (var i in this.requests) {
            var request = this.requests[i];
            params.push({
                id: request.getId(),
                method: request.getMethod(),
                controller: request.getController(),
                params: request.getParams(),
                requestid: request.getRequestId()
            });
        }
        return params;
    };
    RepositoryService.prototype.getRequestFromRequestId = function (requestid, requests) {
        for (var i in requests) {
            if (requests[i].getRequestId() == requestid) {
                return requests[i];
            }
        }
        return null;
    };
    RepositoryService.prototype.runRequests = function (requests) {
        var _this = this;
        var params = this.prepareRequests(requests);
        this.AjaxService.post(this.UrlService.makeApi('Multiple', 'index'), params, function (d) {
            if (typeof (d.data.Multiple) === 'undefined') {
                for (var i in requests) {
                    _this.requests[i].getError()();
                }
                return false;
            }
            var data = d.data.Multiple;
            for (var i in data) {
                var request = _this.getRequestFromRequestId(data[i].requestid, requests);
                request.getCallback()(data[i]);
            }
        });
        this.requests = [];
    };
    RepositoryService.prototype.findById = function (name, id, callback, error) {
        var _this = this;
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
        var request = new Request('Entity', name, id, {}, name, function (data) {
            if (!data['success']) {
                error();
                return;
            }
            var obj = _this.EntityFromJson(data[name], name);
            callback(obj);
        }, error);
        this.addGetRequest(request);
    };
    RepositoryService.prototype.EntityFromJson = function (obj, name) {
        var entity = this.createEntity(name);
        entity.setValues(obj);
        if (typeof (this.entities[name]) === "undefined") {
            this.entities[name] = [];
        }
        this.entities[name][entity.getId()] = entity;
        return entity;
    };
    RepositoryService.prototype.createEntity = function (name) {
        if (typeof (this.EntityFactory.getBundle().Entity[name]) !== "function") {
            throw 'EntityFromJson : unable to find entity : ' + name;
        }
        return new (this.EntityFactory.getBundle()).Entity[name](this);
    };
    RepositoryService.prototype.EntitiesFromJson = function (objs, name) {
        var objArray = [];
        for (var i in objs) {
            objArray.push(this.EntityFromJson(objs[i], name));
        }
        return objArray;
    };
    RepositoryService.prototype.findAll = function (name, callback, error) {
        var _this = this;
        var $this = this;
        if (typeof (error) !== 'function') {
            error = function () { };
        }
        var request = new Request('Entity', name, 0, {}, name, function (data) {
            if (!data['success']) {
                error();
                return;
            }
            var objs = _this.EntitiesFromJson(data[name + 's'], name);
            callback(objs);
        }, error);
        this.addGetRequest(request);
    };
    RepositoryService.prototype.findSome = function (method, name, id, params, callback, error) {
        var _this = this;
        var $this = this;
        if (typeof (error) !== 'function') {
            error = function () { };
        }
        var request = new Request(name, method, id, params, name, function (data) {
            if (!data['success']) {
                error();
                return;
            }
            var objs = _this.EntitiesFromJson(data[name + 's'], name);
            callback(objs);
        }, error);
        this.addGetRequest(request);
    };
    return RepositoryService;
}());
exports.RepositoryService = RepositoryService;
RepositoryService.$inject = ['AjaxService', 'UrlService', 'EntityFactory', '$interval'];
