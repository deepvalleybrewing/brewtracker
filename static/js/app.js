var app = angular.module('brewing', ['ngRoute'])

app.config(function($routeProvider, GrainProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'static/js/templates/index.html',
      controller: 'indexCtrl'
    })
    .when('/grain', {
      templateUrl: 'static/js/templates/grain.html',
      controller: 'grainCtrl',
      resolve: {
        grains: GrainProvider.$get().all
      }
    })
});


app.controller('indexCtrl', ['$scope', function($scope) {}]);

app.controller('grainCtrl', ['$scope', 'grains', function($scope, grains) {
  $scope.grains = grains;
}]);


app.factory('Grain', ['$http', function($http) {
  var allGrains = function() {
    return $http.get('/ingredient/grain')
      .then(function(resp) {
        var grains = resp.data.grain;
        return grains;
      });
  };

  var newGrain = function(grainObj) {
    return $http
  };  
  return {
    all: allGrains
  };
}]);