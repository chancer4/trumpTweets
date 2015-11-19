var twitterApp = angular.module('twitterApp', ['ngRoute']);

var trumpURL = "https://api.twitter.com/1.1/search/tweets.json?q=%23trump";


twitterApp.controller('twitterCtrl', function ($scope, $ngRoute, $http){
	$scope.tweetList = [];
	maxNumTweets =  100;
	$scope.getTweets = function(){
	$http.get(trumpURL).success(function (tweetData){
		tweetList = tweetData.statuses.results.concat(tweetList);
		var tweetLength = tweetList.length; 
		if tweetLength > maxNumTweets{
			tweetList.splice(maxNumTweets, (tweetLength-1))
		}
	})
	}
});