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
                                templateUrl: 'charts/chart.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'chart'
                        }
                    });
        }]);

    app.controller('ChartController', ['$log','$scope','$state', function ($log,$scope,$state) {

        $scope.line = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept','Oct','Nov','Dic'],
            series: ['Android', 'iOS'],
            data: [
                [65, 59, 80, 81, 56, 55, 40, 32, 25, 41, 65, 39],
                [28, 48, 40, 19, 86, 27, 90, 48, 40, 19, 48, 40]
            ],
            onClick: function (points, evt) {
                console.log(points, evt);
            }
        };

        $scope.bar = {
            labels: ['Lun', 'Mar', 'Mier', 'Juev', 'Vier', 'Sab', 'Dom'],
            series: ['Android', 'iOS'],

            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]

        };

        $scope.donut = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data: [300, 500, 100]
        };

        $scope.radar = {
            labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

            data:[
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ]
        };

        $scope.pie = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data : [300, 500, 100]
        };

        $scope.polar = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data : [300, 500, 100, 40, 120]
        };

        $scope.dynamic = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data : [300, 500, 100, 40, 120],
            type : 'PolarArea',

            toggle : function ()
            {
                this.type = this.type === 'PolarArea' ?
                    'Pie' : 'PolarArea';
            }
        };

            var init = function () {
                $log.info('App:: Starting chartController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
            };

            init();

        }]);

}(angular.module("pushmeBaby.chart", [
    'ui.router',
    'ngAnimate',
    'chart.js'
])));