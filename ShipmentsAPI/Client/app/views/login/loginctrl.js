angular.module('myApp.login', ['auth0'])
    .controller('LoginCtrl', function ($scope, auth, $location, store, $state) {
        $scope.login = function () {
            auth.signin({}, function (profile, token) {
                store.set('profile', profile);
                store.set('token', token);
                $state.go('main');
                //$location.path('/');
            }, function (error) {
                console.log("There was an error", error);
            });
        }
    });