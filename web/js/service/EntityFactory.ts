module Emeric0101.PHPAngular.Service {
    export class EntityFactory {
        private bundle = Emeric0101.PHPAngular;
        getBundle() {
            return this.bundle;
        }
        create(model : string) {
            return new (this.getBundle()).Entity[model](0, model);
        }
        /** Create a model from a id object
        * @param id number Id of the object
        * @param model string : name of the model we want 'User', ...
        * @param callback Function(result) called when object is ready to use (with data)
        */
        createFromId(id : number, model : string, callback? : (result : boolean) => void) {
            if (typeof(this.getBundle().Entity[model]) !== 'function') {
                throw 'Model not found : ' + model;
            }
            return new (this.getBundle().Entity[model](id, callback));
        }
    }
    phpangularModule.service("EntityFactory", EntityFactory);
}
