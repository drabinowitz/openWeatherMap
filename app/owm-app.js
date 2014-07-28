angular.module('OWMApp',['ui.router']).
	value('cities',
		[{name : 'New York'},{name : 'Dallas'},{name : 'Chicago'}]).
	config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.otherwise('/home');

		$stateProvider.
		state('home', {
			url : '/home',
			templateUrl : './home.html',
			controller : 'HomeCtrl'
		}).
		state('cities',{
			abstract: true,
			url: '/cities',
			templateUrl : './cities.html'

		}).
		state('cities.city',{
			url: '/:cityName',
			templateUrl : './city.html',
			controller : 'CityCtrl',
			resolve : {
				city : function(cities, $stateParams, $location){
					var inputCity = $stateParams.cityName;
					var checker = false;
					angular.forEach(cities, function(city,key){
						if (city.name == inputCity){
							checker = true;
							return;
						}
					});
					if (checker){
						return inputCity;
					}else{
						$location.path('/error');
						return;
					}
				}
			}
		}).
		state('error',{
			url : '/error',
			template : '<p>Error Page Not Found</p>'
		});
	}).
	run(function($rootScope,$location){
		$rootScope.$on('$routeChangeError',function(){
			$location.path('/error');
		})
	}).
	controller('HomeCtrl',function($scope,cities){
		$scope.cities = cities;
	}).
	controller('CityCtrl',function($scope,city){
		$scope.city = city;
	});