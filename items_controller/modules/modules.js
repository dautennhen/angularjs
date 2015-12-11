define([], function () {
	var app = angular.module('demo', ['ngRoute', 'ngAria', 'ui.router', 'db', 'moduleBase', 'ngAnimate', 'oc.lazyLoad', 'ngTouch', 'app.config']);
	app.controller('HomeController', function ($scope, moduleBase, $state, $log, $appConfig) {
	  $log.log('HomeController');
    angular.extend($scope, moduleBase);
		// Set lang here is for all contoller
		// inject moduleBase for this only
    
    var getDestModuleState = function(isNext) {
        var modules = ['app.home', 'app.items'];
        var index = _.indexOf(modules, $state.current.name);
        if(isNext)
          return ((index==-1) || (index==(modules.length-1))) ? false : modules[index+1] 
        return (index==-1 || index==0) ? false : modules[index-1] ;
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
      $log.log('haha is here');
    }
    
    $scope.doSth = function() {
      $log.log('ssssssss');
    }
    
    $scope.dbtype = $appConfig.dbtype;
    
	});  
  app.run(function($rootScope, moduleBase, dbAction, installDb, $appConfig, $log, $state){
    moduleBase.changeLanguage('en');
    switch($appConfig.dbtype) {
      case 'indexeddb':
        installDb.install();
      break;
      case 'nodejs_mongodb':
        dbAction.install();
      break;
      case 'websql':
        
      break;
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