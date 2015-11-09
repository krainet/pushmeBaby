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
                        autentica: (['authService',  function (authService) {
                            return authService.autentica();
                        }]),
                        schedulerData: (['schedulerService', '$q', '$log',
                            function (schedulerService, $q, $log) {
                                $log.info('scheduler::ResolveData::');
                                var def = $q.defer();
                                schedulerService.getAllCampaigns().then(function (data) {
                                    def.resolve(data);
                                    $log.warn(data);
                                }, function (err) {
                                    def.reject(err);
                                });
                                return def.promise;
                            }]),
                        segmentsData:(['segmentService', '$q', '$log',
                            function (segmentService, $q, $log) {
                                $log.info('segments::ResolveData::');
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

    app.controller('schedulerController', ['$log','$scope','$state','$http','ngTableParams','$filter','schedulerData','$modal','schedulerService','segmentsData',
        function ($log,$scope,$state,$http, ngTableParams,$filter,schedulerData,$modal,schedulerService,segmentsData) {

            var init = function () {
                $log.info('App:: Starting schedulerController');
                $scope.segmentsData = segmentsData;
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.vm={};
                var data = schedulerData.data;
                $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});
            };

            $scope.countCampaign = function(id_campaign) {
                return true;
            };

            $scope.addScheduller = function () {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'scheduler/schedulerModalAdd.tpl.html',
                    size: 'lg',
                    controller: 'schedulerModalAddController',
                    scope: $scope
                });

                $scope.modalInstance.result.then(function(modalResult){
                    schedulerService.submitCampaign(modalResult.campaign_name,modalResult.segment.selectedValues,modalResult.apple,modalResult.android,modalResult.date_send)
                        .then(function(data){
                            schedulerService.getAllCampaigns().then(function (data) {
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

            $scope.editScheduller = function (id) {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'scheduler/schedulerModalEdit.tpl.html',
                    size: 'lg',
                    controller: 'schedulerModalEditController',
                    resolve:{
                        schedulerData: (['schedulerService', '$q', '$log',
                            function (schedulerService, $q, $log) {
                                $log.info('scheduler::ResolveData::');
                                var def = $q.defer();
                                schedulerService.getCampaign(id).then(function (data) {
                                    def.resolve(data);
                                }, function (err) {
                                    def.reject(err);
                                });
                                return def.promise;
                            }]),
                        segmentsData:(['segmentService', '$q', '$log',
                            function (segmentService, $q, $log) {
                                $log.info('segments::ResolveData::');
                                var def = $q.defer();
                                segmentService.getAllsegments().then(function (data) {
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
                    schedulerService.saveCampaign(id,modalResult.campaign_name,modalResult.segment.selectedValues,modalResult.apple,modalResult.android,modalResult.date_send,modalResult.is_draft)
                        .then(function(data){
                            schedulerService.getAllCampaigns().then(function (data) {
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

            $scope.deleteScheduler = function(id){
                schedulerService.deleteCampaign(id)
                    .then(function(data){
                        $log.info(data);
                        schedulerService.getAllCampaigns().then(function (data) {
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

    app.controller('schedulerModalAddController', ['$scope', '$modalInstance', '$log','$rootScope','segmentService',
        function ($scope, $modalInstance, $log, $rootScope,segmentService) {
            var init = function (){
                $scope.model = {};
                $scope.model.android="";
                $scope.model.apple="";
                $scope.max_apple = 107;
                $scope.max_android = 300;
                $scope.model.draft=true;
                $scope.apple_remaining = $scope.max_apple-$scope.model.apple.length;
                $scope.android_remaining = $scope.max_android-$scope.model.android.length;

                $scope.availableSegments3 = $scope.segmentsData.data;
                $scope.model.segment = {};
                //$scope.model.segment.selectedValues = [{"id":2,"name":"Android","value":"2"}];
                $scope.model.segment.selectedValues = [];

                $scope.$watch('model.apple', function() {
                    $scope.apple_remaining = $scope.max_apple-$scope.model.apple.length;
                });
                $scope.$watch('model.android', function() {
                    $scope.android_remaining = $scope.max_android-$scope.model.android.length;
                });
            };

            $scope.tooglePublish = function(id_state){
                $scope.model.draft=id_state===2?$scope.model.draft=false:true;
                $scope.model.publish=id_state===1?$scope.model.publish=false:true;
                $scope.model.is_draft=id_state===1?true:false;
            };

            $scope.ok = function (model) {
                $modalInstance.close(model);
            };

            $scope.cancel = function (model) {
                $modalInstance.dismiss('Exit');
            };

            init();
        }]);

    app.controller('schedulerModalEditController', ['$scope', '$modalInstance', '$log','$rootScope','segmentsData','schedulerData',
        function ($scope, $modalInstance, $log, $rootScope,segmentsData,schedulerData) {
            var init = function (){
                $scope.model = {};
                $scope.model.campaign_name=schedulerData.data.name;
                $scope.model.android=schedulerData.data.message_android;
                $scope.model.apple=schedulerData.data.message_android;
                $scope.model.date_send=new Date(schedulerData.data.date_send);
                $scope.model.draft = schedulerData.data.is_draft?true:false;
                $scope.model.publish = !schedulerData.data.is_draft?true:false;
                $scope.model.is_draft = schedulerData.data.is_draft;
                $scope.max_apple = 107;
                $scope.max_android = 300;
                $scope.apple_remaining = $scope.max_apple-$scope.model.apple.length;
                $scope.android_remaining = $scope.max_android-$scope.model.android.length;

                $scope.availableSegments3 = $scope.segmentsData.data;
                $scope.model.segment = {};
                $scope.model.segment.selectedValues = schedulerData.data.Segments;

                $scope.$watch('model.apple', function() {
                    $scope.apple_remaining = $scope.max_apple-$scope.model.apple.length;
                });
                $scope.$watch('model.android', function() {
                    $scope.android_remaining = $scope.max_android-$scope.model.android.length;
                });
            };

            $scope.tooglePublish = function(id_state){
                $scope.model.draft=id_state===2?$scope.model.draft=false:true;
                $scope.model.publish=id_state===1?$scope.model.publish=false:true;
                $scope.model.is_draft=id_state===1?true:false;
            };

            $scope.ok = function (model) {
                $modalInstance.close(model);
            };

            $scope.cancel = function (model) {
                $modalInstance.dismiss('Exit');
            };

            init();
        }]);

    app.filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

}(angular.module("pushmeBaby.scheduler", [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngTable',
    'schedulerService',
    'segmentService',
    'ngSanitize',
    'ui.select'
])));