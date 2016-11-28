module Emeric0101.PHPAngular.Service {
    abstract class IRight {
        public abstract getRight(rightName : string) : boolean;
        public constructor(protected flag) {}
    }

    export class RightGroup extends IRight {
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
    export class Right extends IRight {
        public getRight(rightName){
            return rightName == this.flag;
        }

    }

    interface RightTable {
        [name : string] : RightGroup

    }
    class AuthService {
        static $inject = ['AjaxService', 'UrlService', 'LoginService'];

        private table : RightTable= null;
        public get Table() {return this.table;}

        private parseRightGroup(rights, flag, table) {
            for (let flagCurrent in rights) {
                let right = rights[flagCurrent];
                if (right == 'P') {
                    table[flag].addRight(table[flagCurrent]);
                }
                else if (right === true) {
                    table[flag].addRight(new Right(flagCurrent));
                }

            }
        }
        getRightFromGroupe(rightname : string, groupe : Emeric0101.PHPAngular.Entity.IGroup) {
            let flag = groupe.getFlag();
            if (flag == 'ADMIN') {
                return true;
            }
            if (this.table == null || this.table['flag'] != undefined) {
                return false;
            }
            return this.table[flag].getRight(rightname);
        }

        parseTable(rights) {
            let table : RightTable = {};
            for (let flag in rights) {
                let right = rights[flag];
                ;
                table[flag] = new RightGroup(flag);
            }
            for (let flag in rights) {
                let right = rights[flag];
                this.parseRightGroup(right, flag, table);
            }
            return table;
        }
        getRight(rightName : string, callback : (result : boolean) => void) {
            this.$login.getUser((user) => {
                user.getGroupe((groups) => {
                    for (let group of groups) {
                        if (this.getRightFromGroupe(rightName, group) == true) {
                            callback(true);
                        }
                    }
                    callback(false);
                });

            })
        }
        getTable() {
            this.$ajax.get(this.$url.makeApi('auth' ,'getTable'), {}, (result) => {
                if (result.data.success !== true || result.data.authTable == undefined) {
                    console.error("Unable to load right table");
                    console.log(result);
                    return;
                }
                this.table = this.parseTable(result.data.authTable);

            }, () => {
                // si la table est vide, tous les droits sont révoqués !
            });
        }

        public constructor(
            private $ajax : Emeric0101.PHPAngular.Service.AjaxService,
            private $url : Emeric0101.PHPAngular.Service.UrlService,
            private $login : Emeric0101.PHPAngular.Service.LoginService
        ) {

        }
    }
    phpangularModule.service("AuthService", AuthService);

}
