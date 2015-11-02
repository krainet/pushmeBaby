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

    app.controller('schedulerController', ['$log','$scope','$state','$http','ngTableParams','$filter','schedulerData','$modal',
        function ($log,$scope,$state,$http, ngTableParams,$filter,schedulerData,$modal) {

            var init = function () {
                $log.info('App:: Starting schedulerController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                //$scope.isCollapsed = false;

            };

            init();

            var data = schedulerData.data;

            $scope.vm={};
            $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});

            $scope.addScheduller = function () {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'scheduler/schedulerModalAdd.tpl.html',
                    size: 'lg',
                    controller: 'schedulerModalAddController',
                    scope: $scope
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

        }]);

    app.controller('schedulerModalAddController', ['$scope', '$modalInstance', '$log','$rootScope','segmentService',
        function ($scope, $modalInstance, $log, $rootScope,segmentService) {
            var init = function (){
                $scope.status = {};
                $scope.disabled = undefined;
                $scope.searchEnabled = undefined;
                $scope.enable = function() {
                    $scope.disabled = false;
                };
                $scope.disable = function() {
                    $scope.disabled = true;
                };
                $scope.enableSearch = function() {
                    $scope.searchEnabled = true;
                };
                $scope.disableSearch = function() {
                    $scope.searchEnabled = false;
                };
                $scope.clear = function() {
                    $scope.person.selected = undefined;
                    $scope.address.selected = undefined;
                    $scope.country.selected = undefined;
                };
                $scope.someGroupFn = function (item){
                    if (item.name[0] >= 'A' && item.name[0] <= 'M'){
                        return 'From A - M';
                    }
                    if (item.name[0] >= 'N' && item.name[0] <= 'Z'){
                        return 'From N - Z';
                    }

                };

                $scope.counter = 0;
                $scope.someFunction = function (item, model){
                    $scope.counter++;
                    $scope.eventResult = {item: item, model: model};
                };

                $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

                $scope.multipleDemo = {};
                $scope.multipleDemo.colors = ['Blue','Red'];

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
    'ngAnimate',
    'ngTable',
    'schedulerService',
    'segmentService',
    'ngSanitize',
    'ui.select'
])));