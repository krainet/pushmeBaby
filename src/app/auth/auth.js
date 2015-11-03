(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.auth', {
                    url: '/auth',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'authController',
                            templateUrl: 'auth/auth.tpl.html'
                        }
                    },
                    data: {
                        pageTitle: 'auth'
                    }
                });
        }]);

    app.controller('authController', ['$scope','$log', 'authService','$state', function ($scope,$log, authService,$state) {
        $scope.myjson={};

        var init = function () {
            $log.info('App:: Starting authController');

            $scope.model={};
            $scope.model.pageTitle=$state.current.data.pageTitle;

            $scope.isAuthenticated = function(){
                authService.getUserInfo().then(function (data) {
                }, function (err) {
                    $log.error(err);
                });
            };
        };

        $scope.submitLogin = function(){
            alert('hola');
            authService.submitLogin($scope.login.username,$scope.login.password).then(function (data) {
                $log.debug(data);
            }, function (err) {
                $log.error(err);
            });
        };

        init();
    }]);

}(angular.module("pushmeBaby.auth", [
    'ui.router',
    'authService'
])));