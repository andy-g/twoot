var twootApp = angular.module('twootApp', ['ngResource']);

twootApp.controller('TwootCtrl', function ($scope, $resource) {

  $scope.twoots = [];

  document.getElementById('twoot-box').focus()

  // var Twoot = $resource('/api/twoots/:twootId/',
  //   { twootId:'@id' }, 
  //   { 
  //     charge: { method:'POST', params:{ charge:true } }
  //   }
  // );

  // var twoots = Twoot.query(function() {
  //     $scope.twoots = twoots;
  //    });

  $scope.twootText = '';

  $scope.addTwoot = function() {
    var newTwoot = new Twoot({twootId:'123'});
    newTwoot.text = $scope.twootText;
    newTwoot.created = Date.now();
    newTwoot.status = 0; //0: sending, 1: sent, -1: error
    newTwoot.$save(function(){ console.log('success')}, function(res){ 
      console.log('failure');
      console.dir(res.data.error);
      
      //mark item as unsent (actually update status property and have some ng-class render item appropriately (sending, sent, error))
      var i = $scope.twoots.indexOf(newTwoot);
      //$scope.twoots[i].text += ' unsaved!!';
      $scope.twoots[i].status = -1;

      //remove item from array
      // var i = $scope.twoots.indexOf(newTwoot);
      // if(i != -1) {
      //   $scope.twoots.splice(i, 1);
      // }
    });
    //$scope.twoots.push({text:$scope.twootText, done:false});
    $scope.twoots.unshift(newTwoot);
    $scope.twootText = '';
  };
  
 
});