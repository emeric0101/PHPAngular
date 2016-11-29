var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
                AuthService.prototype.getRightFromFlag = function (rightname, flag) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(this.table == null))
                                        return [3 /*break*/, 2];
                                    _a = this;
                                    return [4 /*yield*/, this.getTable()];
                                case 1:
                                    _a.table = _b.sent();
                                    _b.label = 2;
                                case 2:
                                    if (flag == 'ADMIN') {
                                        return [2 /*return*/, true];
                                    }
                                    if (this.table == null || this.table[flag] == undefined) {
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/, this.table[flag].getRight(rightname)];
                            }
                        });
                    });
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
                AuthService.prototype.getRight = function (rightName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    _this.$login.getUser(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                        var group;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (user == null) {
                                                        return [2 /*return*/, resolve(this.getRightFromFlag(rightName, 'PUBLIC'))];
                                                    }
                                                    return [4 /*yield*/, user.getGroupe()];
                                                case 1:
                                                    group = _a.sent();
                                                    if (group == null) {
                                                        return [2 /*return*/, resolve(this.getRightFromFlag(rightName, 'USER'))];
                                                    }
                                                    return [4 /*yield*/, this.getRightFromFlag(rightName, group.getFlag())];
                                                case 2:
                                                    if ((_a.sent()) == true) {
                                                        return [2 /*return*/, resolve(true)];
                                                    }
                                                    return [2 /*return*/, resolve(false)];
                                            }
                                        });
                                    }); });
                                })];
                        });
                    });
                };
                AuthService.prototype.getTable = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    _this.$ajax.get(_this.$url.makeApi('auth', 'getTable'), {}, function (result) {
                                        if (result.data.success !== true || result.data.authTable == undefined) {
                                            throw 'unable to load table';
                                        }
                                        _this.table = _this.parseTable(result.data.authTable);
                                        resolve(_this.table);
                                    }, function () {
                                        throw 'unable to load table';
                                    });
                                })];
                        });
                    });
                };
                return AuthService;
            }());
            AuthService.$inject = ['AjaxService', 'UrlService', 'LoginService'];
            Service.AuthService = AuthService;
            phpangularModule.service("AuthService", AuthService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
