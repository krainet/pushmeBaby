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

    app.controller('segmentController', ['$log','$scope','$state','$http','ngTableParams','$filter','segmentData','$modal',
        function ($log,$scope,$state,$http,ngTableParams,$filter,segmentData,$modal) {

            var init = function () {
                $log.info('App:: Starting segmentController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.isCollapsed = false;



            };

            init();

            $scope.addSegment = function () {
                // $log.debug($scope.models.selected.color);
                $scope.modalInstance = $modal.open({
                    templateUrl: 'segments/segmentModalAdd.tpl.html',
                    size: 'lg',
                    controller: 'segmentModalAddController',
                    scope: $scope
                });
            };
            $scope.editSegment = function (id) {
                // $log.debug($scope.models.selected.color);
                $scope.modalInstance = $modal.open({
                    templateUrl: 'segments/segmentModalEdit.tpl.html',
                    size: 'lg',
                    controller: 'segmentModalEditController',
                    scope: $scope
                });
            };


            var data = segmentData.data;

            $scope.vm={};
            $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});

        }]);

    app.controller('segmentModalAddController', ['$scope', '$modalInstance', '$log','$rootScope',
        function ($scope, $modalInstance, $log, $rootScope) {
            var init = function (){
                $scope.status = {};
            };

            init();

        }]);

    app.controller('segmentModalEditController', ['$scope', '$modalInstance', '$log','$rootScope',
        function ($scope, $modalInstance, $log, $rootScope) {
            var init = function (){
                $scope.status = {};
            };

            init();

        }]);

}(angular.module("pushmeBaby.segment", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'segmentService'
])));