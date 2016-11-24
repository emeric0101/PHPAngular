var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Entity;
        (function (Entity) {
            var EntityTest = (function (_super) {
                __extends(EntityTest, _super);
                function EntityTest(repositoryService) {
                    var _this = _super.call(this, "EntityTest", repositoryService) || this;
                    _this.title = "";
                    return _this;
                }
                EntityTest.prototype.getTitle = function () {
                    return this.title;
                };
                EntityTest.prototype.setTitle = function (t) {
                    this.title = t;
                };
                return EntityTest;
            }(Emeric0101.PHPAngular.Entity.Model));
            Entity.EntityTest = EntityTest;
        })(Entity = PHPAngular.Entity || (PHPAngular.Entity = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
