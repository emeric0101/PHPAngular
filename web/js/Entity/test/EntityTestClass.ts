module Emeric0101.PHPAngular.Entity {
    export class EntityTest extends Emeric0101.PHPAngular.Entity.Model {
        private title : string= "";
        getTitle() {
            return this.title;
        }
        setTitle(t : string) {
            this.title = t;
        }
        constructor(repositoryService) {
            super("EntityTest", repositoryService);
        }

    }
}
