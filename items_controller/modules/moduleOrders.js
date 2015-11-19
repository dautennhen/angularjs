angular.module('moduleOrders',  ['ngRoute', 'ui.router', 'ui.validate', 'db', 'moduleBase']);
angular.module('moduleOrders').provider("moduleOrders", function() {
  var provider = {};
  provider.$get = ['dbAction','$log', '$q', '$timeout', function(dbAction, $log, $q, $timeout) {
    var services = {
      getItems : function() {},
      saveItem : function($event) {},
      listItems : function() {},
      deleteItem : function(obj) {},
      newItem : function() {
        $('.orders_newitem').show()
      },
      xNewItem : function($event) {
        $('.orders_newitem').hide();
        $($event.target).parent('.orders_newitem').find('input, textarea, select').val('')
      },
      newRowParam : function(formName) {
        var $firstRow = $('form[name="'+formName+'"]').childrens().eq(0);
        var $row = $firstRow.clone(true);
        $firstRow.before($row);
      },
      notBlackListed : function(value) {
        var blacklist = ['bad@domain.com', 'verybad@domain.com'];
        return blacklist.indexOf(value) === -1;
      },
      doesNotExist : function(value) {
        var db = ['john.doe@mail.com', 'jane.doe@mail.com'];
        return $q(function(resolve, reject) {
            $timeout(function() {
                (db.indexOf(value) < 0) ? resolve() : reject();
            }, 500);
        })
      }
    }
    return services;
  }];
  return provider;
});
  
angular.module('moduleOrders').controller('OrdersController', function ($rootScope, $scope, $log, dbAction, $stateParams, $ocLazyLoad, moduleBase, moduleOrders) {
  $log.info('OrdersController from orderM');
  angular.extend($scope, moduleOrders);
   $scope.init = function() {
      param = {action:"gooParseList", url: "http://localhost:3000"};
      dbAction.doThat(param, function(response) {
          if(typeof $scope != 'undefined')
            $scope.items = response;
      });
    }
    $scope.init();
    // kid, loaded in UsersController - module3controller
   // kid.doSth();
  // console.log($scope.item);
});

  // Controller Inheritance
angular.module('moduleOrders').controller('OrderController', function ($scope, $stateParams, $log, $timeout) {
  $scope.item = _.find($scope.items, function (item) {
    return item._id == id
  });
  
    // $scope.xNewItem = function($event) {
   //   $($event.target).parent().hide();
  //   }
  
  var id = $stateParams.id;
  $timeout(function(){
    $('[data-id="item'+id+'"]').show()
  }, 20)
   
});

angular.module('moduleOrders').run(function($rootScope, $timeout){
 //moduleBase.changeLanguage('en');
})