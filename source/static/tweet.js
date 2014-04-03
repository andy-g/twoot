var twootApp = angular.module('twootApp', ['ngResource']);

twootApp.controller('TwootCtrl', function ($scope, $resource) {
  var Twoot = $resource('/api/twoots/:twootId/',
    { twootId:'@id' }, 
    { 
      charge: { method:'POST', params:{ charge:true } }
    }
  );

  var twoots = Twoot.query(function() {
      $scope.twoots = twoots;
      twoot = twoots[0];
      twoot.created = new Date();
     });

  $scope.twootText = '';

  $scope.addTwoot = function() {
    var newTwoot = new Twoot({twootId:'123'});
    newTwoot.text = $scope.twootText;
    newTwoot.created = Date.now();
    newTwoot.$save();
    //$scope.twoots.push({text:$scope.twootText, done:false});
    $scope.twoots.unshift(newTwoot);
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