angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $interval) {
  this.scope = $scope;
  this.getStatus = function() {
    this.machineStatus = [];
    this.headers = {
      'Content-Type' : 'application/json'
    };
    this.url = "https://webhookapitest.azurewebsites.net/api/SLMobileApp?code=dUmQG3ZAd7hhF/XHkpGOXuhBKx48uTIhKZ/NVN6PsgrHkGOu4gBL6Q==";
    let payload = {
      "machine" : "Washer001"
    };
    $http({
      method: 'POST',
      url: this['url'],
      data: payload,
      headers: this['headers']
    }).then(function(response) {
      console.log(response);
      this.machineStatus.push(response.data);
      if(response.data.machinestatus) {
        $('.washercontainer').removeClass('free');
        $('.washercontainer').addClass('taken');
      }
      else {
        $('.washercontainer').removeClass('taken');
        $('.washercontainer').addClass('free');
      }
      let payload = {
        "machine" : "Dryer001"
      };
      $http({
        method: 'POST',
        url: this['url'],
        data: payload,
        headers: this['headers']
      }).then(function(response) {
        console.log(response);
        if(response.data.machinestatus) {
           $('.dryercontainer').removeClass('free');
           $('.dryercontainer').addClass('taken');
        }
        else {
          $('.dryercontainer').removeClass('taken');
           $('.dryercontainer').addClass('free');
        }
        this.machineStatus.push(response.data);
      }.bind(this));
    }.bind(this));
  };

  setInterval(this.getStatus, 5000);
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
