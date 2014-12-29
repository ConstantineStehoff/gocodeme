gocodeme
	.factory('Post', post);

function post(Restangular){
	var Post;
	Post = {
		get: function(){
			return Restangular
				.one('posts')
				.getList();
		},
		create: function(data){
			return Restangular
				.one('posts')
				.customPost(data);
		}
	};
	return Post
}