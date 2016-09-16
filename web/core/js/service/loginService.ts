module Emeric0101.PHPAngular.Service {
    export class LoginService {
        static $inject = ['AjaxService', 'UrlService', 'RepositoryService'];
        private user : Emeric0101.PHPAngular.Entity.IUser = null;
        private logged = false; // if the request has already been sent
        private requesting = false;
        private waitingCb : ((user : Emeric0101.PHPAngular.Entity.IUser) => void)[] = [];

        login(
            mail : string,
            pass : string,
            stay : boolean,
            success : (user : Emeric0101.PHPAngular.Entity.IUser) => void,
            error : () => void) {
            var $this = this;
            this.$ajaxService.post(this.$url.makeApi('Login', 'login'), {
                mail: mail,
                password: pass,
                stay: stay
            },function(r) {
                var data = r.data;
                if (data.success !== true) {
                    error();
                    return;
                }
                $this.isLogged(function(user) {
                    success(user);
                }, true);
            },
            function() {
                error();
            })
        }
        logout() {
            var $this = this;
            this.$ajaxService.get(this.$url.makeApi('Login', 'logout'),{},
            function(r) {
                var data = r.data;
                $this.logged = false;
                $this.user = null;
                $this.$url.redirect('user', 'register', null, 'Au revoir', 'success');
            });
        }
        getUser(callback : (user : Emeric0101.PHPAngular.Entity.IUser) => void) {
            var $this = this;
            this.isLogged(function() {
                callback($this.user);
            })
        }
        isLogged(endCallback : (user : Emeric0101.PHPAngular.Entity.IUser) => void = null, force = false) {
            var $this = this;
            if (typeof(endCallback) === 'function') {
                this.waitingCb.push(endCallback);
            }
            // If the request is already in progress, don't do anything else, just wait for callback
            if (this.requesting) {
                return;
            }

            this.requesting = true;

            // After request, call this :
            var callback = function() {
                $this.requesting = false;
                // Calling all queue callback !
                for (var i in $this.waitingCb) {
                    $this.waitingCb[i]($this.user);
                }
                // Reset the queue
                $this.waitingCb = [];
            };

            // If the request has already been done
            if (force === false && $this.logged) {
                callback();
                return;
            }

            this.$ajaxService.get(this.$url.makeApi("Login", "getLoginInfo"), {}, function(r) {
                var data = r.data;
                $this.logged = true; // request done
                if (data.success === true && typeof(data.user) !== "undefined") {
                    $this.user = $this.$repo.EntityFromJson(data.user, 'User');
                }else {
                    $this.user = null;
                }
                if (callback !== null) {
                    callback();
                }
            }, function() {
                callback();
            })


        }
        constructor(private $ajaxService : Emeric0101.PHPAngular.Service.AjaxService,
            private $url : Emeric0101.PHPAngular.Service.UrlService,
            private $repo) {
        }
    }
    phpangularModule.service("LoginService", LoginService);
}
