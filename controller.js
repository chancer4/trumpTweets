var twitterApp = angular.module('twitterApp', ['ngRoute']);

var URL = “https://api.twitter.com/1.1/search/tweets.json?q=%23trump”;


twitterApp.controller('twitterCtrl', function ($scope, $ngRoute, $http){
	$http.get()

})