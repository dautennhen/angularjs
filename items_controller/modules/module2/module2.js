define([], function () {
  var app = angular.module('othermodule', []);
  app.value('aaa', 'hahaha');
  return app;
});