angular
		.module('gtri', [])
		.controller('gtriCtrl', ['$scope', 'appData', function ($scope, appData) {
			$scope.people = [];
			$scope.matchString = '';
			$scope.active = '';
			$scope.waiting = false;

			$scope.$watch('active', function (newValue, oldValue) {
				getPeopleData();
			});
			$scope.$watch('matchString', function (newValue, oldValue) {
				getPeopleData();
			});

			function getPeopleData() {
				$scope.waiting = true;
				appData.getPeopleData($scope.matchString, $scope.active)
						.then(function (res) {
							if (res.status >= 200 && res.status < 300) {
								$scope.people = res.data;
								console.log(res.data.length);
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
