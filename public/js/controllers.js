(function () {

  angular.module('ingedex.controllers', [])
      .controller('IngedexController', ['$scope', 'ingenieroService', function ($scope, ingenieroService) {
      ingenieroService.all().then(function (data) {
        $scope.ingenieros = data;
      });
    }])

    .controller('IngenieroController', ['$scope', '$routeParams', 'ingenieroService', function ($scope, $routeParams, ingenieroService) {
      var name = $routeParams.name;
      $scope.ingeniero = {};

      ingenieroService.byName(name)
      .then(function (data) {
        $scope.ingeniero = data;
      });
    }])

    .controller('TabsController', function () {
      this.tab = 1;

      this.selectTab = function (tab) {
        this.tab = tab;
    };

  })

    .factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId          
        };
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

})
.controller('MapCtrl', ['MarkerCreatorService', '$scope', function (MarkerCreatorService, $scope) {

         MarkerCreatorService.createByCoords(-0.2006319, -78.5040844, function (marker) {
            marker.options.labelContent = 'Universidad Central Del Ecuador';
            $scope.ecuadorMarker = marker;
        });

        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.ecuadorMarker.latitude,
                longitude: $scope.ecuadorMarker.longitude
            },
            zoom:9,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.ecuadorMarker);

       
        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }

    }]);

    



})();