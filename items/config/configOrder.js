define([], function () {
	return ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
			$ocLazyLoadProvider.config({
				loadedModules : ['moduleOrders']
			});
			$stateProvider.state('app', {
				url : '/',
				views : {}
			}).state('app.home', {
				url : 'home',
				parent : 'app',
				views : {}
			}).state('app.orders', {
				url : 'orders',
				parent : 'app',
				views : {
					'content@' : {
						templateUrl : 'view/orders/orders.html',
						controller : 'OrdersController'
					}
				}
			})
		}
	]
});
