define([], function () {
  var app = angular.module('moduleOrders',  ['ngRoute', 'ui.router', 'db', 'moduleBase', 'oc.lazyLoad']);
  app.provider("moduleOrders", function() {
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
  
	app.controller('OrdersController', function ($rootScope, $scope, dbAction, $stateParams, $ocLazyLoad, moduleBase) {
		console.log('OrdersController from orderM');
		//angular.extend($scope, moduleOrders);
    // kid, loaded in UsersController - module3controller
    //kid.doSth();
		//console.log($scope.item);
	});
  
  app.controller('HomeAController', function ($scope) {
		console.log('HomeController -- goto UsersController -- before -- OrdersController');
   // angular.extend($scope, moduleBase);
		// Set lang here is for all contoller
		// inject moduleBase for this only
	});
  
  app.run(function($rootScope, $timeout){
   //moduleBase.changeLanguage('en');
  })
  return app;
});