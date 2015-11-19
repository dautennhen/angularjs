define([], function () {
  var app = angular.module('moduleItems', ['ngRoute', 'ui.router', 'db', 'moduleBase', 'othermodule', 'oc.lazyLoad']);
  
  app.factory('moduleItemsServices',
    ['dbAction', function(dbAction){
      return function(a){
        param = {url: "a.json"};
        dbAction.doThat(param, function(response) {
            console.log(a, response)
        });
      }
    }]
    /*function(){
      return function(a){
            console.log(response)
        });
      }
    }*/
  );
    
  app.provider("moduleItemsProvider", function() {
      var provider = {};
       provider.$get = ['$window','dbAction', '$state', '$templateCache', '$timeout', '$rootScope', '$stateParams', 
         function($window, dbAction, $state, $templateCache, $timeout, $rootScope, $stateParams) {
          var services =  {
            items : [],
            example : {
              text: 'guest',
              word: /^\s*\w*\s*$/
            },
            init : function($scope) {
              var me = this;
              /*if(this.loaded) {
                //$scope.items = me.items;
                return;
              }
              this.loaded = true;*/
              //param = {url: "data.json"};
              param = {action:"gooParseList", url: "http://localhost:3000"};
              dbAction.doThat(param, function(response) {
                  me.items = response;
                  if(typeof $scope != 'undefined')
                    $scope.items = me.items
                  //console.log(me.items);
              });
            },
            viewItem : function(obj) {
              var id = obj.item._id;
              console.log('id', id);
               /*param = {action:"viewItem", id : obj.item.a, url: "http://localhost:3000"};
               dbAction.doThat(param, function(response) {
                 console.log(response)
                 $scope.item = response[0];
               });*/
               $scope.item = _.find($scope.items, function(item){return item._id == id });
               console.log($scope.item);
            },
            addItem : function($event) {
              var me = this;
              console.log('moduleItems saveItem');
              var $obj = $($event.target).parents('tr');
              data = {
                price : $obj.find('[name="itemprice"]').val(),
                name : $obj.find('[name="itemname"]').val(),
                currency : $obj.find('[name="itemcurrency"]').val(),
              }
              param = {action:"gooAddItem", url: "http://localhost:3000"};
              $.extend(param,data);
              console.log(data);
              console.log('sssssss-----',param);
              dbAction.doThat(param, function(response) {
                 //console.log(response);
                 //if(response.returnVale)
                  me.items.push(response);
               });
              //this.successSaveItem()
            },
            
            deleteItem : function($scope, obj) { 
              return function(obj){
                var me = this;
                var items = this.items;
                param = {action:"gooDeleteItem", name : obj.item.name, url: "http://localhost:3000"};
                var item = _.findWhere(items, {name: obj.item.name});
                dbAction.doThat(param, function(response) {
                   // console.log( response );
                    if(typeof response.deleted!='undefined') {
                      var item = _.findWhere(items, {name: obj.item.name});
                      items = _.without(items, item);
                      $timeout(function() {
                        $scope.$apply(function(){
                          //
                          me.items = items;
                          $scope.items = items;
                          //console.log('me.items', $scope.items);
                        })
                      }, 20);
                    }
                 });
              }
            },
            insertDummyData : function(obj) { 
               param = {action:"addDummyData", url: "http://localhost:3000"};
               dbAction.dummyData(param, function(response) {
                  console.log(response);
               });
            },
            addFields : function($event, field) { 
              $(field).find('input.itemname').val('');
              $(field).find('input.itemprice').val('');
              $(field).show();
              $($event.target).hide();
              return;
              var $field = $(field).last().clone();
              $field.show();
              $(field).last().after($field);
              $($event.target).hide();
            },
            successSaveItem : function() {
              $('.view_newitem .fieldparam').hide(); 
              $('.view_newitem .addnew').show();
              var me = this;
              //$window.setTimeout(function(){
                param = {url: "a.json"};
                dbAction.doThat(param, function(response) {                  
                    me.items.push(response);
                });
              //}, 1000);
            }
          }
          return services;
      }];
      return provider;
  });
  
  
	app.controller('ItemsController', function ($rootScope, $scope, dbAction, moduleBase, othermodulevalue, $stateParams, $timeout, $templateCache, moduleItemsProvider) {
		//console.log('moduleBase value', moduleBase.lang);
    //console.log(thisvalue, othermodulevalue);
		// inheritance moduleItems provider
    //initializeItems($scope, moduleItemsProvider);
    //if(typeof $scope.deleteItem == 'undefined') {
      angular.extend($scope, moduleItemsProvider);
   //   console.log('re --------------', moduleItemsProvider.items);
    //}
    
     //$scope.deleteItem = moduleItemsProvider.deleteItem($scope, '');
    
    //moduleItemsProvider.init($scope);
    //console.log(moduleItemsServices);
    //moduleItemsServices('khakha services');
    //$scope.init($scope)
    //$scope.$digest();
    //$scope.$apply();
     $scope.$watch('items', function( newValue, oldValue ){
       //$scope.items = moduleItemsProvider.items
       console.log('$scope.items---', $scope.items)
     }, true);
  
    //$scope.deleteItem = moduleItemsProvider.deleteItem($scope)
    $scope.deleteItem = function(obj) { 
      var items = $scope.items;
      param = {action:"gooDeleteItem", name : obj.item.name, url: "http://localhost:3000"};
      var item = _.findWhere(items, {name: obj.item.name});
      dbAction.doThat(param, function(response) {
          console.log( response );
          if(typeof response.deleted!='undefined') {
            var item = _.findWhere(items, {name: obj.item.name});
            items = _.without(items, item);
            $timeout(function() {
              $scope.$apply(function(){
                $scope.items = items;
                moduleItemsProvider.items = items;
                //console.log('me.items', $scope.items);
              })
            }, 20);  
         }
      });
    } 
	});

  var ItemController = function($scope, $stateParams) {
    console.log('ItemController', $stateParams);
		$scope.item = _.find($scope.items, function (item) {
			return item._id == $stateParams.id
		});
  }
  ItemController.$inject = ['$scope', '$stateParams'];
  app.controller('ItemController', ItemController);
    // Or
	 // Controller Inheritance
	// app.controller('ItemController', function ($scope, $stateParams) { ... });
  
   app.run(function( $rootScope, moduleBase, moduleItemsProvider){
    //moduleBase.changeLanguage('en');
    moduleItemsProvider.init();
    /* $rootScope.$on('$locationChangeSuccess', function(evt) {
       $('.module').hide();
       $('.module.moduledemo').show();
     });*/
  });
  app.run(function($window, moduleBase, $rootScope, $timeout, moduleItemsProvider){
    moduleItemsProvider.init();
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        moduleBase.changeLanguage($window.applang);
    })
  })
  
  return app;
});