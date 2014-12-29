angular
	.module('gocodeme')
	.run(runBlock)
	.config(config);
	
runBlock.$inject = ['ngRoute', 'restangular', 'localStorageModule'];

function runBlock($location, Restangular, AuthService){
	Restangular.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
		headers['Authorization'] = 'Basic ' + AuthService.getToken();
		return {
			headers: headers
		};
	});

	Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
		if (response.config.bypassErrorInterceptor) {
			return true;
		} else {
			switch (response.status) {
				case 401:
					AuthService.logout();
					$location.path('/sessions/create');
					break;
				default:
					throw new Error('No handler for status code ' + response.status);
			}
			return false;
		}
	});  
}

function config($routeProvider, RestangularProvider){
	RestangularProvider.setBaseUrl('http://localhost:5000/api/v1');
	var partialsDir = '../views';

	var redirectIfAuthenticated = function(route) {
		return function($location, $q, AuthService){
			var deferred = $q.defer();

			if(AuthService.isAuthenticated()){
				deferred.reject()
				$location.path(route);
			} else {
				deferred.resolve()
			}
			return deferred.promise;
		}
	}

	var redirectIfNotAuthenticated = function(route) {
		return function($location, $q, AuthService) {
 
			var deferred = $q.defer();
 
			if (! AuthService.isAuthenticated()) {
				deferred.reject()
				$location.path(route);
			} else {
				deferred.resolve()
			}
 
			return deferred.promise;
		}
	}
 
	$routeProvider
		.when('/', {
			templateUrl: partialsDir + '/home/detail.html',
			controller: 'HomeDetailCtrl',
			controllerAs: 'vm'
		})
		.when('/sessions/create', {
			templateUrl: partialsDir + '/session/create.html',
			controller: 'SessionCreateCtrl',
			controllerAs: 'vm',
			resolve: {
				redirectIfAuthenticated: redirectIfAuthenticated('/posts/create')
			}
		})
		.when('/sessions/destroy', {
			templateUrl: partialsDir + '/session/destroy.html',
			controller: 'SessionDestroyCtrl',
			controllerAs: 'vm'
		})
		.when('/users/create', {
			templateUrl: partialsDir + '/user/create.html',
			controller: 'UserCreateCtrl',
			controllerAs: 'vm'
		})
		.when('/posts/create', {
			templateUrl: partialsDir + '/post/create.html',
			controller: 'PostCreateCtrl',
			controllerAs: 'vm',
			resolve: {
				redirectIfNotAuthenticated: redirectIfNotAuthenticated('/sessions/create')
			}
		}); 
}
