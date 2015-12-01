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
          templateUrl : function(){return 'modules/users/view/users.html'},
          controller : 'UsersController',
          resolve : {
            load : function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name : 'moduleOrders',
                files : ['modules/users/moduleUsers.js']
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
          templateUrl : 'modules/orders/view/orders.html',//'view/orders/orders.html',
          controller : 'OrdersController',
          resolve : {
            load : function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name : 'moduleOrders',
                files : ['modules/orders/moduleOrders.js']
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
          templateUrl : 'modules/orders/view/item.html',
          controller : 'OrderController'
        },
        'new@app.orders' : {
          templateUrl : 'modules/orders/view/new.html',
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
						templateUrl : 'modules/items/view/items.html',
						controller : 'ItemsController',
            resolve : {
              load : function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name : 'moduleItems',
                  files : ['modules/items/moduleItems.js']
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
          templateUrl : 'modules/items/view/item.html',
          controller : 'ItemController'
        },
        'newitem@app.items' : {
          templateUrl : 'modules/items/view/new.html',
          controller : 'ItemController'
        }
      }
    })
  }
]
});