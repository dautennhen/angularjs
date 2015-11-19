define([], function () {
  var app = angular.module('othermodule', []);
  app.value('othermodulevalue', 'hahaha');
  return app;
});