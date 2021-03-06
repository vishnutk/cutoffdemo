'use strict';

//Constants
var isMobileDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var appConfigUrl = 'http://localhost/cutoffdemo/api/index.php/api/';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'angularSpinner'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {templateUrl: 'views/search-results.html', controller: 'SearchCtrl'});
  $routeProvider.when('/collegeInfo', {templateUrl: 'views/collegeInfo.html', controller: 'CollegeCtrl'});
  $routeProvider.when('/aboutus', {templateUrl: 'views/aboutus.html', controller: 'MyCtrl2'});
   $routeProvider.when('/view3', {templateUrl: 'views/partial3.html', controller: 'MyCtrl1'});
  $routeProvider.otherwise({redirectTo: '/search'});
}]);
