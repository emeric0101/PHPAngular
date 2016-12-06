var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
            var LoginService = (function () {
                function LoginService($ajaxService, $url, $repo) {
                    this.$ajaxService = $ajaxService;
                    this.$url = $url;
                    this.$repo = $repo;
                    this.user = null;
                    this.oldValueUser = null;
                    this.logged = false;
                    this.requesting = false;
                    this.waitingCb = [];
                    this.timeout = null;
                    this.updateCallbacks = [];
                }
                LoginService.prototype.registerUpdateCallback = function (cb) {
                    this.updateCallbacks.push(cb);
                };
                LoginService.prototype.fireUpdateCallback = function () {
                    if (this.user == this.oldValueUser) {
                        return;
                    }
                    this.oldValueUser = this.user;
                    for (var _i = 0, _a = this.updateCallbacks; _i < _a.length; _i++) {
                        var cb = _a[_i];
                        cb(this.user);
                    }
                };
                LoginService.prototype.login = function (mail, pass, stay, success, error) {
                    var _this = this;
                    this.$ajaxService.post(this.$url.makeApi('Login', 'login'), {
                        mail: mail,
                        password: pass,
                        stay: stay
                    }, function (r) {
                        var data = r.data;
                        if (data.success !== true) {
                            error();
                            return;
                        }
                        _this.isLogged(function (user) {
                            if (user == null) {
                                alert("Une erreur s'est produite, veuillez vous connecter à nouveau");
                                console.error("LoginService::login : the user return by isLogged is null..., what the server is doing ?!!");
                                return;
                            }
                            success(user);
                        }, true);
                    }, function () {
                        error();
                    });
                };
                LoginService.prototype.logout = function () {
                    var _this = this;
                    this.$ajaxService.get(this.$url.makeApi('Login', 'logout'), {}, function (r) {
                        var data = r.data;
                        _this.logged = false;
                        _this.user = null;
                        _this.fireUpdateCallback();
                        _this.$url.redirect('user', 'register', null, 'Au revoir', 'success');
                    });
                };
                LoginService.prototype.getUser = function (callback) {
                    var $this = this;
                    this.isLogged(function () {
                        callback($this.user);
                    });
                };
                LoginService.prototype.isLogged = function (endCallback, force) {
                    var _this = this;
                    if (endCallback === void 0) { endCallback = null; }
                    if (force === void 0) { force = false; }
                    if (typeof (endCallback) === 'function') {
                        this.waitingCb.push(endCallback);
                    }
                    if (this.requesting) {
                        return;
                    }
                    this.requesting = true;
                    var callback = function () {
                        _this.requesting = false;
                        for (var i in _this.waitingCb) {
                            _this.waitingCb[i](_this.user);
                        }
                        _this.fireUpdateCallback();
                        _this.waitingCb = [];
                    };
                    if (this.timeout == null) {
                        this.timeout = new Date();
                    }
                    if (force === false && (new Date()).getTime() - this.timeout.getTime() < 60 * 1000 && this.logged) {
                        callback();
                        return;
                    }
                    this.timeout = new Date();
                    this.$ajaxService.get(this.$url.makeApi("Login", "getLoginInfo"), {}, function (r) {
                        var data = r.data;
                        _this.logged = true;
                        if (data.success === true && typeof (data.user) !== "undefined") {
                            _this.user = _this.$repo.EntityFromJson(data.user, 'User');
                        }
                        else {
                            _this.user = null;
                        }
                        if (callback !== null) {
                            callback();
                        }
                    }, function () {
                        callback();
                    });
                };
                return LoginService;
            }());
            LoginService.$inject = ['AjaxService', 'UrlService', 'RepositoryService'];
            Service.LoginService = LoginService;
            phpangularModule.service("LoginService", LoginService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
