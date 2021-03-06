(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.home', {
                        url: '/home',
                        parent: 'root',
                        resolve: {
                            autentica: (['authService', function (authService) {
                                return authService.autentica();
                            }]),
                        },
                        views: {
                            "container@": {
                                controller: 'HomeController',
                                templateUrl: 'home/home.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Home'
                        }
                    });
        }]);

    app.controller('HomeController', ['$log','$scope','$state', function ($log,$scope,$state) {

            var init = function () {
                $log.info('App:: Starting HomeController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
            };

            init();

        }]);

}(angular.module("pushmeBaby.home", [
    'ui.router',
    'ngAnimate'
])));