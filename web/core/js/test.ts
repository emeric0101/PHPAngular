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
    export class User extends Emeric0101.PHPAngular.Entity.Model implements Emeric0101.PHPAngular.Entity.IUser {
        private mail;
  	     public getMail() {
             return this.mail;
         }
         public setMail(m) {
             this.mail = m;
         }
        constructor(repositoryService : Emeric0101.PHPAngular.Service.RepositoryService) {
          super("User", repositoryService);
        }
  }
}
