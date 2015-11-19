define([], function () {
	return ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/home');
			$stateProvider.state('app', {
				url : '/',
				views : {
					'header' : {
						templateUrl : 'view/header.html',
						controller : 'HomeController'
					},
					'content' : {
						templateUrl : 'view/content.html'
					},
					'footer' : {
						templateUrl : 'view/footer.html',
						controller : 'HomeController'
					}
				}
			}).state('app.home', {
				url : 'home',
				parent : 'app',
				views : {
					'header@' : {
						template : '<div><span ng-click="changeLanguage(\'en\')"> en </span> | <span ng-click="changeLanguage(\'de\')"> de </span></div>',
						controller : 'HomeController'
					},
					'content@' : {
						templateUrl : 'view/home.html',
						controller : 'HomeController'
					},
					'footer@' : {
						template : ''
					}
				}
			}).state('app.items', {
				url : 'items',
				parent : 'app',
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
						controller : 'ItemController'
					},
				}
			})
		}
	]
});
