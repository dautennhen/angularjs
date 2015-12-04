define([], function () {
  var app = angular.module('install', ['module1']);
  //var app = angular.module('install', ['module1']);
	app.provider("installDb", function () {
		var provider = {};
		provider.$get = ['$log', '$window', 'dbAction', 'indexedDb', function ($log, $window, dbAction, indexedDb) {
				var service = {
					install : function () { //indexedDB.deleteDatabase('DB NAME')
						dbAction.doThat({
							url : 'modules/install/indexeddb.js'
						}, function (data) {
							indexedDb.openConection(function(){indexedDb.insert({table:'items', values:{name:'myname21', price : 18111, currency:'vnd', haha : 'huhu'}}) }, function(evt){
							//indexedDb.openConection('', function (evt) {
								var objectStore = null;
								$.each(data, function (index, item) {
									//console.log('item', item)
									//try {
									objectStore = evt.currentTarget.result.createObjectStore(item.table, {
											"keyPath" : "id",
											"autoIncrement" : true
										});
									//for(var i=0; i<item.fields; i++){
									//	  objectStore.createIndex(item.fields[i], item.fields[i], {unique:false});
									//  }
									//} catch(e) {}
								})
							})
						});
					}
				}
				return service;
			}
		];
		return provider;
	})
 return app;
});