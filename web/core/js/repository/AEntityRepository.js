var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Repository;
        (function (Repository) {
            var AEntityRepository = (function () {
                function AEntityRepository($repo, $ajax, $url) {
                    this.$repo = $repo;
                    this.$ajax = $ajax;
                    this.$url = $url;
                }
                AEntityRepository.prototype.findSample = function (callback, error) {
                    var $this = this;
                    this.$ajax.get(this.$url.makeApi('AEntity', "findSample", null, {}), {}, function (result) {
                        var data = result.data;
                        if (data.success !== true || typeof (data["AEntitys"]) === 'undefined') {
                            console.error("Unable to get from ajax findSample : AEntity");
                            callback(null);
                        }
                        var objArray = $this.$repo.EntitiesFromJson(data["AEntitys"], "AEntity");
                        callback(objArray);
                    }, function () {
                        error();
                    });
                };
                return AEntityRepository;
            }());
            AEntityRepository.$inject = ['RepositoryService', 'AjaxService', 'UrlService'];
            phpangularModule.service("AEntityRepository", AEntityRepository);
        })(Repository = PHPAngular.Repository || (PHPAngular.Repository = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
