var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
                return EntityFactory;
            }());
            Service.EntityFactory = EntityFactory;
            phpangularModule.service("EntityFactory", EntityFactory);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Entity;
        (function (Entity) {
            var User = (function (_super) {
                __extends(User, _super);
                function User(repositoryService) {
                    return _super.call(this, "User", repositoryService) || this;
                }
                User.prototype.getMail = function () {
                    return this.mail;
                };
                User.prototype.setMail = function (m) {
                    this.mail = m;
                };
                return User;
            }(Emeric0101.PHPAngular.Entity.Model));
            Entity.User = User;
        })(Entity = PHPAngular.Entity || (PHPAngular.Entity = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
