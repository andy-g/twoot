function TwootCtrl($scope) {
  $scope.twoots = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];
 
  $scope.addTwoot = function() {
    $scope.twoots.push({text:$scope.twootText, done:false});
    $scope.twootText = '';
  };
  
  $scope.validateTwoot = function() {
    //$scope.twoots.push({text:$scope.twootText, done:false});
    //$scope.twootText = '';
    //140 - len($scope.twootText);
    //$scope.twootText = '';
    //$scope.twootTextChars = 140 - $scope.twootText.length();
    
    // var text = $scope.twootText;
    // console.log('running validateTwoot...')
    // if (text.length > 140){
    //   //document.getElementById('twoot-box').innerHTML()
    //   $scope.twootText = [text.slice(0, 140), "<strong>", text.slice(140), "</strong>"].join('');
    // }
    //$scope.twootText = document.getElementById('twoot-box').innerText;
    
    //console.log('twoot-box: '+getCaretCharacterOffsetWithin(document.getElementById('twoot-box')));
    //$scope.invalid = ($scope.twootText.length <= 140);
    //console.log($scope.invalid);
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
}


angular.module('twoot', []).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // view -> model
      elm.on('keypress keyup blur', update);
      // elm.on('keyup', update);
      // elm.on('blur', update);

      function update() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.text());

          //console.log('twoot-box: '+getCaretCharacterOffsetWithin(document.getElementById('twoot-box')));

          // var temp = elm.text();
          // elm.html([temp.slice(0, 140), "<strong>", temp.slice(140), "</strong>"].join(''));
          // console.log('twoot-box: '+getCaretCharacterOffsetWithin(document.getElementById('twoot-box')));
          // ctrl.$setViewValue(temp);
        });
      }
 
      // model -> view
      ctrl.$render = function() {
        elm.html(ctrl.$viewValue);
      };
 
      // load init value from DOM
      ctrl.$setViewValue(elm.text());
    }
  };
});


