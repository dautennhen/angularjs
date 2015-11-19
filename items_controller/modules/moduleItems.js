
     var initializeItems = function($window, $scope, moduleItems){
      //angular.extend($scope, moduleItemsProvider);
      //if(typeof $window.loadedItems == 'undefined') {
          $window.loadedItems = true;
          $scope.items = moduleItems.init($scope);
          console.log('re --------------');
      //}
    }
    
 angular.module('moduleItems', ['ngRoute', 'ui.router', 'db', 'moduleBase', 'moduleTable']);
 angular.module('moduleItems').controller('ItemsController', function ($log, $scope, dbAction, moduleItems, $stateParams, $timeout, $routeParams, $window, moduleTable) {
		console.log($stateParams, $routeParams);
		// inheritance moduleItems provider
		//angular.extend($scope, moduleItems);
    //$scope.successSaveItem
		//$scope.returnvalue = 0;
		//$scope.item = $stateParams;
		//$scope.lang = moduleBase.get();
    /*$scope.deleteItem = function(obj) { 
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
                moduleItems.items = items;
                //console.log('me.items', $scope.items);
              })
            }, 20);  
         }
      });
    } */
    //moduleItems.init($scope);
    //$scope.items = moduleItems.init($scope);
   
    //    $scope.items = [];
        $scope.example = {
          text: 'guest',
          word: /^\s*\w*\s*$/
        }
        
        $scope.init = function() {
          //var me = this;
          //param = {url: "data.json"};
          param = {action:"gooParseList", url: "http://localhost:3000"};
          dbAction.doThat(param, function(response) {
             // me.items = response;
              if(typeof $scope != 'undefined')
                $scope.items = response
              //console.log(me.items);
          });
        }
        
        initializeItems($window, $scope, moduleItems)
        
        //$log.log($scope.loadPage);
        
        moduleTable.paging($scope);
       // $scope.loadPage = moduleTable.loadPage($scope);
        $scope.loadPage = function(obj) {
          var start = $(obj.target).data('start');
          //$log.debug(start);
          moduleTable.loadPage($scope, start)
        }
        
        
        $scope.viewItem = function(obj) {
          var id = obj.item._id;
         // console.log('id', id);
           /*param = {action:"viewItem", id : obj.item.a, url: "http://localhost:3000"};
           dbAction.doThat(param, function(response) {
             console.log(response)
             $scope.item = response[0];
           });*/
           $scope.item = _.find($scope.items, function(item){return item._id == id });
          // console.log($scope.item);
           
           
           
        }
        
        $scope.addItem = function($event) {
          //var me = this;
         // console.log('moduleItems saveItem');
          var $obj = $($event.target).parents('tr');
          //console.log('-------',$event.target)
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
              //me.items.push(response);
            $scope.items.push(response);
           });
          //this.successSaveItem()
        }
        
        //$scope.deleteItem = function($scope, obj) { 
        $scope.deleteItem = function(obj) { 
          //return function(obj){
            //var me = this;
            var items = $scope.items;
            param = {action:"gooDeleteItem", name : obj.item.name, url: "http://localhost:3000"};
            var item = _.findWhere(items, {name: obj.item.name});
            dbAction.doThat(param, function(response) {
               // console.log( response );
                if(typeof response.deleted!='undefined') {
                  var item = _.findWhere(items, {name: obj.item.name});
                  items = _.without(items, item);
                  $timeout(function() {
                    $scope.$apply(function(){
                     // me.items = items;
                      $scope.items = items;
                      //console.log('me.items', $scope.items);
                    })
                  }, 20);
                }
             });
          //}
        }
        
        $scope.insertDummyData = function(obj) { 
           param = {action:"addDummyData", url: "http://localhost:3000"};
           dbAction.dummyData(param, function(response) {
              console.log(response);
           });
        }
        
        $scope.addFields = function($event, field) { 
          $(field).find('input.itemname').val('');
          $(field).find('input.itemprice').val('');
          $(field).show();
          $($event.target).hide();
          return;
          var $field = $(field).last().clone();
          $field.show();
          $(field).last().after($field);
          $($event.target).hide();
        }
        
        $scope.successSaveItem = function() {
          $('.view_newitem .fieldparam').hide(); 
          $('.view_newitem .addnew').show();
          //var me = this;
          //$window.setTimeout(function(){
            param = {url: "a.json"};
            dbAction.doThat(param, function(response) {                  
              //  me.items.push(response);
            });
          //}, 1000);
        }
	});

	// Controller Inheritance
	angular.module('moduleItems').controller('ItemController', function ($scope, $stateParams, $log, $timeout) {
	//	console.log('ItemController', $stateParams);
  //initializeItems($window, $scope, moduleItems)
		var id = $stateParams.id;
		$scope.item = _.find($scope.items, function (item) {
			return item._id == id
		});
     $timeout(function(){
      $('[data-id="item'+id+'"]').show();       
     }, 20)
     
     $scope.closeMe = function($event) {
       //console.log($($event))
       $($event.target).parent().hide();
     }
		// console.log($scope.item);
	});
  
angular.module('moduleItems').provider("moduleItems", function() {
  var provider = {};
   provider.$get = ['$window','dbAction', '$state', '$templateCache', '$timeout', '$rootScope', '$stateParams', 
     function($window, dbAction, $state, $templateCache, $timeout, $rootScope, $stateParams) {
      var services =  {
        init : function($scope) {
          //var me = this;
          /*if(this.loaded) {
            //$scope.items = me.items;
            return;
          }
          this.loaded = true;*/
          //param = {url: "data.json"};
          param = {action:"gooParseList", url: "http://localhost:3000"};
          dbAction.doThat(param, function(response) {
             // me.items = response;
             //if(typeof $scope != 'undefined')
                $scope.items = response
              //console.log(me.items);
          });
        }
      }
      return services;
  }];
  return provider;
});
angular.module('moduleItems').run(function(){
  
})
//---------------------------------------------------------------------------


  