/*jshint newcap:false*/
(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.scheduller', {
                    url: '/scheduller',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'SchedullerController',
                            templateUrl: 'scheduller/scheduller.tpl.html'
                        }
                    },
                    data: {
                        pageTitle: 'Programar'
                    }
                });
        }]);

    app.controller('SchedullerController', ['$log','$scope','$state','$http','ngTableParams','$filter',
        function ($log,$scope,$state,$http,ngTableParams,$filter) {

        var init = function () {
            $log.info('App:: Starting schedullerController');
            $scope.model={};
            $scope.model.pageTitle=$state.current.data.pageTitle;
        };

        init();

        //Dummy data
        $http.get('https://jsonplaceholder.typicode.com/users').
            then(function(data){

                /* jshint ignore:start */
                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    total: data.data.length, // length of data
                    count: 5           // count per page
                });
                /* jshint ignore:end */
                $scope.users = data.data;

                console.log(data.data);
            });


    }]);

}(angular.module("pushmeBaby.scheduller", [
    'ui.router',
    'ngAnimate',
    'ngTable'
])));