(function () {

  angular.module('ingedex.services', [])

    .factory('ingenieroService', ['$http', '$q', function ($http, $q) {

      function all() {
        var deferred = $q.defer();

        $http.get('/ingenieros.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

      return {
        all: all
      };

    }]);

})();
