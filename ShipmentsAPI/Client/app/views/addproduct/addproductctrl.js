angular.module('myApp.addproduct', [])
    .controller('AddProductCtrl', function ($scope, $http, $state, auth, myserver) {
        if (!auth.isAuthenticated) {
            $state.go('main');
        }
        $http({
            url: myserver + '/api/scraps/new',
            method: 'GET'
        }).then(function (response) {
            $scope.item = response.data;
        }).catch(function (fallback) {
            alert("Backend server says: " + fallback.data.message);
        });

        $scope.addNewRecord = function () {
            $http({
                url: myserver + '/api/scraps',
                method: 'post',
                data: $scope.item
            }).then(function (response) {
                $scope.products = response.data;
            }).catch(function (fallback) {
                alert("Backend server says: " + fallback.data.message);
            });
            alert("Your record has been saved");
            $state.go('main');
        }

    });