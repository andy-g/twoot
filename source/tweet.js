var twootApp = angular.module('twootApp', []);

twootApp.controller('TwootCtrl', function ($scope, $http) {
  $scope.twootText = '';

  $http.get('/api/stream.json').success(function(data) {
    $scope.twoots = data;
  });

  $scope.addTwoot = function() {
    $scope.twoots.push({text:$scope.twootText, done:false});
    $scope.twootText = '';
  };
  
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.twoots, function(twoot) {
      count += twoot.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTwoots = $scope.twoots;
    $scope.twoots = [];
    angular.forEach(oldTwoots, function(twoot) {
      if (!twoot.done) $scope.twoots.push(twoot);
    });
  };
});