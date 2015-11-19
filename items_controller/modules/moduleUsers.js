 
angular.module('moduleUsers', ['moduleBase']);
angular.module('moduleUsers').controller('UsersController', function ($scope, dbAction, $stateParams, $log, $templateRequest, $templateCache, $timeout, moduleBase) {
		$log.debug('UsersController---haha from parent - HomeController', $scope.haha);
    $log.debug('UsersController---setLanguage from parent - baseModule', $scope.setLanguage);
    $log.debug('log debug', $scope.haha, $log);
    $log.debug('config param', moduleBase.params);
	//	angular.extend($scope, moduleUsers);
  this.abc = 'this seem be crazy';
  $scope.haha = this.abc;
  $log.debug( angular.fromJson(['aa', 'bb']) )
  
  $templateRequest('view/custom.html', true)
  $timeout(function(){
      var aa = $templateCache.get('view/custom.html');
      var bb = $templateCache.get('view/footer.html');
      $log.info('aa',aa);
      $log.info('bb', bb);
      //$log.info('$templateRequest', $templateRequest, bb);
  }, 1000);
  
  $scope.$on('$viewContentLoaded', function(event) {
    $log.debug("content --- loaded");
  });
  $log.debug("content --- not loaded");
  
});
  
angular.module('moduleUsers').provider("moduleUsers", function() {
    var provider = {};
    provider.$get = ['dbAction', function(dbAction) {
        return {
          template : {
            list : "view/listorders.html",
            item : "view/itemorder.html"
          },
          viewItem : function(obj) {},
          saveItem : function($event) {},
          listItems : function() {},
          deleteItem : function(obj) {}
        }
    }];
    return provider;
});