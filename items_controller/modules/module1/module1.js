define([], function () {
  var app = angular.module('db', []);
  app.value('hihi', 'hihi value');
  app.provider("dbAction", function() {
      var provider = {};
	  var dbname = 'dbtest';
      provider.$get = ['$http', '$log', '$window', function($http, $log, $window) {
          var service = {
            doThat : function(param, callback) {
              param = { method: 'POST', url: param.url, data: $.param(param), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
              $http(param).then(function(response) {
                // if(typeof callback=='function') callback(response.data)
                (callback || angular.noop)(response.data)
              }, function(response) { $log.error('error') });
              //.catch(function(error)...
            },
            dummyData : function(param) {
              param = { method: 'POST', url: param.url, data: $.param(param), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
              $http(param).then(function(response) { console.log(response) }, function(response) { $log.error('error') });
            },
			initDb : function() {
			  var me = this;
			  this.db = $window.openDatabase(dbname, "0.0", "database modular", null);
			},
			excuteQuery : function (str, param, callback) {
			  this.db.transaction(
				function (tx) {tx.executeSql(str, param)},
				function(err){console.error(err.message)},
				function(){
					if(typeof callback == 'function') callback();
				}
			  );
			},
			install : function() {
				var me = this;
				this.doThat({url:'install.js'},function(data){
					$.each(data, function( index, value ) {
						me.excuteQuery(value);
					})
				})
			}
          }
          return service;
      }];
      return provider;
  });
  return app;
});