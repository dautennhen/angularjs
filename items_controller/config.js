angular.module('app.config', []).constant('$appConfig', {
	'dbname' : 'dbname',
	'dbtype' : 'indexeddb',//'indexeddb, websql, mongodb_nodejs',
	//paging
	paging_page : 1,
	paging_pageSize : 3
});