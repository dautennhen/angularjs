define([], function () {
	var app = angular.module('moduleBase', ['app.config']);
	app.provider("moduleBase", function () {
		var provider = {};
		provider.$get = ['$window', 'dbAction', '$rootScope', '$timeout', function ($window, dbAction, $rootScope, $timeout) {
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
							console.log('content', content);
						}, 0)
					})
				},
				loadFile : function (filename, callback) {
					requirejs.onError = function (err) {
						console.log('onError: file ' + filename + ' is not existed');
					};
					requirejs([filename], function (content) {
						callback(content)
					});
				},
				getDisplayItems : function(number, $scope){
					var items = [];
					var oneitem = {};
					for(var i=number[0]; i<number[1]; i++) {
						if(typeof $scope.allItems[i] == 'undefined')
							break;
						$scope.allItems[i].did = i;
						//oneitem = $scope.allItems[i];
						//oneitem.did = i;
						items.push($scope.allItems[i]);
					}
					return items;
				},
				union : function(a, b) {
				  return $.merge( $.merge([],a), b);
				}
			}

			// service.changeLanguage();
			/*$rootScope.$watch('applang', function( newValue, oldValue ){
			service.changeLanguage();
			console.log('applang changed');
			}, true);*/
			return service;
			}
		];
		return provider;
	});
	return app;
});
