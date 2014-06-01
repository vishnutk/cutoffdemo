'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('CollegeCtrl', ["$scope", "CollegeService", function($scope, CollegeService) {
		$scope.college = {};
		$scope.course = {};
		$scope.course.intake = 60;
		$scope.cutoff = {};
		
		$scope.searchData = function() {
		};
		
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
				//console.log(data);
			});
		};
		$scope.init();
  }])
  
 .controller('searchOptionsCtrl', ["$scope", "$rootScope", "CollegeService", function($scope, $rootScope, CollegeService) {
		$scope.searchData = {
			type: "",
			gender: "",
			category: "",
			distType: "",
			collegeType: "",
			percentage: "",
			districtID: ""
		};
		
		$scope.init = function(){
			CollegeService.getDistricts.query(function(data) {
				$scope.district = data;
				console.log(data);
			});
			
			CollegeService.getCourses.query(function(courses) {
				$scope.courses = [];
				for(var i=1;i<courses.length; i++) {
					var p = {};
					p.courseName = courses[i].courseName;
					$scope.courses.push(p);
				}
//				$scope.courses = courses;
				console.log($scope.courses);
			});
		};
		
		$scope.validateInput = function() {
			if(!$scope.searchData.type) {
				alert('Please select type');
				return false;
			}
			if(!$scope.searchData.gender) {
				alert('Please select gender');
				return false;
			}
			if(!$scope.searchData.gender) {
				alert('Please select gender');
				return false;
			}
			if(!$scope.searchData.category) {
				alert('Please select category');
				return false;
			}
			if(!$scope.searchData.distType) {
				alert('Please select district type');
				return false;
			}
			if(!$scope.searchData.districtID) {
				alert('Please select district');
				return false;
			}			

		};
		
		$rootScope.searchResultMessage = "Please apply search filter to see the results";
		$rootScope.resultsFound = "";
		
		$scope.resetForm = function() {
			$scope.searchData = {
				type: "",
				gender: "",
				category: "",
				distType: "",
				collegeType: "",
				percentage: "",
				districtID: ""
			};
		};
		
		$scope.callSearch = function() {
//			//console.log($scope.searchData);
			if(isMobileDevice) {
				$("#searchCollapse").trigger('click');
			}
			var data = {};
			//if($scope.validateInput()) {
//			alert('test');
// 			console.log($scope.searchData.courseName.courseName);
// 			return;
				data.seatType = $scope.searchData.type + $scope.searchData.gender + $scope.searchData.category + $scope.searchData.distType;
				data.distictid = $scope.searchData.dist.districtID;
				data.collegeType = $scope.searchData.collegeType;
				
				if(parseInt($scope.searchData.percentage) < 101) {
					data.percentage = $scope.searchData.percentage;
				} else {
					alert("Please enter valid percentage");
					return false;
				}
				
				if($scope.searchData.courseName) {
					data.courseName = $scope.searchData.courseName.courseName;
				}
				
				data.isTfws = $scope.searchData.tfws;
				data.isPhysical = $scope.searchData.phand;
				//console.log(data);
				if($scope.searchData.defence) {
					data.seatType = $scope.searchData.type + "DEF" + $scope.searchData.distType;
				}
				
// 				if($scope.searchData.phand) {
// 					data.seatType = $scope.searchData.type + "DEF" + $scope.searchData.distType;
// 				}
				
				$rootScope.loadingData = true;
				CollegeService.searchCollege(data, function(data) {
					console.log(data);

					if(!data.error) {
						$rootScope.resultData = [];
 						console.log($rootScope.resultsData);
 						

						for(var m =0; m< data.length; m++) {
							var obj = data[m];
							if($scope.searchData.phand || $scope.searchData.defence) {
//								obj.category = "PHC";
							} else {
								obj.category = $scope.searchData.category;
							}
							
							if($rootScope.resultData.length === 0) {
								$rootScope.resultData.push(obj);
							} else if($rootScope.resultData[$rootScope.resultData.length -1].seattype === obj.seattype && $rootScope.resultData[$rootScope.resultData.length -1].courseCode === obj.courseCode){
								if($rootScope.resultData[$rootScope.resultData.length -1].percentage >= obj.percentage) {
									$rootScope.resultData[$rootScope.resultData.length -1] = obj;
								}
							} else {
								$rootScope.resultData.push(obj);
							}
						}
						$rootScope.resultsFound = " - " + $rootScope.resultData.length + " records found";
						console.log($rootScope.resultData);
					} else {
						$rootScope.resultData = [];
						$rootScope.searchResultMessage = "No Results found. Please try with some different criteria";
						$rootScope.resultsFound = "";
					}
					$rootScope.loadingData = false;
				});
			//}
		};
				
		$scope.init();
		$(document).ready(function(){
//			alert(isMobileDevice);
			if(isMobileDevice) {
				$(".search-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" }).css('overflow','auto');
			}
		});
 }])
 .controller('SearchCtrl', ["$scope", "$rootScope","CollegeService", function($scope, $rootScope, CollegeService) {
 
 		$scope.printData = function() {
 			   var divToPrint=document.getElementById("searchTable");
			   var newWin= window.open("");
			   var str = "<img style='max-width: 100%;margin: 0 auto;height: 100px;width: 100%;margin-bottom: 15px;' src='./img/gestalt_board.jpg'/>";
			   str = str + divToPrint.outerHTML;
			   newWin.document.write(str);
			   newWin.print();
			   newWin.close();
 		};
// 		$scope.searchData = {};

// 		$scope.init = function(){
// 			CollegeService.getDistricts.query(function(data) {
// 				$scope.district = data;
// 				console.log(data);
// 			});
// 		};
		
// 		$rootScope.callSearch = function() {
// //			console.log($scope.searchData);
// 			var data = {};
// 			data.seatType = $scope.searchData.type + $scope.searchData.gender + $scope.searchData.category + $scope.searchData.distType;
// 			data.distictid = $scope.searchData.dist.districtID;
// 			data.collegeType = $scope.searchData.collegeType;
// 			data.percentage = $scope.searchData.percentage;
// 			console.log(data);
// 			CollegeService.searchCollege(data, function(data) {
// 				$scope.resultData = data;
// 			});
// 		};
		
		//$scope.init();
		
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