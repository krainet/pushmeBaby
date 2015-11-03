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

    app.controller('schedulerController', ['$log','$scope','$state','$http','ngTableParams','$filter','schedulerData','$modal','schedulerService',
        function ($log,$scope,$state,$http, ngTableParams,$filter,schedulerData,$modal,schedulerService) {

            var init = function () {
                $log.info('App:: Starting schedulerController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.vm={};
                var data = schedulerData.data;
                $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});
            };

            $scope.addScheduller = function () {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'scheduler/schedulerModalAdd.tpl.html',
                    size: 'lg',
                    controller: 'schedulerModalAddController',
                    scope: $scope
                });

                $scope.modalInstance.result.then(function(modalResult){
                    //TODO crear compaign
                    console.log(modalResult.campaign_name,modalResult.segments,modalResult.apple,modalResult.android,modalResult.date_send);
                    schedulerService.submitCampaign(modalResult.campaign_name,modalResult.segments,modalResult.apple,modalResult.android,modalResult.date_send)
                        .then(function(data){
                            console.log(data);
                        },function(err){
                            console.log(err);
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
                    scope: $scope
                });
            };

            init();
        }]);

    app.controller('schedulerModalAddController', ['$scope', '$modalInstance', '$log','$rootScope','segmentService',
        function ($scope, $modalInstance, $log, $rootScope,segmentService) {
            var init = function (){
                $scope.opened = {};
                $scope.model = {};
                $scope.model.android="";
                $scope.model.apple="";
                $scope.max_apple = 107;
                $scope.max_android = 300;
                $scope.apple_remaining = $scope.max_apple-$scope.model.apple.length;
                $scope.android_remaining = $scope.max_android-$scope.model.android.length;


                $scope.availableSegments = ['Android','iOS','Others','WindowsMobile','All'];

                $scope.availableSegments2 = [
                    {id:1,name:'iOS',value:'1'},
                    {id:2,name:'Android',value:'2'},
                    {id:3,name:'All',value:'3'}
                ];
                $scope.model.segment = {};
                $scope.model.segment.selectedValues = [{"id":2,"name":"Android","value":"2"}];
                $scope.model.starttime = new Date();
                $scope.model.endtime = new Date();

                $scope.$watch('model.apple', function() {
                    $scope.apple_remaining = $scope.max_apple-$scope.model.apple.length;
                });
                $scope.$watch('model.android', function() {
                    $scope.android_remaining = $scope.max_android-$scope.model.android.length;
                });
            };

            $scope.opencalendar = function(){
                $scope.open = function() {
                    $timeout(function() {
                        $scope.opened = true;
                    });
                };
            };

            $scope.ok = function (model) {
                $modalInstance.close(model);
            };

            $scope.cancel = function (model) {
                $modalInstance.dismiss('Exit');
            };

            init();
        }]);

    app.controller('schedulerModalEditController', ['$scope', '$modalInstance', '$log','$rootScope',
        function ($scope, $modalInstance, $log, $rootScope) {
            var init = function (){
                $scope.status = {};
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