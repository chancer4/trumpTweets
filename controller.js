var twitterApp = angular.module('twitterApp', []);
// 'ngRoute'
var trumpURL = "https://api.twitter.com/1.1/search/tweets.json?q=%23trump";
var exJson = "example.json"
// , $ngRoute
twitterApp.controller('twitterCtrl', function ($scope, $http){
	$scope.tweetList = [];
	maxNumTweets =  100;
	$scope.getTweets = function(){
		$http.get(exJson).success(function (tweetData){
			tweetList = tweetData.statuses.results.concat(tweetList);
			var tweetLength = tweetList.length; 
			if (tweetLength > maxNumTweets){
				tweetList.splice(maxNumTweets, (tweetLength-1))
			}
		})
	}
});