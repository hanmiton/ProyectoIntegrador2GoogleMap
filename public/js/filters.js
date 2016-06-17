(function () {

  angular.module('ingedex.filters', [])
    .filter('normalize', function () {
      return function (input) {
          input = input
                  .replace('♀', 'f')
                  .replace('♂', 'm')
                  .replace(/\W+/g, "");
          return input.toLowerCase();
      };
    })

    .filter('imageify', ['$filter', function ($filter) {
    return function (input) {
      var url = "img/ingenieros/" + $filter('normalize')(input) + ".jpg";
      return url;
    };
  }]);

})();
