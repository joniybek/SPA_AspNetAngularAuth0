var app = angular.module('myApp',
    [
        'auth0',
        'ui.router',
        //, 'ngAnimate'
        'angular-storage',
        'angular-jwt',
        'ui.bootstrap',
        'myApp.login',
        'myApp.slider'
        ,'myApp.products'
        ,'myApp.addproduct'
        , 'myApp.search'
    ]
);

app.controller('mainCtrl', function ($scope, $state, Page, auth, store, $state) {
    $scope.Page = Page;
    $scope.$state = $state;
    $scope.auth=auth;
    $scope.logout = function () {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        store.remove('refreshToken');
        $state.go("main");
    }
});
