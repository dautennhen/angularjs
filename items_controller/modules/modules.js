define([], function () {
	var app = angular.module('demo', ['ngRoute', , 'ngAria', 'ui.router', 'db',  'moduleBase', 'ngAnimate', 'oc.lazyLoad']);
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
  app.run(function(moduleBase, dbAction){
    moduleBase.changeLanguage('en');
	dbAction.initDb();
	dbAction.install();
	//dbAction.excuteQuery('create table huhu(id INTERGER, desc text)');
  });
	return app;
});