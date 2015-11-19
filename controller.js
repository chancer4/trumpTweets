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
			for(i = 0; i < tweetData.statuses.length; i++){
				if(!tweetData.statuses[i].user.profile_banner_url){
					tweetData.statuses[i].user.profile_banner_url = "assets/images/trump.jpg"
				}
			}
			console.log(tweetData.statuses)
			$scope.tweetList = tweetData.statuses.concat($scope.tweetList);
			var tweetLength = $scope.tweetList.length; 
			if (tweetLength > maxNumTweets){
				$scope.tweetList.splice(maxNumTweets, (tweetLength-1))
			}
		})
	}

	$scope.getTweets();
	
});

twitterApp.directive('backgroundImageDirective', function () {
   return function (scope, element, attrs) {
       element.css({
       		'background': 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(' + attrs.backgroundImageDirective + ')',
           	'background-repeat': 'no-repeat',
           	'background-size': 'cover'
       });
   };
});


