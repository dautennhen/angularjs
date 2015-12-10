define([], function () {
	var app = angular.module('moduleBase', ['app.config']);
	app.provider("moduleBase", function () {
		var provider = {};
		provider.$get = ['$window', 'dbAction', '$rootScope', '$timeout', '$appConfig', '$log', function ($window, dbAction, $rootScope, $timeout, $appConfig, $log) {
				var service = {
					//lang : 'en',
					params : {
						items_per_page : 9
					},
					setLanguage : function (lang, callback) {
						param = {
							url : "language/" + lang + '.json'
						};
						dbAction.doThat(param, function (response) {
							callback(response)
						});
						return lang;
					},
					changeLanguage : function (lang) {
						if (typeof lang == 'undefined') {
							lang = $window.applang || 'en';
						} else {
							$window.applang = lang;
						}
						//this.lang = lang;
						this.loadFile('language/' + lang + '.js', function (content) {
							$timeout(function () {
								$rootScope.lang = content;
								$log.log('content', content);
							}, 0)
						})
					},
					loadFile : function (filename, callback) {
						requirejs.onError = function (err) {
							$log.log('onError: file ' + filename + ' is not existed');
						};
						requirejs([filename], function (content) {
							callback(content)
						});
					},
					getLocalStorage : function (item) {
						var item = $window.localStorage.getItem(item);
						return (item == null) ? {} : JSON.parse(item);
					},
					mergeAndSetLocalStorage : function (item, data) {
						var itemData = this.getLocalStorage(item);
						data = _.extend(itemData, data);
						this.setLocalStorage(item, data);
					},
					setLocalStorage : function (item, data) {
						data = JSON.stringify(data);
						$window.localStorage.setItem(item, data);
					},
					displayCurrentPage : function ($scope) {
						//$scope.total = $scope.allItems.length;
						var page = this.getLocalStorage('items');
						page = page.curpage || 0;
						var start = $appConfig.paging_pageSize * page;
						var end = start + $appConfig.paging_pageSize;
						$log.log([start, end], page);
						var items = this.getDisplayItems([start, end], $scope);
						$scope.items = items;
						if (items.length != 0) {
							$scope.total = $scope.allItems.length;
						}
					},
					getDisplayItems : function (number, $scope) {
						var items = [];
						var oneitem = {};
						for (var i = number[0]; i < number[1]; i++) {
							if (typeof $scope.allItems[i] == 'undefined')
								break;
							$scope.allItems[i].did = i;
							items.push($scope.allItems[i]);
						}
						return items;
					},
					union : function (a, b) {
						return $.merge($.merge([], a), b);
					},
          authenticaded : function() {
            //Math.round((new Date()).getTime() / 1000)
            return true;
          }
				}

				// service.changeLanguage();
				/*$rootScope.$watch('applang', function( newValue, oldValue ){
				service.changeLanguage();
				$log.log('applang changed');
				}, true);*/
				return service;
			}
		];
		return provider;
	});
	return app;
});
