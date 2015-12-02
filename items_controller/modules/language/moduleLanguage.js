define([], function () {
  var app = angular.module('moduleLanguage', []);
  var getLanguage = function() {
    var lang = localStorage.getItem('lang');
    return;
  }
  var lang = getLanguage();
 // app.value('lang', lang);
  app.value('lang', {
    items : "items",
    home : "home",
    dashboard : "dashboard",
    users : "users",
    orders : "orders"
  });
  return app;
});