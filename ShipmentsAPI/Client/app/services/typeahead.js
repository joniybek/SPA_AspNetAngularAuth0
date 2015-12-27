var app = angular.module('myApp');
app.factory('searchFactory', ['searchtxt', function (searchtxt, $http) {
    return $http({
        url: myserver + '/query/scraps/typeahead/' + searchtxt,
        method: 'GET'
    }).then(function (response) {
        return response.data;
    });
}]);
