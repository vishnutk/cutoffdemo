'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('igLogin', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>' +
'  <div class="modal fade" id="loginModal" tabindex="-1" + role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true" data-backdrop="static" data-keyboard="false"> ' +
'    <div class = "modal-dialog" > ' +
'      <form name="loginform" ng-submit="submitLogin()" > ' +
'        <div class = "modal-content" > ' +
'          <div class = "modal-header" > ' +
'				Please enter your details for our record purpose' +
// '            <button type="button" class = "close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()" > Cancel </button>' +
//'              <h3> </h3 > ' +
'          </div>' +
'          <div class="modal-body">' +
'<div class="form-group">'+
'    <label for="userName">Name *</label>'+
'    <input type="text" class="form-control" ng-pattern="/^[a-zA-Z]{3,30} [a-zA-Z]{3,30}$/" ng-trim="false" ng-model="user.userName" name="userName" placeholder="Ex. Firstname Lastname" required maxlength="30">'+
'	 <span ng-show="loginform.userName.$error.pattern" class="error">Please enter valid username Ex. John Smith</span>'+
'  </div>'+
'<div class="form-group">'+
'    <label for="emailAddress">Email address *</label>'+
'    <input type="email" class="form-control" id="emailAddress" placeholder="Ex. abc@gmail.com" ng-model="user.userEmail" required maxlength="50">'+
'  </div>'+
'  <div class="form-group">'+
'    <label for="mobileNumber">Mobile Number *</label>'+
'    <input type="text" class="form-control" ng-pattern="/^[0-9]{10}$/" ng-model="user.mobileNumber" name="mobileNumber" placeholder="Ex. 9422123123" required maxlength="10">'+
'	 <span ng-show="loginform.mobileNumber.$error.pattern" class="error">Not a valid mobile number!</span>'+
'  </div>'+
'<button type="submit" class="btn btn-default" ng-disabled="!loginform.$valid">Submit</button>'+
// '            <table border="0"><tr><td>Email: </td><td><input type="email" ng-model="email"></input > </td></tr> ' +
// '            <tr><td>Password: </td><td><input type = "password" ng-model = "pwd" > </input></td></tr>' +
// '            <tr><td colspan="2"><input type="submit" class="btn btn-primary" id="submit" ng-click="submit()" value="Login"></input ></td></tr></table> ' +
'          </div>' +
'        </div > ' +
'      </form>' +
'    </div > ' +
'  </div>' +
'</div > ',


// <form role="form">
//   <div class="form-group">
//     <label for="exampleInputEmail1">Email address</label>
//     <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
//   </div>
//   <div class="form-group">
//     <label for="exampleInputPassword1">Password</label>
//     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
//   </div>
//   <div class="form-group">
//     <label for="exampleInputFile">File input</label>
//     <input type="file" id="exampleInputFile">
//     <p class="help-block">Example block-level help text here.</p>
//   </div>
//   <div class="checkbox">
//     <label>
//       <input type="checkbox"> Check me out
//     </label>
//   </div>
//   <button type="submit" class="btn btn-default">Submit</button>
// </form>
        controller: function ($scope) {
            
//             $scope.submit = function() {
//                 $scope.login();
// 		        $("#loginModal").modal('hide');
//             };
//             
//             $scope.cancel = function() {
//                 $scope.loggingIn = false;
// 		        $("#loginModal").modal('hide');
//             };
            
            $scope.$watch('loggingIn', function() {
                if ($scope.loggingIn) {
		            $("#loginModal").modal('show');
                };
           });   
        }
    };
});