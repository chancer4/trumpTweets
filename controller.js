var twitterApp = angular.module('twitterApp', ['ngRoute']);
var trumpURL = "http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=trump";
var hillaryURL = "http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=clinton"
var exJson = "example.json"

twitterApp.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'select-view.html',
		controller: 'selectPersonCtrl'
	}).
	when('/:personName', {
		templateUrl: 'tweet-view.html',
		controller: 'twitterCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
});

twitterApp.controller('selectPersonCtrl', function ($scope){

});

twitterApp.controller('twitterCtrl', function ($scope, $http){
	$scope.tweetList = [];
	maxNumTweets =  100;
	$scope.getTweets = function(){
		if($routeProvider.personName == "hillary"){
			searchURL = hillaryURL;
		} else{
			searchURL = trumpURL;
		}
		$http.get(searchURL).success(function (tweetData){
			
			var newTweetsList = tweetData.statuses;
			console.log(newTweetsList)
			for(i = 0; i < newTweetsList.length; i++){
				if( !newTweetsList[i].user.profile_banner_url ){
					if( newTweetsList[i].user.default_profile_image ){
						newTweetsList[i].user.profile_banner_url = "assets/images/trump.jpg"
					} else {
						newTweetsList[i].user.profile_banner_url = newTweetsList[i].user.profile_image_url
					}
				}
				if(/^(RT\s)/.test(newTweetsList[i].text)){
					newTweetsList.splice(i,1)
					i--;
				}
			}
			for(i = 0; i < newTweetsList.length; i++){
				for(j = 0; j < $scope.tweetList.length; j++){
					if(newTweetsList[i].id === $scope.tweetList[j].id){
						newTweetsList.splice(i,1)
						i--;
						break;
					}
				}
			}
			//Add new tweets to the list
			$scope.tweetList = newTweetsList.concat($scope.tweetList);
			var tweetLength = $scope.tweetList.length; 
			if (tweetLength > maxNumTweets){
				$scope.tweetList.splice(maxNumTweets, (tweetLength-1))
			}
			
		})
	}
	$scope.getTweets();
	var tweetGetter = setInterval(function(){
		$scope.getTweets();
	}, 30000);
	
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


