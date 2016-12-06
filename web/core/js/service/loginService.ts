module Emeric0101.PHPAngular.Service {
    export class LoginService {
        static $inject = ['AjaxService', 'UrlService', 'RepositoryService'];
        protected user : Emeric0101.PHPAngular.Entity.IUser = null;
        protected oldValueUser : Emeric0101.PHPAngular.Entity.IUser = null;
        protected logged = false; // if the request has already been sent
        protected requesting = false;
        protected waitingCb : ((user : Emeric0101.PHPAngular.Entity.IUser) => void)[] = [];
        protected timeout : Date = null;
        protected updateCallbacks :((user : Emeric0101.PHPAngular.Entity.IUser) => void)[]= [];
        /** add a listener on the user state change */
        public registerUpdateCallback(cb : (user : Emeric0101.PHPAngular.Entity.IUser) => void) {
            this.updateCallbacks.push(cb);
        }
        private fireUpdateCallback() {
            // only if change
            if (this.user == this.oldValueUser) {
                return;
            }
            this.oldValueUser = this.user;
            for (let cb of this.updateCallbacks) {
                cb(this.user);
            }
        }

        login(
            mail : string,
            pass : string,
            stay : boolean,
            success : (user : Emeric0101.PHPAngular.Entity.IUser) => void,
            error : () => void) {
            this.$ajaxService.post(this.$url.makeApi('Login', 'login'), {
                mail: mail,
                password: pass,
                stay: stay
            },(r) => {
                var data = r.data;
                if (data.success !== true) {
                    error();
                    return;
                }
                this.isLogged(function(user) {
                    if (user == null) {
                        alert("Une erreur s'est produite, veuillez vous connecter à nouveau");
                        console.error("LoginService::login : the user return by isLogged is null..., what the server is doing ?!!");
                        return;
                    }
                    success(user);
                }, true);
            },
            () => {
                error();
            })
        }
        logout() {
            this.$ajaxService.get(this.$url.makeApi('Login', 'logout'),{},
            (r) => {
                var data = r.data;
                this.logged = false;
                this.user = null;
                this.fireUpdateCallback();
                this.$url.redirect('user', 'register', null, 'Au revoir', 'success');
            });
        }
        getUser(callback : (user : Emeric0101.PHPAngular.Entity.IUser) => void) {
            var $this = this;
            this.isLogged(function() {
                callback($this.user);
            })
        }
        isLogged(endCallback : (user : Emeric0101.PHPAngular.Entity.IUser) => void = null, force = false) {
            if (typeof(endCallback) === 'function') {
                this.waitingCb.push(endCallback);
            }
            // If the request is already in progress, don't do anything else, just wait for callback
            if (this.requesting) {
                return;
            }

            this.requesting = true;

            // After request, call this :
            var callback = () => {
                this.requesting = false;
                // Calling all queue callback !
                for (var i in this.waitingCb) {
                    this.waitingCb[i](this.user);
                }
                // calling update
                this.fireUpdateCallback();
                // Reset the queue
                this.waitingCb = [];
            };

            // Requete que toute les 60s
            if (this.timeout == null) {
                this.timeout = new Date();
            }
            if (force === false && (new Date()).getTime() - this.timeout.getTime() < 60*1000 && this.logged) {
                callback();
                return;
            }

            this.timeout = new Date();

            this.$ajaxService.get(this.$url.makeApi("Login", "getLoginInfo"), {}, (r) => {
                let data = r.data;
                this.logged = true; // request done
                if (data.success === true && typeof(data.user) !== "undefined") {
                    this.user = this.$repo.EntityFromJson(data.user, 'User');
                }else {
                    this.user = null;
                }
                if (callback !== null) {
                    callback();
                }
            }, () =>{
                callback();
            })


        }
        constructor(protected $ajaxService : Emeric0101.PHPAngular.Service.AjaxService,
            protected $url : Emeric0101.PHPAngular.Service.UrlService,
            protected $repo) {
        }
    }
    phpangularModule.service("LoginService", LoginService);
}
