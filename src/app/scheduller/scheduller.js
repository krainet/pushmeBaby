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
                    resolve:{
                        schedullerData: (['schedullerService', '$q', '$log',
                            function (schedullerService, $q, $log) {
                                $log.info('Scheduller::ResolveData::');
                                var def = $q.defer();
                                schedullerService.getAllSchedullers().then(function (data) {
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

    app.controller('SchedullerController', ['$log','$scope','$state','$http','ngTableParams','$filter','schedullerData',
        function ($log,$scope,$state,$http,ngTableParams,$filter,schedullerData) {

            var init = function () {
                $log.info('App:: Starting schedullerController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.isCollapsed = false;



            };

            init();
/*
            function randomDate(start, end) {
                var mydate=new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                return mydate.yyyymmdd();
            }

            var self = this;
            var data = [];

            for (i = 0; i < 201; i++) {
                data.push({id:i,name: "Push "+Math.floor( Math.random() * 500), msg:"Push prueba "+Math.floor( Math.random() * 500), dateSend:randomDate(new Date(2015,0,1), new Date())});
            }
            */
            var data = schedullerData.data;

            $scope.vm={};
            $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});

        }]);

}(angular.module("pushmeBaby.scheduller", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'schedullerService'
])));