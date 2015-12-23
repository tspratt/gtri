angular
		.module('gtri', ['ui.bootstrap'])
		.controller('gtriCtrl', ['$scope', 'appData', function ($scope, appData) {
			$scope.people = [];
			$scope.matchString = '';
			$scope.active = '';
			$scope.waiting = false;
			$scope.view = 'people';	//'people';		//test
			$scope.editMode = false;
			$scope.testInputString = '1,3,5,7,-3,-2,-100';
			$scope.testResult = null;
			$scope.testExplain = '';

			$scope.$watch('active', function (newValue, oldValue) {
				$scope.people = [];			//to give immediate feedback that search is happening
				getPeopleData();
			});
			$scope.$watch('matchString', function (newValue, oldValue) {
				$scope.people = [];			//to give immediate feedback that search is happening
				getPeopleData();
			});

			$scope.fullName = function (oPerson) {
				var sReturn = oPerson.name.first;
				sReturn += (oPerson.name.middle && oPerson.name.middle.length > 0)? ' ' + oPerson.name.middle: '';
				sReturn += (oPerson.name.last && oPerson.name.last.length > 0)? ' ' + oPerson.name.last: '';
				return sReturn
			};

			/**
			 * Run by the execute button,
			 * launches test function
			 */
			$scope.executeTest = function () {
				var aIn;
				var oResult;
				$scope.testExplain = '';
				try {
					aIn = $scope.testInputString.split(',').map(Number);
					oResult = fnTest(aIn);
					$scope.testResult = oResult.result;
					if ($scope.testResult) {
						$scope.testExplain = oResult.match.join(',');
					}
					else {
						$scope.testExplain = 'No pair of integers sum to zero'
					}
				}
				catch (error) {
					$scope.testExplain = error.message;
				}
			};

			/**
			 * this function returns an object containing the boolean result
			 * and the integers that matched the requirements
			 * @param aIn
			 * @returns {{result: boolean, match: *}}
			 */
			function fnTest (aIn) {
				var iCheck1;
				var iCheck2;
				var bReturn = false;
				var aMatch;
				for (var i = 0; i< aIn.length; i ++) {
					iCheck1 = aIn[i];
					for (var j = 0; j < aIn.length; j ++) {
						iCheck2 = aIn[j];
						if (iCheck1 + iCheck2 === 0) {
							bReturn = true;
							aMatch = [iCheck1,iCheck2];
							break;
						}
					}
				}
				return {result: bReturn, match: aMatch};
			}

			function getPeopleData() {
				$scope.waiting = true;
				appData.getPeopleData($scope.matchString, $scope.active)
						.then(function (res) {
							if (res.status >= 200 && res.status < 300) {
								$scope.people = res.data;
								console.log(JSON.stringify(res.data[1],null,2));
							}
							else {
								console.log('HTTP Error: ' + res.statusText);
							}
							$scope.waiting = false;
						});
			}

		}])
		.factory('appData', ['$http', 'envConfig', function ($http, envConfig) {
			var appData = {};

			appData.getPeopleData = function (matchString, isActive) {

				var url = envConfig.WEBSERVICE_BASE_URL + 'findPeople';
				var oQueryParams = {};
				if (matchString && matchString.length > 0) {
					oQueryParams.name = matchString;
				}
				if (isActive && isActive.length > 0) {
					oQueryParams.active = (isActive === 'true');
				}

				return $http.get(url, {params: oQueryParams})
						.then(function (res) {
							return res;
						})
						.catch(function (res) {
							return res;
						});
			};



			return appData;
		}])
		.directive('personDetail', function () {
			return {
				restrict: 'E',
				scope: true,
				templateUrl: 'person-detail-tmpl.html',
			};
		})
		.directive('focusMe', function () {
			return {
				link: function (scope, element, attrs) {
					scope.$watch(attrs.focusMe, function (value) {
						if (value === true) {
							console.log('value=', value);
							element[0].focus();
							scope[attrs.focusMe] = false;
						}
					});
				}
			};
		});
