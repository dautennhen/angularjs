define([], function () {
  var app = angular.module('db', []);
  app.value('hihi', 'hihi value');
  app.provider("dbAction", function() {
      var provider = {};
      provider.$get = ['$http', function($http) {
          var service = {
            doThat : function(param, callback) {
              param = { method: 'POST', url: param.url, data: $.param(param), cache: true, headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
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
  });
  return app;
});