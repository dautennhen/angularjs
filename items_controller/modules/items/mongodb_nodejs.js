var initializeItems = function ($window, $scope, moduleItems) {
	$window.loadedItems = true;
	$scope.items = moduleItems.init($scope);
}
angular.module('moduleItems', ['ngRoute', 'ui.router', 'db', 'moduleBase', 'moduleTable', 'bw.paging', 'app.config']);
angular.module('moduleItems').controller('ItemsController', function ($log, $scope, dbAction, indexedDb, moduleItems, $stateParams, $timeout, $routeParams, $window, moduleTable, $appConfig, moduleBase) {
	$scope.page = $appConfig.paging_page;
	$scope.pageSize = $appConfig.paging_pageSize;
	$scope.total = 0;
	$scope.allItems = [];
	$scope.items = [];
	$scope.DoCtrlPagingAct = function (text, page, pageSize, total) {
		moduleBase.mergeAndSetLocalStorage('items', {
			curpage : page - 1
		});
		moduleBase.displayCurrentPage($scope);
	};
	$scope.getOne = function () {}
	$scope.getAll = function () {}
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
	initializeItems($window, $scope, moduleItems)
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
			action : "gooAddItem",
			url : "http://localhost:3000"
		};
		$.extend(param, data);
		dbAction.doThat(param, function (response) {
			$timeout(function () {
				$scope.$apply(function () {
					data.id = response._id;
					$scope.allItems.push(data);
					moduleBase.displayCurrentPage($scope);
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
		$obj.data('id', obj.item.id);
		$obj.data('did', obj.item.did);
		$obj.find('[name="itemprice"]').val(item.price);
		$obj.find('[name="itemname"]').val(item.name);
		$obj.find('[name="itemcurrency"]').val(item.currency)
	}
	param = {
		action : "gooUpdateItem",
		url : "http://localhost:3000"
	};
	$scope.saveChange = function ($event) {
    var $obj = $($event.target).parents('tr');
    $obj = $('form[name="myForm"]');
		if (typeof $obj.data('id') == 'undefined')
			return;
		data = {
      id : $obj.data('id'),
			price : $obj.find('[name="itemprice"]').val(),
			name : $obj.find('[name="itemname"]').val(),
			currency : $obj.find('[name="itemcurrency"]').val(),
		}
		var param = {
			action : "gooUpdateItem",
			url : "http://localhost:3000"
		};
		$.extend(param, data);
    dbAction.doThat(param, function (response) {
			$timeout(function () {
				$scope.$apply(function () {
          var did = parseInt($obj.data('did'));
					$.extend($scope.allItems[did], data);
				  moduleBase.displayCurrentPage($scope);
				})
			}, 20);
		});
	}
	$scope.deleteItem = function (obj) {
		param = {
			action : "gooDeleteItem",
			id : obj.item.id,
			url : "http://localhost:3000"
		};
		dbAction.doThat(param, function (response) {
			if (typeof response.deleted != 'undefined') {
				var item = _.findWhere($scope.items, {
						_id : (obj.item.id || obj.item._id)
					});
				var items = _.without($scope.allItems, item);
				$timeout(function () {
					$scope.$apply(function () {
						$scope.allItems = items;
						moduleBase.displayCurrentPage($scope);
					})
				}, 20);
			}
		});
	}
	$scope.insertDummyData = function (obj) {
		param = {
			action : "addDummyData",
			url : "http://localhost:3000"
		};
		dbAction.dummyData(param, function (response) {
			$log.log(response);
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
			return item._id == id
		});
	$timeout(function () {
		$('[data-id="item' + id + '"]').show();
	}, 20)
	$scope.closeMe = function ($event) {
		$($event.target).parent().hide();
	}
});
angular.module('moduleItems').provider("moduleItems", function () {
	var provider = {};
	provider.$get = ['$window', 'dbAction', '$state', '$templateCache', '$timeout', '$rootScope', '$stateParams', 'moduleBase', function ($window, dbAction, $state, $templateCache, $timeout, $rootScope, $stateParams, moduleBase) {
			var services = {
				init : function ($scope) {
					var param = {
						action : "gooParseList",
						url : "http://localhost:3000"
					};
        dbAction.doThat(param, function (response) {
          var allItems = _.map(response, function(item){ item.id = item._id; return item; })
          $scope.allItems = allItems;
          var items = moduleBase.displayCurrentPage($scope);
          $('[data-toggle="tooltip"]').tooltip();
        });
				}
			}
			return services;
		}
	];
	return provider;
});
angular.module('moduleItems').run(function () {})
