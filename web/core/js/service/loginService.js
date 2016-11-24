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
                    this.logged = false;
                    this.requesting = false;
                    this.waitingCb = [];
                }
                LoginService.prototype.login = function (mail, pass, stay, success, error) {
                    var $this = this;
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
                        $this.isLogged(function (user) {
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
                    var $this = this;
                    this.$ajaxService.get(this.$url.makeApi('Login', 'logout'), {}, function (r) {
                        var data = r.data;
                        $this.logged = false;
                        $this.user = null;
                        $this.$url.redirect('user', 'register', null, 'Au revoir', 'success');
                    });
                };
                LoginService.prototype.getUser = function (callback) {
                    var $this = this;
                    this.isLogged(function () {
                        callback($this.user);
                    });
                };
                LoginService.prototype.isLogged = function (endCallback, force) {
                    if (endCallback === void 0) { endCallback = null; }
                    if (force === void 0) { force = false; }
                    var $this = this;
                    if (typeof (endCallback) === 'function') {
                        this.waitingCb.push(endCallback);
                    }
                    if (this.requesting) {
                        return;
                    }
                    this.requesting = true;
                    var callback = function () {
                        $this.requesting = false;
                        for (var i in $this.waitingCb) {
                            $this.waitingCb[i]($this.user);
                        }
                        $this.waitingCb = [];
                    };
                    if (force === false && $this.logged) {
                        callback();
                        return;
                    }
                    this.$ajaxService.get(this.$url.makeApi("Login", "getLoginInfo"), {}, function (r) {
                        var data = r.data;
                        $this.logged = true;
                        if (data.success === true && typeof (data.user) !== "undefined") {
                            $this.user = $this.$repo.EntityFromJson(data.user, 'User');
                        }
                        else {
                            $this.user = null;
                        }
                        if (callback !== null) {
                            callback();
                        }
                    }, function () {
                        callback();
                    });
                };
                LoginService.$inject = ['AjaxService', 'UrlService', 'RepositoryService'];
                return LoginService;
            }());
            Service.LoginService = LoginService;
            phpangularModule.service("LoginService", LoginService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
