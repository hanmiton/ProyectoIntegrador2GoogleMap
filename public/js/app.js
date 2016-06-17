(function () {
var app = angular.module('ingedex', [
    'google-maps',
    'ngRoute',
    'ingedex.controllers',
    'ingedex.directives',
    'ingedex.filters',
    'ingedex.services'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/ingedex.html',
        controller: 'IngedexController'
      })
      .when('/ingeniero/:name', {
        templateUrl: 'views/ingeniero.html',
        controller: 'IngenieroController',
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();