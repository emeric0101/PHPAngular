module Emeric0101.PHPAngular.Service {
    export class EntityManager {
        static $inject = ['AjaxService', 'UrlService', 'RepositoryService', '$injector'];
        private persistObjs : any[] = [];

        constructor(private $ajax, private $url, private $repo, private $injector) {}

        public getRespository(name : string) {
            // looking for the repository class if existence
            if (name == '') {
                console.error("getRepository from EntityManager : bad name : ", name);
                return null;
            }
            if (Emeric0101.PHPAngular.Repository[name + "Repository"] === 'function') {
                return this.$injector.get(name + "Repository");
            }
            return this.$repo;
        }

        /** Use this method only in testing envirronement
        */
        public getPersistObjs() {
            if (!PhpangularModule.debug) { return[];}
            return this.persistObjs;
        }

        public persist(obj : Emeric0101.PHPAngular.Entity.Model, exclude : Emeric0101.PHPAngular.Entity.Model[] = []) {
            var $this = this;
            // check existence
            for (var i in this.persistObjs) {
                if (this.persistObjs[i] == obj) {
                    return;
                }
            }
            // Looking for inheritance
            exclude.push(obj);
            var checkForEntity = function(v : any) {
                // Avoid infinite looping by having the same object in the sub object
                for (var i in exclude) {
                    if (exclude[i] == v) {
                        return false;
                    }
                }
                if (v instanceof Emeric0101.PHPAngular.Entity.Model) {
                    $this.persist(v, exclude); // add the new object
                    return true;
                }
                return false;
            };
            for (var j in obj) {
                if (checkForEntity(obj[j])) { continue;}
            }

            this.persistObjs.push(obj);

        }
        /** Clear all the persist entities */
        public clear() {
            this.persistObjs = [];
        }

        private save(obj : Emeric0101.PHPAngular.Entity.Model, callback : (result, errorMsg) => void) {
            var $this = this;
            var objs = {};
            var dataToSend = {};
            // if not change in the object
            if (!obj.getChanged()) {
                callback(true, []);
                return;
            }
            for (var i in obj) {
                var value = obj[i];
                // Excludes :
                if (value === null || typeof(value) === 'undefined') {
                    continue;
                }
                // array of model
                if ((typeof(value) === 'array' || typeof(value) === 'object') && value.length > 0 && typeof(value[0].getId) === 'function'){
                    // We must linearise the array of object
                    var nvalue = []; // we must clone it
                    for (var objIndex in value) {
                        nvalue[objIndex] = value[objIndex].getId();
                    }
                    objs[i] = nvalue;
                    continue;
                }
                if (typeof(value) === 'function') {continue;}
                if (value instanceof Emeric0101.PHPAngular.Service.RepositoryService) {continue;}
                // Entity (instanceof ne marche pas toujours)
                if (typeof(value.getId) === 'function') {
                    value = value.getId();
                }
                if (typeof(value) === 'object' && typeof(value.entity) === 'string') {
                    value = value.id;
                }
                objs[i] = value;
            }
            dataToSend[obj.getName()] = objs;
            this.$ajax.post(this.$url.makeApi(obj.getName(), 'post', obj.getId()), dataToSend, function(r) {
                var data = r.data;
                // for handling error
                let errorMsg = 'OK';
                if (data['errMsg'] !== undefined) {
                    errorMsg = data['errMsg'];
                }

                if (data.success !== true) {
                    callback(false, errorMsg);
                    return;
                }

                // Si on doit mettre à jour l'objet
                if (typeof(data[obj.getName()]) !== 'undefined') {
                    // rSync object
                    var nobj = $this.$repo.EntityFromJson(data[obj.getName()], obj.getName());
                    for (var i in nobj) {
                        obj[i] = nobj[i];
                    }
                }

                callback(true, []);
            },
            function() {
                callback(false, 'UNABLE_TO_CONNECT');
            })

        }

        /**
        * Synchronise all object with server and db
        * @param callback (result) => void
        * @param autoclear Avoid autoclear of persisted entities
        */
        public flush(callback? : (result, errorMsg) => void, autoclear = true) {
            var $this = this;
            $this.$repo.clearCache();
            if (typeof (callback) === "undefined") {
                callback = function(r) {};
            }
            if (this.persistObjs.length === 0) { return;}

            var persistObjs = this.persistObjs;
            // Clear all persist obj
            if (autoclear) {
                $this.clear();
            }

            var i = 0;
            var magicFunction = (response, errorMsg) => {

                if (!response) {
                    callback(false, errorMsg);
                    return;
                }
                i++;
                if (i>=persistObjs.length) { // break condition
                    callback(true, errorMsg);
                    return;
                }
                this.save(persistObjs[i], magicFunction)
            };
            // Init recurrence
            $this.save(persistObjs[0], magicFunction)

        }
    }
    phpangularModule.service("EntityManager", EntityManager);

}
