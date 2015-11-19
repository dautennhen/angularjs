define([], function () {
	var app = angular.module('home', ['ngRoute', 'ui.router', 'db', 'moduleBase', 'othermodule', 'oc.lazyLoad']);
  app.value('thisvalue','thisvalueValue');
  /*
  var initializeItems = _.once(function($scope, moduleItemsProvider){
    angular.extend($scope, moduleItemsProvider);
    console.log('re --------------', moduleItemsProvider.items);
  });
  */

	app.controller('HomeController', function ($scope, moduleBase) {
		console.log('HomeController -- goto UsersController -- before -- OrdersController');
    //$scope.changeLanguage = moduleBase.changeLanguage;
    angular.extend($scope, moduleBase);
		// Set lang here is for all contoller
		// inject moduleBase for this only
	});

  
	//app.controller('UsersController', function ($scope, dbAction, moduleUsers, module3value, $ocLazyLoad, $stateParams) {
    app.controller('UsersController', function ($scope, dbAction, module3value, $ocLazyLoad, $stateParams) {
      /*console.log('UsersController');
      // Loaded from config
      console.log('module3value---lazy load --- ', module3value);
      // load a file
      $ocLazyLoad.load('modules/module3controller.js', function(){
        console.log('should have this feature----but not');
      });
      //angular.extend($scope, moduleUsers);*/
	});
  
  app.run(function($rootScope,moduleBase, $window){//, moduleItemsProvider){
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //$scope.callbackState = fromState.name
        //moduleBase.changeLanguage($window.applang);
        //console.log('9999 9999',toState);
        $('.module').hide();
        $('.module.home, .module.'+toState.url).show();
        
    })
    
   // $window.applang = 'de';
    /* moduleBase.loadFile('language/en.js', function(content){
      $timeout(function(){
        $rootScope.lang = content;
        console.log('content',content);
      }, 0)
    })*/
    //moduleBase.changeLanguage('en');
    //moduleItemsProvider.init();
    /* $rootScope.$on('$locationChangeSuccess', function(evt) {
       $('.module').hide();
       $('.module.moduledemo').show();
     });*/
  });
  
	return app;
});