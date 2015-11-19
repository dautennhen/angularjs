angular.module('module3').provider("kid", function() {
  var provider = {};
  provider.$get = [function() {
      return {
        doSth : function() {
          console.log('Work like a kid')
        }
      }
  }];
  return provider;
});