define(['router', 'modules/modules', 'modules/moduleBase', 'modules/table/moduleTable', 'modules/module1/module1','modules/module2/module2'], 
  function (configParams, mainmodule, moduleBase, module1, module2) {
    mainmodule.config(configParams);
    angular.bootstrap(document, [mainmodule.name]);//,{strictDi: true});
/*    myApp.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }]);*/
  }
);