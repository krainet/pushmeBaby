/*jshint newcap:false*/
(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.segment', {
                    url: '/segment',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'segmentController',
                            templateUrl: 'segments/segment.tpl.html'
                        }
                    },
                    resolve:{
                        segmentData: (['segmentService', '$q', '$log',
                            function (segmentService, $q, $log) {
                                $log.info('segment::ResolveData::');
                                var def = $q.defer();
                                segmentService.getAllsegments().then(function (data) {
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

    app.controller('segmentController', ['$log','$scope','$state','$http','ngTableParams','$filter','segmentData','$modal','segmentService',
        function ($log,$scope,$state,$http,ngTableParams,$filter,segmentData,$modal,segmentService) {

            var init = function () {
                $log.info('App:: Starting segmentController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.isCollapsed = false;
                var data = segmentData.data;
                $scope.vm={};
                $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});
            };

            $scope.addSegment = function () {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'segments/segmentModalAdd.tpl.html',
                    size: 'lg',
                    controller: 'segmentModalAddController',
                    scope: $scope
                });

                $scope.modalInstance.result.then(function(modalResult){
                    segmentService.submitSegment(modalResult.name,modalResult.description,modalResult.configuration)
                        .then(function(data){
                            segmentService.getAllsegments().then(function (data) {
                                $scope.vm.tableParams = new ngTableParams({count:5}, { data: data.data,counts:[5,10,15,20]});
                            }, function (err) {
                                $log.error(err);
                            });
                        },function(err){
                            $log.error(err);
                        });
                },function(err){
                    $log.error('Dismissed'+err);
                });



            };
            $scope.editSegment = function (id) {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'segments/segmentModalEdit.tpl.html',
                    size: 'lg',
                    controller: 'segmentModalEditController',
                    resolve: {
                        segmentData: (['segmentService', '$q', '$log',
                            function (segmentService, $q, $log) {
                                $log.info('segment::ResolveData::');
                                var def = $q.defer();
                                segmentService.getSegment(id).then(function (data) {
                                    def.resolve(data);
                                }, function (err) {
                                    def.reject(err);
                                });
                                return def.promise;
                            }])
                    },
                    scope: $scope
                });

                $scope.modalInstance.result.then(function(modalResult){
                    segmentService.saveSegment(id,modalResult.name,modalResult.description,modalResult.configuration)
                        .then(function(data){
                            segmentService.getAllsegments().then(function (data) {
                                $scope.vm.tableParams = new ngTableParams({count:5}, { data: data.data,counts:[5,10,15,20]});
                            }, function (err) {
                                $log.error(err);
                            });
                        },function(err){
                            $log.error(err);
                        });
                },function(err){
                    $log.error('Dismissed'+err);
                });


            };

            $scope.deleteSegment = function(id) {
                segmentService.deleteSegment(id).then(function(data){
                    $log.info(data);
                    segmentService.getAllsegments().then(function (data) {
                        $scope.vm.tableParams = new ngTableParams({count:5}, { data: data.data,counts:[5,10,15,20]});
                    }, function (err) {
                        $log.error(err);
                    });
                },function(err){
                    $log.error(err);
                });
            };

            init();
        }]);

    app.controller('segmentModalAddController', ['$scope', '$modalInstance', '$log','$rootScope',
        function ($scope, $modalInstance, $log, $rootScope) {
            var init = function (){
                $scope.status = {};
            };

            $scope.ok = function (model) {
                $modalInstance.close(model);
            };

            $scope.cancel = function (model) {
                $modalInstance.dismiss('Exit');
            };
            init();
        }]);

    app.controller('segmentModalEditController', ['$scope', '$modalInstance', '$log','$rootScope','segmentData',
        function ($scope, $modalInstance, $log, $rootScope,segmentData) {
            var init = function (){
                console.log(segmentData);
                $scope.status = {};
                $scope.model={};
                $scope.model.name = segmentData.data.name;
                $scope.model.description = segmentData.data.description;
                $scope.model.configuration = segmentData.data.configuration;
            };

            $scope.ok = function (model) {
                $modalInstance.close(model);
            };

            $scope.cancel = function (model) {
                $modalInstance.dismiss('Exit');
            };
            init();
        }]);

}(angular.module("pushmeBaby.segment", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'segmentService'
])));