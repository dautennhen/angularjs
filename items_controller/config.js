angular.module('app.config', []).constant('$appConfig', {
	'dbname' : 'dbname',
	'dbtype' : 'indexeddb',//'indexeddb, websql, nodejs_mongodb',
	//paging
	paging_page : 1,
	paging_pageSize : 5
});