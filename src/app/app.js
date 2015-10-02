(function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $httpProvider.interceptors.push('cInterceptor');

            //Root view, very important resolve data async before states
            $stateProvider
                    .state('root', {
                        url: '',
                        abstract: true,
                        views: {
                            'header': {
                                templateUrl: 'header.tpl.html',
                                controller: 'FrontController'
                            },
                            'footer': {
                                templateUrl: 'footer.tpl.html',
                                controller: 'FooterController'
                            }
                        }
                    });
            
            //Remove hashtag from URL
            $locationProvider.html5Mode(true);
        }
    ]);

    app.run(['$log', function ($log) {

            //Testing $log 
            /*
             $log.log('App::log:: Log');
             $log.warn('App::log:: warn');
             $log.info('App::log:: info');
             $log.error('App::log:: error');
             */
        }]);

    app.controller('AppController', ['$scope', '$log', function ($scope, $log) {
            $log.info('App:: Starting AppController');
        }]);

    app.controller('FrontController', ['$scope', '$log','$location', function ($scope, $log,$location) {
            $log.info('App:: Starting FrontController');

            
            $scope.isCollapsed = true;

        }]);

    app.controller('FooterController', ['$scope', '$log', function ($scope, $log) {
            $log.info('App:: Starting FooterController');
        }]);

}(angular.module("pushmeBaby", [
    'ngResource',
    'globalService',
    'pushmeBaby.home',
    'pushmeBaby.about',
    'pushmeBaby.apitest',
    'pushmeBaby.chart',
    'pushmeBaby.scheduller',
    'pushmeBaby.simplepush',
    'pushmeBaby.devicetoken',
    'pushmeBaby.segment',
    'pushmeBaby.pushhistory',
    'ui.bootstrap',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'cInterceptor',
    'genericDirectives',
    'ngAnimate',
    'chart.js',
    'ngTable'
])));
