define([], function () {
  var app = angular.module('moduleTable',[]);
  app.provider("moduleTable", function() {
      var provider = {};
      provider.$get = ['$log', 'dbAction', '$timeout', function($log, dbAction, $timeout) {
          var service =  {
            total : 100,
            params : {
              items_per_page : 9
            },
           // item : '<li class="page_item" data-start="{number}" ng-click="loadPage({number})">{number}</li>',
            generateItemNumers : function(total) {
              var items = [];
              //total = this.total;
              var numbers = Math.ceil(this.total/this.params.items_per_page);
              for(var i=0; i<numbers; i++) {
                items.push(i);
              }
              return items;
            },
            paging : function($scope) {
              $scope.pageitems = this.generateItemNumers();
              /*var items = this.generateItemNumers();
              $log.log(items);
              items = items.join('');
              $log.log('', container, items);
              $timeout(function(){
                $(container).append(items);
              }, 11);*/
            },
            loadPage : function($scope, number) {
                param = {action:"page", start: number, type:"ajax", url: "http://localhost:3000"};
                dbAction.doThat(param, function(response) {
                  $scope.items = response;
                });
            }
          }
          
         // service.changeLanguage();
          /*$rootScope.$watch('applang', function( newValue, oldValue ){
            service.changeLanguage();
            console.log('applang changed');
          }, true);*/
          return service;
      }];
      return provider;
  });
  return app;
});