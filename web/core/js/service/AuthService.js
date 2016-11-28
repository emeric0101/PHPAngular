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
                function IRight(flag) {
                    this.flag = flag;
                }
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
            Service.RightGroup = RightGroup;
            var Right = (function (_super) {
                __extends(Right, _super);
                function Right() {
                    return _super.apply(this, arguments) || this;
                }
                Right.prototype.getRight = function (rightName) {
                    return rightName == this.flag;
                };
                return Right;
            }(IRight));
            Service.Right = Right;
            var AuthService = (function () {
                function AuthService($ajax, $url, $login) {
                    this.$ajax = $ajax;
                    this.$url = $url;
                    this.$login = $login;
                    this.table = null;
                }
                Object.defineProperty(AuthService.prototype, "Table", {
                    get: function () { return this.table; },
                    enumerable: true,
                    configurable: true
                });
                AuthService.prototype.parseRightGroup = function (rights, flag, table) {
                    for (var flagCurrent in rights) {
                        var right = rights[flagCurrent];
                        if (right == 'P') {
                            table[flag].addRight(table[flagCurrent]);
                        }
                        else if (right === true) {
                            table[flag].addRight(new Right(flagCurrent));
                        }
                    }
                };
                AuthService.prototype.getRightFromGroupe = function (rightname, groupe) {
                    var flag = groupe.getFlag();
                    if (flag == 'ADMIN') {
                        return true;
                    }
                    if (this.table == null || this.table['flag'] != undefined) {
                        return false;
                    }
                    return this.table[flag].getRight(rightname);
                };
                AuthService.prototype.parseTable = function (rights) {
                    var table = {};
                    for (var flag in rights) {
                        var right = rights[flag];
                        ;
                        table[flag] = new RightGroup(flag);
                    }
                    for (var flag in rights) {
                        var right = rights[flag];
                        this.parseRightGroup(right, flag, table);
                    }
                    return table;
                };
                AuthService.prototype.getRight = function (rightName, callback) {
                    var _this = this;
                    this.$login.getUser(function (user) {
                        user.getGroupe(function (groups) {
                            for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                                var group = groups_1[_i];
                                if (_this.getRightFromGroupe(rightName, group) == true) {
                                    callback(true);
                                }
                            }
                            callback(false);
                        });
                    });
                };
                AuthService.prototype.getTable = function () {
                    var _this = this;
                    this.$ajax.get(this.$url.makeApi('auth', 'getTable'), {}, function (result) {
                        if (result.data.success !== true || result.data.authTable == undefined) {
                            console.error("Unable to load right table");
                            console.log(result);
                            return;
                        }
                        _this.table = _this.parseTable(result.data.authTable);
                    }, function () {
                    });
                };
                return AuthService;
            }());
            AuthService.$inject = ['AjaxService', 'UrlService', 'LoginService'];
            phpangularModule.service("AuthService", AuthService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
