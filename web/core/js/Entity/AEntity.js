var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Entity;
        (function (Entity) {
            var ForeignKeyRequest = (function () {
                function ForeignKeyRequest(callback, field) {
                    this.field = field;
                    this.callbacks = [];
                    this.done = false;
                    this.callbacks.push(callback);
                }
                ForeignKeyRequest.prototype.getDone = function () { return this.done; };
                ForeignKeyRequest.prototype.setDone = function (s) {
                    this.done = s;
                };
                ForeignKeyRequest.prototype.addCallback = function (cb) {
                    this.callbacks.push(cb);
                };
                ForeignKeyRequest.prototype.getField = function () {
                    return this.field;
                };
                ForeignKeyRequest.prototype.getCallbacks = function () {
                    return this.callbacks;
                };
                return ForeignKeyRequest;
            }());
            var Model = (function () {
                function Model(name, repositoryService) {
                    this.name = name;
                    this.repositoryService = repositoryService;
                    this.isFromDb = false;
                    this.changed = false;
                    this.foreignKeyRequests = [];
                }
                Model.prototype.getChanged = function () {
                    return this.changed || !this.isFromDb;
                };
                Model.prototype.setValue = function (name, value) {
                    this.changed = true;
                    this[name] = value;
                };
                Model.prototype.getIsFromDb = function () {
                    return this.isFromDb;
                };
                Model.prototype.getId = function () {
                    return this.id;
                };
                Model.prototype.getName = function () {
                    return this.name;
                };
                Model.prototype.foreignKeys = function (field) {
                    var array = this[field];
                    if (array === null) {
                        return null;
                    }
                    if (array.length == 0) {
                        return [];
                    }
                    for (var i in this[field]) {
                        this.foreignKey(i, null, null, this[field]);
                    }
                    return this[field];
                };
                Model.prototype.foreignKey = function (field, success, error, obj) {
                    if (obj === void 0) { obj = null; }
                    if (typeof (error) === 'function') {
                        throw "NOT READY YET : foreignKey";
                    }
                    if (obj === null) {
                        obj = this;
                    }
                    error = function () { };
                    if (success == undefined) {
                        success = function () { };
                    }
                    var value = obj[field];
                    if (value === null) {
                        return null;
                    }
                    for (var _i = 0, _a = this.foreignKeyRequests; _i < _a.length; _i++) {
                        var request_1 = _a[_i];
                        if (request_1.getField() == field) {
                            if (request_1.getDone()) {
                                success(obj[field]);
                            }
                            else {
                                request_1.addCallback(success);
                            }
                            return obj[field];
                            ;
                        }
                    }
                    if ((obj[field] instanceof Model)) {
                        return obj[field];
                    }
                    var request = new ForeignKeyRequest(success, field);
                    this.foreignKeyRequests.push(request);
                    if (typeof (value['entity']) === 'undefined') {
                        throw 'Model : foreignKey not an entity !';
                    }
                    var callbackSuccess = function (objReceived) {
                        obj[field] = objReceived;
                        for (var _i = 0, _a = request.getCallbacks(); _i < _a.length; _i++) {
                            var success_1 = _a[_i];
                            success_1(objReceived);
                        }
                        request.setDone(true);
                    };
                    this.repositoryService.findById(value['entity'], value['id'], callbackSuccess, error);
                    return obj[field];
                };
                ;
                Model.prototype.setValues = function (values) {
                    for (var i in values) {
                        var value = values[i];
                        if (value !== null && typeof (value["class"]) === 'string') {
                            if (value["class"] === 'datetime') {
                                var s = value['date'].split(/\D/);
                                value = new Date(Date.UTC(s[0], --s[1] || '', s[2] || '', s[3] || '', s[4] || '', s[5] || '', s[6] || ''));
                            }
                            else {
                                throw "Unable to serialize : " + value['class'];
                            }
                        }
                        this[i] = value;
                    }
                    this.isFromDb = true;
                };
                Model.prototype.update = function () {
                    var _this = this;
                    this.repositoryService.findById(this.name, this.id, function (obj) {
                        _this.setValues(obj);
                    });
                };
                Model.prototype.setRepositoryService = function (repositoryService) {
                    this.repositoryService = repositoryService;
                };
                return Model;
            }());
            Entity.Model = Model;
        })(Entity = PHPAngular.Entity || (PHPAngular.Entity = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
