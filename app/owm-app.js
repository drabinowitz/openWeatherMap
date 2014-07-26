angular.module('OWMApp',['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl : './home.html',
			controller : 'HomeCtrl'
		});
	})
	.controller('HomeCtrl',function($scope){

	});