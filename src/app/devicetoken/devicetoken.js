/*jshint newcap:false*/
(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.devicetoken', {
                    url: '/devicetoken',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'devicetokenController',
                            templateUrl: 'devicetoken/devicetoken.tpl.html'
                        }
                    },
                    resolve:{

                        autentica: (['authService',  function (authService) {
                            return authService.autentica();
                        }]),
                        tokensData: (['devicetokenService', '$q', '$log',
                            function (devicetokenService, $q, $log) {
                                $log.info('Devicetokens::ResolveData::');
                                var def = $q.defer();
                                devicetokenService.getAllTokens().then(function (data) {
                                    def.resolve(data);
                                    $log.warn(data);
                                }, function (err) {
                                    def.reject(err);
                                });
                                return def.promise;
                            }])
                    },
                    data: {
                        pageTitle: 'Tokens'
                    }
                });
        }]);

    app.controller('devicetokenController', ['$log','$scope','$state','$http','ngTableParams','$filter','tokensData',
        function ($log,$scope,$state,$http,ngTableParams,$filter,tokensData) {

            var init = function () {
                $log.info('App:: Starting devicetokenController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.isCollapsed = false;

                var data = tokensData.data;
                $scope.vm={};
                $scope.vm.tableParams = new ngTableParams({count:5}, { data: data,counts:[5,10,15,20]});

            };

            init();


        }]);

}(angular.module("pushmeBaby.devicetoken", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'devicetokenService'
])));