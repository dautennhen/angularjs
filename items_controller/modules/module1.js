define([], function () {
  var app = angular.module('db', []);
  app.value('hihi', 'hihi value');
  app.provider("dbAction", function() {
      var provider = {};
      provider.$get = ['$http', '$log', function($http, $log) {
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
            }
          }
          return service;
      }];
      return provider;
  });
  return app;
});