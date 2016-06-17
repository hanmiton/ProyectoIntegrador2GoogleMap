(function () {
var app = angular.module('ingedex', [
    'google-maps',
    'ngRoute',
    'ingedex.controllers',
    'ingedex.directives',
    'ingedex.filters'
    ]);

     app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/ingeniero.html',
        controller: 'IngenieroController',
        controllerAs: 'ingCtrl'
      });

    }]);
})();