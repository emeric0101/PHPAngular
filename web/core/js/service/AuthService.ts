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
    export class AuthService {
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
        async getRightFromFlag(rightname : string, flag : string) {
            if (this.table == null) {
                this.table = await this.getTable();
            }

            if (flag == 'ADMIN') {
                return true;
            }
            if (this.table == null || this.table[flag] == undefined) {
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
        public async getRight(rightName : string) {
            return new Promise<Boolean>(resolve => {
                this.$login.getUser(async (user) => {
                    if (user == null) {
                        return resolve(this.getRightFromFlag(rightName, 'PUBLIC'));
                    }
                    let group = await user.getGroupe<Emeric0101.PHPAngular.Entity.IGroup>();
                    if (group == null) {
                        return resolve(this.getRightFromFlag(rightName, 'USER'));
                    }
                    if (await this.getRightFromFlag(rightName, group.getFlag()) == true) {
                        return resolve(true);
                    }
                    return resolve(false);
                });
           });
        }
        async getTable() {
            return new Promise<RightTable>(resolve => {
                this.$ajax.get(this.$url.makeApi('auth' ,'getTable'), {}, (result) => {
                    if (result.data.success !== true || result.data.authTable == undefined) {
                        throw 'unable to load table';
                    }
                    this.table = this.parseTable(result.data.authTable);
                    resolve(this.table);
                }, () => {
                    throw 'unable to load table';
                });
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
