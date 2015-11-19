define([], function () {
  return ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    //$urlRouterProvider.otherwise('/home');
    $ocLazyLoadProvider.config({
				loadedModules : ['home']
			//	asyncLoader : require
		});
    $stateProvider.state('app', {
      url : '/',
      views : {
        'header' : {
          templateUrl : 'view/header.html',
          controller : 'HomeController'
        },
        'content' : {
          template : ''
        }/*,
        'footer' : {
          templateUrl : 'view/footer.html',
          controller : 'HomeController'
        }*/
      }
    }).state('app.home', {
      url : 'home',
      parent:'app',
      views : {
        'header@' : {
          template : '<div><span ng-click="changeLanguage(\'en\')"> en </span> | <span ng-click="changeLanguage(\'de\')"> de </span></div>',
          controller : 'HomeController'
        },
        'content@' : {
          templateUrl : 'view/home.html',
          controller : 'HomeController'
        }/*,
        'footer@' : {
          template : ''
        }*/
      }
    }).state('app.items', {
      url : 'items',
     /* parent:'app',
      cache: true,
      views : {
        'content@' : {
          templateUrl : 'view/items/items.html',
          controller : 'ItemsController'
        }
      }*/
    })/*.state('app.items.newitem', {
      //url : '/{id:[0-9]{1,4}}',
      url : '/newitem',
      views : {
        'newitem@app.items':{
          templateUrl : 'view/newitem.html',
          controller : 'ItemController'
        },
      }
    })*/.state('app.items.item', {
      //url : '/{id:[0-9]{1,4}}',
      url : '/:id',
     /* views : {
        'item@app.items':{
          templateUrl : 'view/items/item.html',
          controller : 'ItemController'
        },
        'newitem@app.items':{
          templateUrl : 'view/items/new.html',
          controller : function(){
           return 'ItemController'; 
          }
        },
      }*/
    }).state('app.users', {
      url : 'users',
      /*parent:'app',
      views : {
        'content@' : {
          //templateUrl : 'view/users.html',
          controller : 'UsersController',
          resolve : {
            load : function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name : 'module3',
                files : ['modules/module3.js']
              });
            }
          }
        }
      }*/
    }).state('app.orders', {
      url : 'orders',
      parent:'app',
      views : {
        /*'content@' : {
          templateUrl : 'view/orders/orders.html',
          controller : 'OrdersController'
        }*/
      }
    })
  }
]
});