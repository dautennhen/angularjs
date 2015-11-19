define([], function () {
  var app = angular.module('moduleUsers', ['ngRoute', 'ui.router', 'db', 'moduleBase', 'othermodule', 'oc.lazyLoad']);
  app.provider("moduleUsers", function() {
      var provider = {};
      provider.$get = ['dbAction', function(dbAction) {
          return {
            template : {
              list : "view/listorders.html",
              item : "view/itemorder.html"
            },			
            viewItem : function(obj) {},
            saveItem : function($event) {},
            listItems : function() {},
            deleteItem : function(obj) {}
          }
      }];
      return provider;
  });
  
  app.controller('HomeAController', function ($scope, moduleBase) {
		console.log('HomeController -- goto UsersController -- before -- OrdersController');
   // angular.extend($scope, moduleBase);
		// Set lang here is for all contoller
		// inject moduleBase for this only
	});
  
  app.controller('UsersController', function ($scope, moduleBase) {
		console.log('UserController HomeController -- goto UsersController -- before -- OrdersController');
   // angular.extend($scope, moduleBase);
		// Set lang here is for all contoller
		// inject moduleBase for this only
	});
  
  app.run(function($rootScope, moduleBase){
    
   // moduleBase.changeLanguage('en');
    /* $rootScope.$on('$locationChangeSuccess', function(evt) {
       $bob = $state.is("app.users");
       console.log('$bob',$bob)
       if( $bob ) {
         $('.module').hide();
         $('.module.moduleuser').show();
       }
     });*/
  });
  return app;
});