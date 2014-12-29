gocodeme
	.factory('AuthService', AuthService);

function AuthService($q, localStorageService, Session){
	return {
		login: function(credentials){
			var me = this;
			deferred = $q.defer();
			Session.create(credentials, true).then(function(user){
				me.setToken(credentials);
				return deferred.resolve(user);
			}, function(response) {
				if(response.status == 401){
					return deferred.reject(false);
				}
				throw new Error('No handler for status code ' + response.status);
			});
			return deferred.promise;
		};
	};

	return {
		logout: function(){
			localStorageService.clearAll();
		}
	};

	return {
		isAuthenticated: function(){
			var token = this.getToken();
			if(token){
				return true;
			}
			return false;
		}
	};

	return {
		setToken: function(credentials){
			localStorageService.set('token', btoa(credentials.email + ':' + credentials.password));
		}
	};

	return {
		getToken: function(){
			return localStorageService.get('token');
		}
	};
}	