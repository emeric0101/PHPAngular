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
            var IRight = (function () {
                function IRight() {
                }
                IRight.prototype.getFlag = function () { return this.flag; };
                return IRight;
            }());
            var RightGroup = (function (_super) {
                __extends(RightGroup, _super);
                function RightGroup() {
                    var _this = _super.apply(this, arguments) || this;
                    _this.rights = [];
                    return _this;
                }
                RightGroup.prototype.addRight = function (right) {
                    this.rights.push(right);
                };
                RightGroup.prototype.getRight = function (rightName) {
                    for (var _i = 0, _a = this.rights; _i < _a.length; _i++) {
                        var right = _a[_i];
                        if (right.getRight(rightName)) {
                            return true;
                        }
                    }
                    return false;
                };
                return RightGroup;
            }(IRight));
            var Right = (function (_super) {
                __extends(Right, _super);
                function Right(flag) {
                    var _this = _super.call(this) || this;
                    _this.flag = flag;
                    return _this;
                }
                Right.prototype.getRight = function (rightName) {
                    return rightName == this.flag;
                };
                return Right;
            }(IRight));
            var AuthService = (function () {
                function AuthService($ajax, $url) {
                    this.$ajax = $ajax;
                    this.$url = $url;
                }
                return AuthService;
            }());
            AuthService.$inject = ['AjaxService', 'UrlService'];
            phpangularModule.service("AuthService", AuthService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
