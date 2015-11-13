angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LoginCtrl', function($scope, auth, $state, store, UserService) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $state.go('app.account');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();


})
.controller('VideoCtrl', function($scope, $cordovaCapture, VideoService, uploadVideo) {
  $scope.clip = '';
  $scope.test = uploadVideo.get();
  $scope.captureVideo = function() {
    $cordovaCapture.captureVideo().then(function(videoData) {
      VideoService.saveVideo(videoData).success(function(data) {
        $scope.clip = data;
        $scope.$apply();
      }).error(function(data) {
        console.log('ERROR: ' + data);
      });
    });
  }

  // $scope.urlForClipThumb = function(clipUrl) {
  //  var name = clipUrl.substr(clipUrl.lastIndexOf('/') + 1);
  //  var trueOrigin = cordova.file.dataDirectory + name;
  //  var sliced = trueOrigin.slice(0, -4);
  //  return sliced + '.png';
  // }

  // $scope.showClip = function(clip) {
  //  console.log('show clip: ' + clip);
  // }
})
.controller('CaptureCtrl', function($cordovaCapture, $resource){
  $scope.captureVideo = function(){
    var options = { limit: 10, duration: 500 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {

    }, function(err) {

    });
  }
})
.controller('AccountCtrl', function($scope, auth, UserService) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.auth = auth;
  UserService.datacopy(auth.profile)
  $scope.userinfo = function($scope, $resource) {
    var ui = $resource('http://6c1d1e56.ngrok.io/users/:userId', {userId: '@id'});
    $scope.demo_user = ui.get({userId:"35"})
    return user
  }

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Research', 'Usage'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
})
.controller('DashCtrl', function($scope, $http) {
  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://auth0-nodejsapi-sample.herokuapp.com/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function() {
      alert("Please download the API seed so that you can call it.");
    });
  };

})
