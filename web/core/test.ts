/** karma unit testing" */

module Emeric0101.PHPAngular.Service {
    export class EntityFactory {
        private bundle = Emeric0101.PHPAngular;
        getBundle() : any {
            return this.bundle;
        }
    }
    phpangularModule.service("EntityFactory", EntityFactory);
}

module Emeric0101.PHPAngular.Entity {
    export class GroupeUser extends Emeric0101.PHPAngular.Entity.Model implements Emeric0101.PHPAngular.Entity.IGroup {
        getFlag() {
            return 'USER';
        }
    }
    export class User extends Emeric0101.PHPAngular.Entity.Model implements Emeric0101.PHPAngular.Entity.IUser {
        private mail;
  	     public getMail() {
             return this.mail;
         }
         public setMail(m) {
             this.mail = m;
         }
         private groupe = [new GroupeUser('groupe', this.repositoryService)];
         public async getGroupe() {
             return new Promise<GroupeUser[]>(resolve => {
                 resolve(this.groupe);
             });
         }
        constructor(repositoryService : Emeric0101.PHPAngular.Service.RepositoryService) {
          super("User", repositoryService);
        }
  }
}
