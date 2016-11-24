
module Emeric0101.PHPAngular.Entity {
    class ForeignKeyRequest {
        private callbacks : ((model : Model) => void)[] = [];
        private done = false;

        private value = null;
        public static getForeignKeyRequestFromField(field :string, array : ForeignKeyRequest[]) {
            for (let request of array) {
                if (request == null) {continue;}
                if (request.getField() == field) {
                    return request;
                }
            }
        }
        /**
        * Add a callback to the stack if the request is not done
        */
        public addCallback(cb : (model : Model) => void) {
            if (this.done) {
                cb(this.value);
            }
            else {
                this.callbacks.push(cb);
            }
        }
        public getField() {
            return this.field;
        }
        /**
        * Function call when the ajax get the value
        */
        public valueReceived(value) {
            this.value = value;
            this.done = true;
            this.fireCallback();
        }

        private fireCallback() {
            for (let cb of this.callbacks) {
                cb(this.value);
            }
            this.callbacks = []; // clear callbacks
        }

        public constructor(
            callback : ((model : Model) => void),
            private field : string
        ) {
            this.callbacks.push(callback);
        }
    }

    export abstract class Model {
        protected id : number;
        private isFromDb: boolean = false;

        private changed = false; // all base values to detect change
        public getChanged() {
            return this.changed || !this.isFromDb;
        }
        protected setValue(name, value) {
            this.changed = true;
            this[name] = value;
            for (var i in this.foreignKeyRequests) {
                if (this.foreignKeyRequests[i] != null && this.foreignKeyRequests[i].getField() == name) {
                    this.foreignKeyRequests[i] = null; // unset
                }
            }
        }


        public getIsFromDb() {
            return this.isFromDb;
        }
        public getId() {
            return this.id;
        }

        public getName() {
            return this.name;
        }
        /**
        * Get Entity from a foreignKey and put the entity into the value
        * @param field string The field of the key
        * @param success callback
        * @param error callback
        */
        protected foreignKeys(field: string) {
            var array = this[field];
            // If the value is not defined
            if (array === null) {
                return null;
            }
            if (array.length == 0) {
                return [];
            }

            for (var i in this[field]) {
                this.foreignKey(i, null, null, this[field]);
            }
            return this[field];
        }

        /**
        * Get Entity from a foreignKey and put the entity into the value
        * @param field string The field of the key
        * @param success callback
        * @param error callback
        * @param obj object to apply the foreginkey
        */
        private foreignKeyRequests : ForeignKeyRequest[] = [];
        protected foreignKey(
            field : string,
            success? : (obj : Emeric0101.PHPAngular.Entity.Model) => void,
            error? : () => void,
            obj = null
        ) {
                if ( typeof(error) === 'function') {
                    // Il faut ajouter un systeme qui mette en file les callback pour qu'ils soient rappelé un fois
                    // l'objet chargé, car on peut demander 2x le chargement et l'objet arrive apres donc il faut
                    // appeler les 2 callback !
                    throw "NOT READY YET : foreignKey";
                }
                if (obj === null) {
                    obj = this;
                }


                error = function() {};

                if (success == undefined) {
                    success = function() {};
                }

                var value = obj[field];
                if (value === null) {
                    return null;
                }


                // If the key is already requested (or requested)
                let requestExist = ForeignKeyRequest.getForeignKeyRequestFromField(field, this.foreignKeyRequests);
                if (requestExist != null) {
                    requestExist.addCallback(success); // add callback

                    return obj[field];
                }

                // if already exist
                if ((obj[field] instanceof Model)) {
                    return obj[field];
                }
                // create request for multiple callback
                var request = new ForeignKeyRequest(
                    success, field
                )
                this.foreignKeyRequests.push(request);


                if (typeof(value['entity']) === 'undefined') {
                    throw 'Model : foreignKey not an entity !';
                }
                var callbackSuccess = (objReceived) =>{
                    obj[field] = objReceived;
                    // clear callback
                    request.valueReceived(objReceived);
                };

                this.repositoryService.findById(value['entity'], value['id'], callbackSuccess, error);
                return obj[field];
        };

        public setValues(values : {}) {

            for (var i in values) {
                var value = values[i];
                if (value !== null && typeof (value["class"]) === 'string') {
                    if (value["class"] === 'datetime') {
                        // datetime
                        // ie doesn't support direct ISO date in constructor
                        let s = value['date'].split(/\D/);
                        value = new Date(Date.UTC(s[0], --s[1]||0, s[2]||'', s[3]||'', s[4]||'', s[5]||'', s[6]||''));
                    }
                    else {
                        throw "Unable to serialize : " + value['class'];
                    }
                }
                this[i] = value;
            }
            this.isFromDb = true; // lock the model
        }

        // Update the entity from server
        update() {
            this.repositoryService.findById(this.name, this.id, (obj) => {
                this.setValues(obj);
            });
        }
        public setRepositoryService(repositoryService : Emeric0101.PHPAngular.Service.RepositoryService) {
            this.repositoryService = repositoryService;
        }
        constructor(private name: string, protected repositoryService : Emeric0101.PHPAngular.Service.RepositoryService) {
        }
    }
}
