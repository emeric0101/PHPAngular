var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
            var EntityFactory = (function () {
                function EntityFactory() {
                    this.bundle = Emeric0101.PHPAngular;
                }
                EntityFactory.prototype.getBundle = function () {
                    return this.bundle;
                };
                EntityFactory.prototype.create = function (model) {
                    return new (this.getBundle()).Entity[model](0, model);
                };
                EntityFactory.prototype.createFromId = function (id, model, callback) {
                    if (typeof (this.getBundle().Entity[model]) !== 'function') {
                        throw 'Model not found : ' + model;
                    }
                    return new (this.getBundle().Entity[model](id, callback));
                };
                return EntityFactory;
            }());
            Service.EntityFactory = EntityFactory;
            phpangularModule.service("EntityFactory", EntityFactory);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
