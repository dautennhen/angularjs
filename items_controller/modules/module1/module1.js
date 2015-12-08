define([], function () {
	var app = angular.module('db', ['oc.lazyLoad','app.config']);
	app.value('hihi', 'hihi value');
	app.provider("dbAction", function () {
		var provider = {};
		provider.$get = ['$http', '$log', '$window', '$appConfig', function ($http, $log, $window, $appConfig) {
				var service = {
					doThat : function (param, callback) {
						param = {
							method : 'POST',
							url : param.url,
							data : $.param(param),
							headers : {
								'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'
							}
						}
						$http(param).then(function (response) {
							(callback || angular.noop)(response.data)
						}, function (response) {
							$log.error('error')
						});
						//.catch(function(error)...
						//}
					},
					dummyData : function (param) {
						//param = { method: 'POST', url: param.url, data: $.param(param), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
						//$http(param).then(function(response) { console.log(response) }, function(response) { $log.error('error') });
						this.doThat(param);
					},
					initDb : function () {
						var me = this;
						this.db = $window.openDatabase($appConfig.dbname, "0.0", "database modular", null);
					},
					excuteQuery : function (str, param, callback) {
						this.db.transaction(
							function (tx) {
							tx.executeSql(str, param)
						},
							function (err) {
							$log.error(err.message)
						},
							function () {
							(callback || angular.noop)()
						});
					},
					install : function () {
						var me = this;
						this.initDb();
						this.doThat({
							url : 'modules/install/'+$appConfig.dbtype+'.js'
						}, function (data) {
							$.each(data, function (index, value) {
								me.excuteQuery(value);
							})
						})
					}
				}
				return service;
			}
		];
		return provider;
	});

	app.provider("indexedDb", function () {
		var dbname = 'dbname';
		var provider = {};
		var db = null;
		provider.$get = ['$log', '$window', function ($log, $window) {
				var service = {
					openConection : function (onsuccess, onupgradeneeded) {
						var me = this;
						var indexedDB = $window.indexedDB || $window.webkitIndexedDB || $window.mozIndexedDB || $window.msIndexedDB;
						var request = indexedDB.open(dbname);
						request.onsuccess = function (evt) {
							me.db = request.result;
							if (typeof onsuccess == 'function')
								onsuccess()
						};
						request.onerror = function (evt) {
							$log.log("IndexedDB error: " + evt.target.errorCode);
						};
						request.onupgradeneeded = function (evt) {
							if (typeof onupgradeneeded == 'function')
								onupgradeneeded(evt)
								//var objectStore = evt.currentTarget.result.createObjectStore(
								//"ln", { keyPath: "id", autoIncrement: true });

								//objectStore.createIndex("name", "name", { unique: false });
								//objectStore.createIndex("email", "email", { unique: true });

						};
					},
					getStore : function (tablename) {
						var transaction = this.db.transaction(tablename, 'readwrite');
						return transaction.objectStore(tablename)
					},

					//{table:tablename, values:{}}
					getAll : function (param, callback) {
						request = this.getStore(param.table).openCursor();
						request.onsuccess = function (evt) {
							var cursor = evt.target.result;
							var results = [];
							if (cursor) {
								//results.push(cursor.value); //cursor.key
								//$log.info(cursor.value)
								(callback || angular.noop)(cursor.value)
								cursor.continue();
							} else {
								//(callback || angular.noop)(results)
							}
						};
					},
					getOne : function (param, callback) {
						var request = this.getStore(param.table).get(param.id);
						request.onsuccess = function (evt) {
							if (request.result) {
								(callback || angular.noop)(request.result)
							}
						};
					},
					insert : function (param, callback) {
						var request = this.getStore(param.table).add(param.values);
						request.onsuccess = function (evt) {
							(callback || angular.noop)(evt)
						};
					},
					update : function (param, callback) {
						var request = this.getStore(param.table).put(param.values);
						request.onsuccess = function (evt) {
							(callback || angular.noop)(evt)
						};
					},
					delete  : function (param, callback) {
						var id = $window.parseInt(param.id);
						var request = this.getStore(param.table).delete (id);
						request.onsuccess = function (evt) {
							(callback || angular.noop)(evt)
						};
					}
				}
				return service;
			}
		];
		return provider;
	})

	//var app = angular.module('install', ['module1']);
	app.provider("installDb", function () {
		var provider = {};
		provider.$get = ['$log', '$window', 'dbAction', 'indexedDb', '$appConfig', function ($log, $window, dbAction, indexedDb, $appConfig) {
				var service = {
					install : function () { //indexedDB.deleteDatabase('DB NAME')
						dbAction.doThat({
							url : 'modules/install/'+$appConfig.dbtype+'.js'
						}, function (data) {
							indexedDb.openConection(
								function(){
								//indexedDb.insert({table:'items', values:{name:'myname21', price : 18111, currency:'vnd', haha : 'huhu'}}) 
								}, function(evt){
							//indexedDb.openConection('', function (evt) {
									var objectStore = null;
									$.each(data, function (index, item) {
										//$log.log('item', item)
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
