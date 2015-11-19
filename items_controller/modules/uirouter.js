//(function (angular) {
  
  angular.module('phonecatFilters', []).filter('checkmark', function () {
		return function (input) {
			console.log(input);
			return input ? '\u2713' : '\u2718';
		};
	});
	
  var phonecatServices = angular.module('phonecatServices',[]);
	phonecatServices.factory('Phone', ['$resource', function ($resource) {
    
				//return $resource('./:phoneId.json', {}, {
         this.abc = function() {
          console.log('abc done');
         
         // $http.post('abc.php', {msg:'hello word!'}).then(function(response) {}, function(response) {/*error*/});
         }
         
			}
		]);
   
	var phonecatApp = angular.module('phonecatApp', [ 'phonecatControllers', 'phonecatFilters', 'phonecatServices']);
  phonecatApp.value('hihi', 'hihi value');
  
  phonecatApp.provider("dbAction", function() {
      var provider = {};
      provider.$get = ['$http', function($http) {
          var service = {
            doThat : function(param, callback) {
              param = { method: 'POST', url: param.url, data: $.param(param), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
              $http(param).then(function(response) {
                if(typeof callback=='function') callback(response.data)
              }, function(response) {console.log('error')});
            },
            dummyData : function(param) {
              param = { method: 'POST', url: param.url, data: $.param(param), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
              $http(param).then(function(response) { console.log(response) }, function(response) {console.log('error')})
            }
          }
          return service;
      }];
      return provider;
      /*
       return {
          list: function(){
              return books;
          },
          find: function(id){
              return _.find(books, function(book){return book.id == id});
          }
      };
      */
  });
  
	var phonecatControllers = angular.module('phonecatControllers', []);
	phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', function ($scope, Phone) {
				$scope.category = Phone.query();
			}
		]);
	phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
				$scope.phoneId = $routeParams.phoneId;
				console.log('$routeParams', $routeParams);
				$scope.category = {
					name : 'haha',
					desc : 'hihi'
				}
			}
		]);
  
  //-------------------------------------------------------------------
  var othermodule = angular.module('othermodule', []);
  othermodule.value('aaa', 'hahaha');
 
	var app = angular.module('demo', ['ngRoute','ui.router', 'phonecatApp','othermodule']);
   //http://localhost/js/test/demo_angular/uirouter.html#/dashboard
  // Inject "dbAction" services, "hihi" value of phonecatApp module
	app.controller('DashboardController',  function($scope, dbAction, hihi, aaa,  $stateParams) {
    console.log($stateParams);
        $scope.returnvalue = 0;
        $scope.item = $stateParams;
        
			/*	$scope.template = {
          list : "view/uirouter/list.html",
          item : "view/uirouter/item.html"
        };*/
      //   $scope.items = [{"_id":"55d2bbd1cb639f301d90ed61","a":5},{"_id":"55d2bbd1cb639f301d90ed62","a":7},{"_id":"55d2bbd1cb639f301d90ed63","a":9},{"_id":"55d464bd7fac9c941d0b08b2","a":"abc"},{"_id":"55d464bd7fac9c941d0b08b3","a":"abc","b":"def"},{"_id":"55d464bd7fac9c941d0b08b4","a":"query","b":"uiop"}]
        
        
        $scope.listItems = function() {
         param = {action:"parse", url: "http://localhost:3000"};
         dbAction.doThat(param, function(response){
             $scope.items = response;
         });
         console.log(hihi);
         //console.log('aaa', app);
				//othermodule.value('aaa', 'aaa-value')
        }
        
        $scope.viewItem = function(obj) {
          var id = obj.item._id;
          console.log('id', id);
           /*param = {action:"viewItem", id : obj.item.a, url: "http://localhost:3000"};
           dbAction.doThat(param, function(response) {
             console.log(response)
             $scope.item = response[0];
           });*/
           $scope.item = _.find($scope.items, function(item){return item._id == id });
           console.log($scope.item);
        }
        
        $scope.deleteItem = function(obj) { 
           param = {action:"deleteItem", id : obj.item.a, url: "http://localhost:3000"};
           dbAction.doThat(param, function(response) {
              console.log( response );
              if(typeof response.deleted!='undefined') {
                $('[data-id="'+obj.item._id+'"]').parent().remove();
              }
           });
        }
        
        $scope.insertDummyData = function(obj) { 
           param = {action:"addDummyData", url: "http://localhost:3000"};
           dbAction.dummyData(param, function(response) {
              console.log(response);
           });
        }
        
			}
		);
    
  // Controller Inheritance
	app.controller('DashboardControllerDetail', function ($scope,  $stateParams) {
				console.log('DashboardControllerDetail', $stateParams);
        // console.log($scope.item);
        var id = $stateParams.id;
         $scope.item = _.find($scope.items, function(item){return item._id == id });
        // console.log($scope.item);
			}
		);
    
	app.controller('CampaignController', function ($scope,  $stateParams) {
				console.log('CampaignController');
        console.log($scope.item);
			}
		);
	app.controller('SubscriberController', [function ($scope, $routeParams) {
				console.log('SubscriberController');
			}
		]);
	app.controller('SubscriberDetailController', [function ($scope, $routeParams) {
				console.log('SubscriberDetailController');
			}
		]);
   
  //app.config()
//})(window.angular);




