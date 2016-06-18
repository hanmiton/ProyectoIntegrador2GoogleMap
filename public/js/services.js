(function () {

  angular.module('ingedex.services', [])

    .factory('ingenieroService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {
      var normalize = $filter('normalize');
      var localStorage = $window.localStorage;

      function all() {
        var deferred = $q.defer();

        $http.get('/ingenieros.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

       function byName(name) {
        name = normalize(name);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (ingeniero) {
            return normalize(ingeniero.name) === name;
          });

          if (results.length > 0) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject();
          }

        });

        return deferred.promise;
      }

      function byType(type) {
        type = normalize(type);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (ingeniero) {
            return ingeniero.type.some(function (t) {
              return normalize(t) === type;
            });
          });

          deferred.resolve(results);
        });

        return deferred.promise;
      }

      function saveSolicitud(ingeniero, solicitud) {
        var solicitudes = getSolicitudes(ingeniero);

        solicitudes.push(solicitud);
        localStorage.setItem(ingeniero, JSON.stringify(solicitudes));
      }

      function getSolicitudes(ingeniero) {
        var solicitudes = localStorage.getItem(ingeniero);

        if (!solicitudes) {
          solicitudes = [];
        } else {
          solicitudes = JSON.parse(solicitudes);
        }

        return solicitudes;
      }


      return {
        all: all,
        byName: byName,
        byType: byType,
        saveSolicitud: saveSolicitud,
        getSolicitudes: getSolicitudes
      };

    }]);

})();
