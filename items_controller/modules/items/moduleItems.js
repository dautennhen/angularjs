var initializeItems = function ($window, $scope, moduleItems) {
	$window.loadedItems = true;
	$scope.items = moduleItems.init($scope);
}
angular.module('moduleItems', ['ngRoute', 'ui.router', 'db', 'moduleBase', 'moduleTable', 'bw.paging', 'app.config']);
angular.module('moduleItems').controller('ItemsController', function ($log, $scope, dbAction, indexedDb, moduleItems, $stateParams, $timeout, $routeParams, $window, moduleTable, $appConfig, moduleBase) {
	console.log($stateParams, $routeParams);
	// get default paging
	$scope.page = $appConfig.paging_page;
	$scope.pageSize = $appConfig.paging_pageSize;
	$scope.total = 1; //results.length;	
	$scope.allItems = [];
	$scope.items = [];
	$scope.DoCtrlPagingAct = function (text, page, pageSize, total) {
		var start = pageSize * (page - 1);
		var end = start + pageSize;
		$scope.items = moduleBase.getDisplayItems([start, end], $scope);
	};
	initializeItems($window, $scope, moduleItems);
	$scope.getOne = function () {
		indexedDb.getOne({
			table : 'items',
			id : 1
		}, function (result) {
			$scope.items = result;
			console.log(result)
		});
	}
	/*var getAll = function () {
		var results = [];
		indexedDb.getAll({
			table : 'items'
		}, function (result) {
			results.push(result)
		});
		$timeout(function () {
			$scope.$apply(function () {
				$scope.allItems = results;
				$scope.items = getDisplayItems([0, $appConfig.paging_pageSize]);//moduleBase.getDisplayItems([0, $appConfig.paging_pageSize], $scope);
			})
		}, 20);
	}
	$scope.getAll = getAll;*/
	$scope.example = {
		text : 'guest',
		word : /^\s*\w*\s*$/
	}
	$scope.init = function () {
		param = {
			action : "gooParseList",
			url : "http://localhost:3000"
		};
		dbAction.doThat(param, function (response) {
			if (typeof $scope != 'undefined')
				$scope.items = response;
		});
	}
	moduleTable.paging($scope);
	$scope.loadPage = function (obj) {
		var start = $(obj.target).data('start');
		moduleTable.loadPage($scope, start)
	}
	$scope.viewItem = function (obj) {
		var id = obj.item._id;
		$scope.item = _.find($scope.items, function (item) {
				return item._id == id
			});
	}
	$scope.addItem = function ($event) {
		var $obj = $($event.target).parents('tr');
		data = {
			price : $obj.find('[name="itemprice"]').val(),
			name : $obj.find('[name="itemname"]').val(),
			currency : $obj.find('[name="itemcurrency"]').val(),
		}
		param = {
			table : "items",
			values : data
		};
		indexedDb.insert(param, function (result) {
			console.log(result)
			$timeout(function () {
				$scope.$apply(function () {
					//console.log(data)
					//data = moduleBase.union([result.target.result], data);
					data.id = result.target.result;
					$scope.allItems.push(data);
					$scope.total = $scope.allItems.length;
					$scope.items = moduleBase.getDisplayItems([0, $appConfig.paging_pageSize], $scope);
				})
			}, 20);
		});
	}
	$scope.editItem = function (obj) {
		var $obj = $('form[name="myForm"]');
		var items = $scope.allItems;
		var item = _.findWhere(items, {
			id : obj.item.id
		});
		$obj.data('id',obj.item.id);
		$obj.data('did',obj.item.did);
		$obj.find('[name="itemprice"]').val(item.price);
		$obj.find('[name="itemname"]').val(item.name);
		$obj.find('[name="itemcurrency"]').val(item.currency);
		
	}
	$scope.saveChange = function ($event) {
		var $obj = $($event.target).parents('tr');
		param = {
			table : "items",
			values : {
				price : $obj.find('[name="itemprice"]').val(),
				name : $obj.find('[name="itemname"]').val(),
				currency : $obj.find('[name="itemcurrency"]').val(),
			}
		};
		$obj = $('form[name="myForm"]');
		if( typeof $obj.data('id') == 'undefined' )
			return;		
		param.values.id = parseInt($obj.data('id'));
		var did  = parseInt($obj.data('did'));
		indexedDb.update(param, function (result) {
			$timeout(function () {
				$.extend( $scope.allItems[did], param.values);
				$scope.items = moduleBase.getDisplayItems([0, $appConfig.paging_pageSize], $scope);
			}, 20);
		});
	}
	$scope.deleteItem = function (obj) {
		var items = $scope.allItems;
		console.log('one item', items);
		var item = _.findWhere(items, {
				name : obj.item.name
			});
		indexedDb.delete ({
			table : 'items',
			id : item.id
		}, function (result) {
			var item = _.findWhere(items, {
					name : obj.item.name
				});
			items = _.without(items, item);
			$timeout(function () {
				$scope.$apply(function () {
					$scope.allItems = items;
					$scope.total = $scope.allItems.length;
					$scope.items = moduleBase.getDisplayItems([0, $appConfig.paging_pageSize], $scope);
					console.log($scope.items, $scope.allItems)
				})
			}, 20);
		});
	}
	$scope.insertDummyData = function (obj) {
		param = {
			action : "addDummyData",
			url : "http://localhost:3000"
		};
		dbAction.dummyData(param, function (response) {
			console.log(response);
		});
	}
	$scope.addFields = function ($event, field) {
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
	$scope.successSaveItem = function () {
		$('.view_newitem .fieldparam').hide();
		$('.view_newitem .addnew').show();
		param = {
			url : "a.json"
		};
		dbAction.doThat(param, function (response) {});
	}
});
angular.module('moduleItems').controller('ItemController', function ($scope, $stateParams, $log, $timeout) {
	var id = $stateParams.id;
	$scope.item = _.find($scope.items, function (item) {
			return item.id == id
		});

	$timeout(function () {
		console.log('ItemController', id, $scope.item);
		$('[data-id="item' + id + '"]').show();
	}, 20)
	$scope.closeMe = function ($event) {
		$($event.target).parent().hide();
	}
});
angular.module('moduleItems').provider("moduleItems", function () {
	var provider = {};
	provider.$get = ['$window', 'dbAction', 'indexedDb', '$state', '$templateCache', '$timeout', '$rootScope', '$stateParams', 'moduleBase', '$appConfig', function ($window, dbAction, indexedDb, $state, $templateCache, $timeout, $rootScope, $stateParams, moduleBase, $appConfig) {
			var services = {
				init : function ($scope) {
					var getAll = function ($scope) {
						var results = [];
						indexedDb.getAll({
							table : 'items'
						}, function (result) {
							results.push(result)
						});
						$timeout(function () {
							$scope.$apply(function () {
								$scope.allItems = results;
								$scope.items = moduleBase.getDisplayItems([0, $appConfig.paging_pageSize], $scope);
								$scope.total = results.length;
							})
						}, 500);
					}
					($scope)
				}
			}
			return services;
		}
	];
	return provider;
});

//angular.module('moduleItems', []).constant('allItems', []);
angular.module('moduleItems').run(function () {})
