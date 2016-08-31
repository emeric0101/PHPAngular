var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Entity;
        (function (Entity) {
            var Model = (function () {
                function Model(name, repositoryService) {
                    this.name = name;
                    this.repositoryService = repositoryService;
                    this.isFromDb = false;
                    this._foreignKeys = [];
                    this.changed = true;
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
                    if (typeof (success) === 'function' || typeof (error) === 'function') {
                        throw "NOT READY YET : foreignKey";
                    }
                    if (obj === null) {
                        obj = this;
                    }
                    if ((obj[field] instanceof Model)) {
                        return obj[field];
                    }
                    error = function () { };
                    success = function () { };
                    var $this = this;
                    var value = obj[field];
                    if (value === null) {
                        return null;
                    }
                    if ($this._foreignKeys.indexOf(field) !== -1) {
                        return;
                    }
                    $this._foreignKeys.push(field);
                    if (typeof (value['entity']) === 'undefined') {
                        throw 'Model : foreignKey not an entity !';
                    }
                    var callbackSuccess = function (objReceived) {
                        obj[field] = objReceived;
                        success(objReceived);
                    };
                    this.repositoryService.findById(value['entity'], value['id'], callbackSuccess, error);
                    return obj[field];
                };
                Model.prototype.setValues = function (values) {
                    if (this.isFromDb) {
                        console.error("Accessing setValues from a db model is forbidden !");
                        return;
                    }
                    for (var i in values) {
                        var value = values[i];
                        if (value !== null && typeof (value["class"]) === 'string') {
                            if (value["class"] === 'datetime') {
                                value = new Date(value['date']);
                            }
                            else {
                                throw "Unable to serialize : " + value['class'];
                            }
                        }
                        this[i] = value;
                    }
                    this.isFromDb = true;
                };
                return Model;
            }());
            Entity.Model = Model;
        })(Entity = PHPAngular.Entity || (PHPAngular.Entity = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
