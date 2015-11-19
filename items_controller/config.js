define([], function () {
  return ['$stateProvider', '$urlRouterProvider', '$logProvider', '$ocLazyLoadProvider', function ( $stateProvider, $urlRouterProvider, $logProvider, $ocLazyLoadProvider) {
    //$urlRouterProvider.otherwise('/home');
    $ocLazyLoadProvider.config({
				loadedModules : ['demo']
			//	asyncLoader : require
		});
    $logProvider.debugEnabled(true);
    var me = this;
    console.log('$log', $stateProvider);
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
      alias : 'home',
      url : 'home',
      parent:'app',
      views : {
        'content@' : {
          templateUrl : 'view/home.html',
          controller : 'HomeController'
        }
      }
    }).state('app.users', {
      alias : 'users',
      url : 'users',
      parent:'app',
      views : {
        'content@' : {
          templateUrl : 'view/users/users.html',
          controller : 'UsersController',
          resolve : {
            load : function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name : 'moduleOrders',
                files : ['modules/moduleUsers.js']
              });
            }
          }
        }
      }
    }).state('app.orders', {
      alias : 'orders',
      url : 'orders',
      parent:'app',
      views : {
        'content@' : {
          templateUrl : 'view/orders/orders.html',
          controller : 'OrdersController',
          resolve : {
            load : function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name : 'moduleOrders',
                files : ['modules/moduleOrders.js']
              });
            }
          }
        }
      }
    }).state('app.orders.item', {
      alias : 'order',
      url : '/:id',
      views : {
        'item@app.orders' : {
          templateUrl : 'view/orders/item.html',
          controller : 'OrderController'
        },
        'new@app.orders' : {
          templateUrl : 'view/orders/new.html',
          controller : 'OrderController'
        },
      }
    }).state('app.items', {
        alias : 'items',
				url : 'items',
				parent : 'app',
        cache : true,
				views : {
					'content@' : {
						templateUrl : 'view/items/items.html',
						controller : 'ItemsController',
            resolve : {
              load : function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name : 'moduleItems',
                  files : ['modules/moduleItems.js']
                });
              }
            }
					}
				}
    }).state('app.items.item', {
      alias : 'item',
      url : '/:id',
      views : {
        'item@app.items' : {
          templateUrl : 'view/items/item.html',
          controller : 'ItemController'
        },
        'newitem@app.items' : {
          templateUrl : 'view/items/new.html',
          controller : 'ItemController'
        }
      }
    })
  }
]
});