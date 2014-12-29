gocodeme
	.factory('User', user);

function user(Restangular){
	var User;
	User = {
		create: function(user){
			return Restangular
				.one('users')
				.customPOST(user);
		}
	};
	return User;
}	