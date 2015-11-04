(function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider','localStorageServiceProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider,localStorageServiceProvider) {
            $urlRouterProvider.otherwise('/auth');
            $httpProvider.interceptors.push('cInterceptor');
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            //LocalStorage Service Provider
            localStorageServiceProvider
                .setPrefix('')
                .setStorageType('localStorage')
                .setStorageCookie(7, '/')
                .setStorageCookieDomain('pushmebaby.yeeday.net/')
                .setNotify(true, true);

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

    app.controller('AppController', ['$rootScope', '$state', '$log',function ($rootScope, $state, $log ) {
        $log.info('App:: Starting AppController');
        $rootScope.userData = {};

    }]);

    app.controller('FrontController', ['$scope', '$log', function ($scope, $log) {
        $log.info('App:: Starting FrontController');
        $scope.isCollapsed = true;
    }]);

    app.controller('FooterController', ['$scope', '$log', function ($scope, $log) {
        $log.info('App:: Starting FooterController');
    }]);

}(angular.module('pushmeBaby',[
    'ngResource',
    'ngSanitize',
    'globalService',
    'pushmeBaby.home',
    'pushmeBaby.newsletterMaker',
    'pushmeBaby.newsletterScheduler',
    'pushmeBaby.newsletterTemplateMaker',
    'pushmeBaby.apitest',
    'pushmeBaby.chart',
    'pushmeBaby.scheduler',
    'pushmeBaby.simplepush',
    'pushmeBaby.devicetoken',
    'pushmeBaby.segment',
    'pushmeBaby.pushhistory',
    'pushmeBaby.auth',
    'LocalStorageModule',
    'authService',
    'ui.bootstrap',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'cInterceptor',
    'genericDirectives',
    'ngAnimate',
    'chart.js',
    'ngTable',
    'textAngular',
    'sticky'
])));
