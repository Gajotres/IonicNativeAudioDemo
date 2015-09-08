var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('AudioController', function($scope, $ionicPlatform) {

  var audio = [{
    id: 1,
    key: 'master',
    title: "The Master",
    track: 'audio/The_Master.mp3',
    genre: "This will be card Description"
  }, {
    id: 2,
    key: 'give',
    title: "Give",
    track: 'audio/Give.mp3',
    genre: "Alternative & Punk | Bright"
  }, {
    id: 3,
    key: 'morning',
    title: "Morning Stroll",
    track: 'audio/Morning_Stroll.mp3',
    genre: "Classical | Happy"
  }, ];

  $scope.audioTracks = Array.prototype.slice.call(audio, 0);

  $scope.player = {
    key: '' // Holds a last active track
  }

  $ionicPlatform.ready(function() {

    $scope.playTrack = function(track, key) {
      // Preload an audio track before we play it
      window.plugins.NativeAudio.preloadComplex(key, track, 1, 1, 0, function(msg) {
        // If this is not a first playback stop and unload previous audio track
        if ($scope.player.key.length > 0) {
          window.plugins.NativeAudio.stop($scope.player.key); // Stop audio track
          window.plugins.NativeAudio.unload($scope.player.key); // Unload audio track
        }

        window.plugins.NativeAudio.play(key); // Play audio track
        $scope.player.key = key; // Set a current audio track so we can close it if needed 
      }, function(msg) {
        console.log('error: ' + msg); // Loading error
      });
    };

    $scope.stopTrack = function() {
        // If this is not a first playback stop and unload previous audio track
        if ($scope.player.key.length > 0) {
          window.plugins.NativeAudio.stop($scope.player.key); // Stop audio track
          window.plugins.NativeAudio.unload($scope.player.key); // Unload audio track
          $scope.player.key = '';
        }
    };
  });
});