define([], function () {
	var app = angular.module('demo', ['ngRoute', 'ngAria', 'ui.router', 'db',  'moduleBase', 'ngAnimate', 'oc.lazyLoad','ngTouch']);
	app.controller('HomeController', function ($scope, moduleBase, $state) {
	console.log('HomeController');
    angular.extend($scope, moduleBase);
		// Set lang here is for all contoller
		// inject moduleBase for this only
    
    var getDestModuleState = function(isNext) {
        var modules = ['app.home', 'app.items'];
        var index = _.indexOf(modules, $state.current.name);
        if(isNext){
          if((index==-1) || (index==(modules.length-1)))
            return false;
          return modules[index+1];
        }
        if(index==-1 || index==0)
          return false;
        return modules[index-1];
    }
    $scope.gotoNext = function(){
      var state = getDestModuleState(true);
      if(state)
        $state.go(state)
    }
    $scope.gotoPrevious = function(){
      var state = getDestModuleState(false);
      if(state)
        $state.go(state);
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