import { LoginService } from './LoginService';
import { UrlService } from './UrlService';
import { AjaxService } from './AjaxService';

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
    public getRight(rightName : string) {
        return new Promise<boolean>(resolve => {
            this.$login.getUser(async (user) => {
                if (user == null) {
                    return resolve(this.getRightFromFlag(rightName, 'PUBLIC'));
                }
                user.getGroupe((group) => {
                    if (group == null) {
                        return resolve(this.getRightFromFlag(rightName, 'USER'));
                    }
                    this.getRightFromFlag(rightName, group.getFlag()).then(r => {
                        return resolve(r);
                    });
                });

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
        private $ajax : AjaxService,
        private $url : UrlService,
        private $login : LoginService
    ) {

    }
}
