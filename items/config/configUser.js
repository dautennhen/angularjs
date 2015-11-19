define([], function () {
	return ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
			$ocLazyLoadProvider.config({
				loadedModules : ['moduleUsers']
			});
			$stateProvider.state('app', {
				url : '/',
				views : {}

			}).state('app.home', {
				url : 'home',
				parent : 'app',
				views : {}

			}).state('app.users', {
				url : 'users',
				parent : 'app',
				views : {
					'content@' : {
						templateUrl : 'view/users/users.html',
						controller : 'UsersController',
					}
				}
			})
		}
	]
});
