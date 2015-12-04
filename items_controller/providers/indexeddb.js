angular.module('db')..provider("indexedDb", function() {
  //var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	  var dbname = 'dbname';
	  var provider = {};
	  provider.$get = ['$log', '$window', function($log, $window) {
		  var service = {
			openConection : function(param, callback) {
				var indexedDB = $window.indexedDB || $window.webkitIndexedDB || $window.mozIndexedDB || $window.msIndexedDB;
				var request = indexedDB.open(dbname, 1);  
				request.onsuccess = function (evt) {
					this.db = request.result;
				};
				request.onerror = function (evt) {
					console.log("IndexedDB error: " + evt.target.errorCode);
				};
				request.onupgradeneeded = function (evt) {};
			},
			getStore : function(tablename) {
				var transaction = this.db.transaction(tablename, 'readwrite');
				return transaction.objectStore(tablename)
			},
			//{table:tablename, values:{}}
			getAll : function(param, callback) {
				request = this.getStore(param.table).openCursor();
				request.onsuccess = function(evt) {  
					var cursor = evt.target.result;
					var results = [];
					if (cursor) {  
						results.push(cursor.value);//cursor.key
						cursor.continue();  
					}  
					else {  
						(callback || angular.noop)(results)
					}  
				};
			},
			getOne : function(param, callback) {
				var request = this.getStore(param.table).get(param.id);
				request.onsuccess = function(evt) {  
				  if(request.result) {
					(callback || angular.noop)(request.result)
				  } else {
					alert("Couldn't be found in your database!"); 
				  }
				};
			},
			insert : function(param, callback) {
				var request = this.getStore(param.table).add(param.values);
				request.onsuccess = function (evt) {
					(callback || angular.noop)(evt)
				};
			},
			update : function(param, callback) {
				var request = this.getStore(param.table).put(param.values);
				request.onsuccess = function (evt) {
					(callback || angular.noop)(evt)
				};
			},
			delete : function(param, callback) {
				var id = $window.parseInt(param.id);
				var request = this.getStore(param.table).delete(id);
				request.onsuccess = function (evt) {
					(callback || angular.noop)(evt)
				};
			}
		  }
		  return service;
	  }];
  return provider;
})