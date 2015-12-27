var app = angular.module('myApp');
app.config(function ($stateProvider) {
    $stateProvider
        .state('addproduct', {
            url: '/addproduct',
            templateUrl: 'views/addproduct/addproduct.html ',
            authenticate: true
        })

        .state('search', {
            url: '/search',
            templateUrl: 'views/search/search.html '
        })

        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'views/login/login.html '
        })

        .state('main', {
            url: '',
            templateUrl: 'views/main/main.html '
        });

});
