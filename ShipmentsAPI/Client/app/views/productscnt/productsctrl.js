angular.module('myApp.products', [])
    .controller('ProductsCtrl', function ($scope,$rootScope, $http, myserver) {
        $http({
            url: myserver + '/api/scraps',
            method: 'GET'
        }).then(function (response) {
            $rootScope.products = response.data;
        }).catch(function (fallback) {
            alert("Backend server says: " + fallback.data.message);
        });

    });