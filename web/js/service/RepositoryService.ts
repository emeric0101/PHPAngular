module Emeric0101.PHPAngular.Service {
    export class RepositoryService{
        static $inject = ['AjaxService', 'UrlService', 'EntityFactory'];
        private entities = [];
        private requestById = [];


        constructor(private AjaxService : Emeric0101.PHPAngular.Service.AjaxService,
             private UrlService : Emeric0101.PHPAngular.Service.UrlService,
             private EntityFactory : Emeric0101.PHPAngular.Service.EntityFactory
         ) {

        }

        public clearCache() {
            this.entities = [];
        }

        getFromCache(name: string, id: number): Emeric0101.PHPAngular.Entity.Model {
            // Looking if it is into the cache ?
            if (typeof(this.entities[name]) === 'undefined' || typeof(this.entities[name][id]) === "undefined") {
                return null;
            }
            return this.entities[name][id];
        }

        findById(name : string, id :number, callback : (obj : Emeric0101.PHPAngular.Entity.Model) => void, error? : () => void) {
            if (typeof(error) === 'undefined') {
                error = function() {
                    console.error("findById : unable to get " + name + " id : " + id);
                };
            }
            if (id === 0) {
                error()
                return; // Don't need to make a request if we create an empty model
            }
            var $this = this;

            var fromCache = $this.getFromCache(name, id);
            if (fromCache !== null) {
                callback(fromCache);
                return;
            }

            // Prevent from duplicate request
            var callbackItem = {
                callback: callback,
                error: error
            };
            // Create the array for the request if not exist
            if (typeof(this.requestById[name + id]) === 'undefined' || $this.requestById[name + id].length == 0) {
                $this.requestById[name + id] = [callbackItem];
            }
            else {
                // Add the callback to the list requested and end
                $this.requestById[name + id].push(callbackItem);
                return;
            }


            this.AjaxService.get($this.UrlService.makeApi("Entity", name, id), {},
            function(result) {
                var data = result.data;
                if (!data.success) {
                    error();
                    return;
                }
                var obj = $this.EntityFromJson(data[name], name);
                // Callback
                for (var i in $this.requestById[name + id]) {
                    $this.requestById[name + id][i].callback(obj);
                }
                $this.requestById[name + id] = []; // reset
            },
            function() {
                // Callback error
                for (var i in $this.requestById[name + id]) {
                    $this.requestById[name + id][i].error();
                }
                $this.requestById[name + id] = []; // reset
            });

        }
        /**
        * @param obj object
        * @param name string name of the model
        */
        EntityFromJson(obj : {}, name : string) {
            if (typeof(this.EntityFactory.getBundle().Entity[name]) !== "function") {
                throw 'EntityFromJson : unable to find entity : ' + name;
            }
            var entity : Emeric0101.PHPAngular.Entity.Model = new (this.EntityFactory.getBundle()).Entity[name](this);
            entity.setValues(obj);
            // Add to the local cache
            if (typeof(this.entities[name]) === "undefined") {
                this.entities[name] = [];
            }
            this.entities[name][entity.getId()] = entity;

            return entity;
        }
        /**
        * @param objs array
        * @param name string name of the model
        */
        EntitiesFromJson(objs : {}[], name: string) {
            var objArray = [];
            for (var i in objs) {
                objArray.push(this.EntityFromJson(objs[i], name));
            }
            return objArray;
        }
        /**
        * @param obj string Name of the Entity (With CAPITAL LETTER first !!) User
        * @param success callback(array of Entity)
        * @param error callback
        */
        findAll(name : string, callback : (obj : any[]) => void, error? : () => void) {
            var $this = this;
            if (typeof (error) !== 'function') {
                error = function() {};
            }
            this.AjaxService.get(
                this.UrlService.makeApi('Entity', name),
                {},
                function(result) {
                    var data = result.data;
                    if (data.success !== true || typeof(data[name + "s"]) === 'undefined') {
                        error();
                        return;
                    }
                    var objArray = $this.EntitiesFromJson(data[name + "s"], name);
                    callback(objArray);
                },
                function() {
                    error();
                }
            )
        }
    }
    phpangularModule.service("RepositoryService", RepositoryService);

}
