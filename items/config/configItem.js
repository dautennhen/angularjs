define([], function () {
	return ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
			$ocLazyLoadProvider.config({
				loadedModules : ['moduleItems']
			});
			$stateProvider.state('app', {
				url : '/',
				views : {}

			}).state('app.home', {
				url : 'home',
				parent : 'app',
				views : {}

			}).state('app.items', {
				url : 'items',
				parent : 'app',
				cache : true,
				views : {
					'content@' : {
						templateUrl : 'view/items/items.html',
						controller : 'ItemsController'
					}
				}
			}).state('app.items.item', {
				url : '/:id',
				views : {
					'item@app.items' : {
						templateUrl : 'view/items/item.html',
						controller : 'ItemController'
					},
					'newitem@app.items' : {
						templateUrl : 'view/items/new.html',
						controller : function () {
							return 'ItemController';
						}
					},
				}
			})
		}
	]
});
