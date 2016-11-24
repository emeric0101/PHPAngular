module Emeric0101.PHPAngular.Service {
    abstract class IRight {
        protected flag;
        getFlag() {return this.flag;}
        public abstract getRight(rightName : string) : boolean;
    }

    class RightGroup extends IRight {
        private rights : Right[]= [];
        public addRight(right : IRight) {
            this.rights.push(right);
        }
        public getRight(rightName){
            for (let right of this.rights) {
                if (right.getRight(rightName)) {
                    return true;
                }
            }
            return false;
        }
    }
    class Right extends IRight {
        public getRight(rightName){
            return rightName == this.flag;
        }
        public constructor(flag) {
            super();
            this.flag = flag;
        }
    }


    class AuthService {
        static $inject = ['AjaxService', 'UrlService'];

        private table;

        public constructor(
            private $ajax : Emeric0101.PHPAngular.Service.AjaxService,
            private $url : Emeric0101.PHPAngular.Service.UrlService
        ) {

        }
    }
    phpangularModule.service("AuthService", AuthService);

}
