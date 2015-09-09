(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.chart', {
                        url: '/chart',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'ChartController',
                                templateUrl: 'chart/chart.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'chart'
                        }
                    });
        }]);

    app.controller('ChartController', ['$log','$scope','$state', function ($log,$scope,$state) {

            var init = function () {
                $log.info('App:: Starting chartController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
            };

            init();

        }]);

}(angular.module("pushmeBaby.chart", [
    'ui.router',
    'ngAnimate'
])));