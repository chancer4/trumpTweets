var twitterApp = angular.module('twitterApp', []);
// 'ngRoute'
var trumpURL = "http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=trump&secondHash=women";
var exJson = "example.json"
// , $ngRoute
twitterApp.controller('twitterCtrl', function ($scope, $http){
	$scope.tweetList = [];
	maxNumTweets =  100;
	$scope.getTweets = function(){
		$http.get(trumpURL).success(function (tweetData){
			console.log(tweetData);
			$scope.tweetList = tweetData.statuses.concat($scope.tweetList);
			var tweetLength = $scope.tweetList.length; 
			if (tweetLength > maxNumTweets){
				$scope.tweetList.splice(maxNumTweets, (tweetLength-1))
			}
		})
	}

	$scope.getTweets();
	
});


