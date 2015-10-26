/*jshint newcap:false*/
(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.scheduler', {
                    url: '/scheduler',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'schedulerController',
                            templateUrl: 'scheduler/scheduler.tpl.html'
                        }
                    },
                    resolve:{
                        schedulerData: (['schedulerService', '$q', '$log',
                            function (schedulerService, $q, $log) {
                                $log.info('scheduler::ResolveData::');
                                var def = $q.defer();
                                schedulerService.getAllschedulers().then(function (data) {
                                    def.resolve(data);
                                    $log.warn(data);
                                }, function (err) {
                                    def.reject(err);
                                });
                                return def.promise;
                            }])
                    },
                    data: {
                        pageTitle: 'Programar'
                    }
                });
        }]);

    app.controller('schedulerController', ['$log','$scope','$state','$http','ngTableParams','$filter','schedulerData',
        function ($log,$scope,$state,$http, ngTableParams,$filter,schedulerData) {

            var init = function () {
                $log.info('App:: Starting schedulerController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.isCollapsed = false;



            };

            init();

            var data = schedulerData.data;

            $scope.vm={};
            $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});

        }]);

}(angular.module("pushmeBaby.scheduler", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'schedulerService'
])));