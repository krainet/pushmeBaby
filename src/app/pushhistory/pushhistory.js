/*jshint newcap:false*/
(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.pushhistory', {
                    url: '/pushhistory',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'pushhistoryController',
                            templateUrl: 'pushhistory/pushhistory.tpl.html'
                        }
                    },
                    resolve:{
                        pushhistoryData: (['pushhistoryService', '$q', '$log',
                            function (pushhistoryService, $q, $log) {
                                $log.info('pushhistory::ResolveData::');
                                var def = $q.defer();
                                pushhistoryService.getAllpushhistorys().then(function (data) {
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

    app.controller('pushhistoryController', ['$log','$scope','$state','$http','ngTableParams','$filter','pushhistoryData',
        function ($log,$scope,$state,$http,ngTableParams,$filter,pushhistoryData) {

            var init = function () {
                $log.info('App:: Starting pushhistoryController');
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
            var data = pushhistoryData.data;

            $scope.vm={};
            $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});

        }]);

}(angular.module("pushmeBaby.pushhistory", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'pushhistoryService'
])));