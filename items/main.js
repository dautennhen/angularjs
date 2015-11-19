define(['config/config.js', 'config/configUser.js', 'config/configOrder.js', 'config/configItem.js', 'modules/modules', 'modules/moduleUsers', 'modules/moduleOrders', 'modules/moduleItems', 'modules/moduleBase', 'modules/module1','modules/module2'],
  //function (configParams, mainmodule, moduleBase, module1, module2, moduleItems, moduleOrders, moduleUsers) {
  function (configParams, configUserParam, configOrderParam, configItemParam, mainmodule, usermodule, ordermodule, itemmodule) {
    mainmodule.config(configParams);
    usermodule.config(configUserParam);
    ordermodule.config(configOrderParam);
    itemmodule.config(configItemParam);
    angular.bootstrap(document.querySelector('.moduledemo') , [mainmodule.name]);
    angular.bootstrap(document.querySelector('.moduleitem') , [itemmodule.name]);
    // module demo not include module user
    angular.bootstrap(document.querySelector('.moduleuser') , [usermodule.name]);
    angular.bootstrap(document.querySelector('.moduleorder') , [ordermodule.name]);
  }
);