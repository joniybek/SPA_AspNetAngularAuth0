var app = angular.module('myApp');
app.factory('Page', function () {
    var title = 'Melony';
    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle;
        }
    };
});
app.value("myserver", "");
app.config(function(authProvider, $httpProvider, jwtInterceptorProvider){
    authProvider.init({
        domain: "",
        clientID: "",
        loginUrl: '/login'
    });
    var refreshingToken = null;
    jwtInterceptorProvider.tokenGetter = function (store, jwtHelper) {
        var token = store.get('token');
        var refreshToken = store.get('refreshToken');
        if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
                return store.get('token');
            } else {
                if (refreshingToken === null) {
                    refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                        store.set('token', idToken);
                        return idToken;
                    }).finally(function () {
                        refreshingToken = null;
                    });
                }
                return refreshingToken;
            }
        }
    }

    $httpProvider.interceptors.push('jwtInterceptor');
});

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if((item.name.toLowerCase().indexOf(searchString) !== -1) ||
            (item.description.toLowerCase().indexOf(searchString) !== -1)){
                result.push(item);
            }
        });
        return result;
    };
});

app.directive("navscroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (!scope.scrollPosition) {
                scope.scrollPosition = 0
            }


            if (scope.$state.$current.name === 'main' && this.pageYOffset > scope.scrollPosition) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
            scope.scrollPosition = this.pageYOffset;
            scope.$apply();
        });
    };
});
app.run(function ($rootScope, auth, store, jwtHelper, $location) {
    var refreshingToken = null;
    $rootScope.$on('$locationChangeStart', function () {
        var token = store.get('token');
        var refreshToken = store.get('refreshToken');

        if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
                if (!auth.isAuthenticated) {
                    auth.authenticate(store.get('profile'), token);
                }
            } else {
                if (refreshToken) {
                    if (refreshingToken === null) {
                        refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                            store.set('token', idToken);
                            auth.authenticate(store.get('profile'), idToken);
                        }).finally(function () {
                            refreshingToken = null;
                        });
                    }
                    return refreshingToken;
                } else {
                    $location.path('/login');
                }
            }
        }
    });
    auth.hookEvents();
});
