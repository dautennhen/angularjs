define([], function () {
	var app = angular.module('demo', ['ngRoute', 'ngAria', 'ui.router', 'db',  'moduleBase', 'ngAnimate', 'oc.lazyLoad']);
	app.controller('HomeController', function ($scope, moduleBase) {
	console.log('HomeController');
    angular.extend($scope, moduleBase);
		// Set lang here is for all contoller
		// inject moduleBase for this only
    $scope.gotoNext = function(){
      console.log('gotoNext');
    }
    $scope.gotoPrevious = function(){
      console.log('gotoPrevious');
    }
    $scope.haha = function(){
      console.log('haha is here');
    }
    
    $scope.doSth = function() {
      console.log('ssssssss');
    }
    
	});  
  app.run(function($rootScope, moduleBase, dbAction, installDb, $appConfig, $log, $state){
    moduleBase.changeLanguage('en');
    if($appConfig.dbtype=='indexeddb') {
      installDb.install();
    } else {
      //dbAction.install(); 
    }
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.log(toState, toParams, fromState, fromParams)
      //$scope.callbackState = fromState.name
       if (toState.name !== 'app.home' && !moduleBase.authenticaded()) {
          event.preventDefault();
          $state.go('app.home');
        }
    })
  });
  return app;
});