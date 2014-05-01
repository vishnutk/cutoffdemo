'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('CollegeCtrl', ["$scope", "CollegeService", function($scope, CollegeService) {
		$scope.college = {};
		$scope.course = {};
		$scope.course.intake = 60;
		$scope.cutoff = {};
		
		$scope.addCollege = function() {
		
			$scope.college.dist = $scope.college.dist.districtID;
			CollegeService.addCollege($scope.college, function(data) {
				alert('college added successfully');
			});
		};
		
		$scope.addCourse = function() {
			$scope.course.collegeID = parseInt($scope.college.id);
			CollegeService.addCourse($scope.course, function(data) {
				alert('course added successfully');
			});
		};
		
		$scope.addCutOff = function() {
			$scope.cutoff.collegeID = parseInt($scope.college.id);
			$scope.cutoff.courseID = parseInt($scope.course.code);
			
			CollegeService.addCutoff($scope.cutoff, function(data) {
				alert('course added successfully');
			});
		};
		
		$scope.init = function(){
			CollegeService.getDistricts.query(function(data) {
				$scope.district = data;
				console.log(data);
			});
		};
		$scope.init();
  }])
 .controller('SearchCtrl', ["$scope", "CollegeService", function($scope, CollegeService) {
 
		$scope.init = function(){
			CollegeService.getDistricts.query(function(data) {
				$scope.district = data;
				console.log(data);
			});
		};
		$scope.init();
		
  }])
  .controller('MyCtrl1', ["$scope", "College", "DeleteCollege", "AddCollege","SearchCollege", "CollegeService", function($scope, College, DeleteCollege, AddCollege, SearchCollege, CollegeService) {
	$scope.name = "Vaishali";
	$scope.collegedata = [];
	
	$scope.updateCollegeModel = function(data) {
		$scope.collegedata = [];
		for(var i =0; i< data.length; i++) {
			$scope.collegedata.push(data[i]);
		}
	};
	
	$scope.getCollegeData = function() {
		$scope.collegedata = [];
		/* College.query(function(data) {
			console.log(data);
			for(var i =0; i< data.length; i++) {
				$scope.collegedata.push(data[i]);
			}
		}); */
		
		CollegeService.getColleges.query($scope.updateCollegeModel);
		//m.query($scope.updateCollegeModel);
	};
	$scope.getCollegeData();
	
	$scope.updateCollegeInfo = function($id) {
		alert($id);
		alert("User updated successfully");
	}
	$scope.deleteCollegeInfo = function(id) {
		var data = {};
		data.id = id;
		
		CollegeService.deleteCollege(data, $scope.updateCollegeModel);
		//DeleteCollege(data, $scope.getCollegeData);
		
	}
	$scope.pushCollegeInfo = function(college) {
		var name = $scope.college.name;
		var address = $scope.college.address;
		AddCollege(college, $scope.getCollegeData);
	}
	
	$scope.getCollegeInfo = function(collegename) {
		var data = {};
		$scope.collegedata1 = [];
		data.name = $scope.collegename.name;
		
		//SearchCollege(data, $scope.getCollegeData);
/* 		SearchCollege.query(function(data) {
			for(var i =0; i< data.length; i++) {
				$scope.collegedata1.push(data[i]);
			}
		});
 */		/* 
		SearchCollege(data, function(data) {
			console.log(data);
			for(var i =0; i< data.length; i++) {
				$scope.collegedata1.push(data[i]);
			}
		}); */
		
		CollegeService.searchCollege(data, $scope.updateCollegeModel);
	}	
}
  ])
  .controller('MyCtrl2', [function() {
		
  }]);

  /*DRY - Dont Repeat Yourself*/