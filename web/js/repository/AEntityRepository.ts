module Emeric0101.PHPAngular.Repository {
    class AEntityRepository  {
        static $inject = ['RepositoryService', 'AjaxService', 'UrlService'];

        public findSample(callback : (obj) => void, error : () =>void) {
            var $this = this;
            this.$ajax.get(
            this.$url.makeApi('AEntity', "findSample", null, {}),
            {},
            function(result) {
                var data = result.data;
                if (data.success !== true || typeof(data["AEntitys"]) === 'undefined') {
                    console.error("Unable to get from ajax findSample : AEntity");
                    callback(null);
                }
                var objArray = $this.$repo.EntitiesFromJson(data["AEntitys"], "AEntity");
                callback(objArray);
            },
            function() {
                error();
            }
        )
        }

        constructor(private $repo, private $ajax, private $url) {
        }
    }
    phpangularModule.service("AEntityRepository", AEntityRepository);

}
