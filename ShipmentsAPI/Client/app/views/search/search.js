angular.module('myApp.search', [])
    .controller('SearchCtrl', function ($scope, $rootScope, $http, myserver) {
        $scope.test = "testTxt";
        $scope.getTypeahead = function (searchtxt) {
            if (searchtxt===undefined || searchtxt.length<3){return;}
            return $http({
                url: myserver + '/query/scraps/typeahead/' + searchtxt,
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        };

        $scope.getSearchResults = function (searchtxt) {
            return $http({
                url: myserver + '/query/scraps/' + searchtxt,
                method: 'GET'
            }).then(function (response) {
                $rootScope.products = response.data;
            });
        };



    });
