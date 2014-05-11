'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var collegeService = angular.module('myApp.services', ['ngResource']);

 collegeService.value('version', '0.1');
  
  var appConfigUrl = 'http://localhost/cutoffsearch/cutoffdemo/api/index.php/api/';
  
//  var phonecatServices = angular.module('phonecatServices', ['ngResource']);
collegeService.factory('CollegeService', ['$resource', '$http', function($resource, $http) {
	var CollegeService = function() {
		this.getColleges = function() {
			return $resource(appConfigUrl + 'college/colleges/format/json', {}, {
				query: {method:'GET', isArray:true}
			});
		}();
		
		this.getDistricts = function() {
			return $resource(appConfigUrl + 'college/districts/format/json', {}, {
				query: {method:'GET', isArray:true}
			});
		}();
		
		this.searchCollege = function() {
			return function(data, callback) {
				$http.post(appConfigUrl + 'college/searchcollege/format/json', data).success(function(data, status, headers) {
					callback(data);
				});
			};

		}();
		
		this.deleteCollege = function() {
			return function(data, callback) {
				$http.post('http://localhost/searchdemoproject/api/index.php/api/college/deletecollege/format/json', data).success(function(data, status, headers) {
//					alert('testing');
					callback();
				});
			};
		}();
		
		this.addCollege = function() {
			return function(data, callback) {
				$http.post('http://localhost/cutofsearch/api/index.php/api/college/addcollege/format/json', data).success(function(data, status, headers) {
//					alert('testing');
					callback();
				});
			};
		}();
		
		this.addCourse = function() {
			return function(data, callback) {
				$http.post('http://localhost/cutofsearch/api/index.php/api/college/addcourse/format/json', data).success(function(data, status, headers) {
//					alert('testing');
					callback();
				});
			};
		}();
		
		this.addCutoff = function() {
			return function(data, callback) {
				$http.post('http://localhost/cutofsearch/api/index.php/api/college/addcutoff/format/json', data).success(function(data, status, headers) {
//					alert('testing');
					callback();
				});
			};
		}();
	};
	
	return new CollegeService();

}]);

collegeService.factory('College', ['$resource',
  function($resource){
    return $resource('http://localhost/searchdemoproject/api/index.php/api/college/colleges/format/json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
  
collegeService.factory('DeleteCollege', ['$resource','$http',
  function($resource, $http){
	/* 	$http.post("", data).success(function(data, status, headers) {
			alert('college deleted');
		}); */
		return function(data, callback) {
			$http.post('http://localhost/searchdemoproject/api/index.php/api/college/deletecollege/format/json', data).success(function(data, status, headers) {
//				alert('testing');
				callback();
			});
		};
  }]);

collegeService.factory('AddCollege', ['$resource','$http',
  function($resource, $http){
		return function(data, callback) {
			$http.post('http://localhost/searchdemoproject/api/index.php/api/college/addcollege/format/json', data).success(function(data, status, headers) {
				callback();
			});
		};
  }]);
  collegeService.factory('SearchCollege', ['$resource','$http',
  function($resource, $http){
		return function(data, callback) {
			$http.post('http://localhost/searchdemoproject/api/index.php/api/college/searchcollege/format/json', data).success(function(data, status, headers) {
				callback(data);
			});
		};
  }]);

 
  
  /* collegeService.factory('SearchCollege', ['$resource',
  function($resource){
    return $resource('http://localhost/searchdemoproject/api/index.php/api/college/searchcollege/format/json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]); */
  
  
  
/* collegeService.factory('InsertCollege', ['$http', '$rootScope', function($http, $rootScope) {
  var college = [];
 
  return {
    
    savecollege: function($params) {
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: base_url + 'json/save_college',
        method: "POST",
        data: $params,
      })
        .success(function(addData) {
          college = addData;
          $rootScope.$broadcast('handleSharedBooks',college);
        });
    }
  };
}]); */

