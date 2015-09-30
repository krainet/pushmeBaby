(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.simplepush', {
                    url: '/simplepush',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'SimplepushController',
                            templateUrl: 'simplepush/simplepush.tpl.html'
                        }
                    },
                    data: {
                        pageTitle: 'Push Simple'
                    }
                });
        }]);

    app.controller('SimplepushController', ['$log','$scope','$state','devicetokenService','pushlauncherService', function ($log,$scope,$state,devicetokenService,pushlauncherService) {

        var init = function () {
            $log.info('App:: Starting simplepushController');
            $scope.model={};
            $scope.model.pageTitle=$state.current.data.pageTitle;
            $scope.dev = {};
            $scope.dev.result = "No data loaded";
        };

        $scope.getTokenFromEmail = function(email){
            devicetokenService.getTokenFromDeviceToken($scope.dev.email).then(function(data){
                $scope.dev.recibedData = data.data;
                if(data.data){
                    $scope.dev.selectedData = data.data.token;
                    $scope.dev.result = "Token found and loaded";
                }else{
                    $scope.dev.result = "No results";
                }
            });
        };

        $scope.getTokenFromIdCustomer = function(id_customer){
            devicetokenService.getTokenFromDeviceToken($scope.dev.id_customer).then(function(data){
                $scope.dev.recibedData = data.data;
                if(data.data){
                    $scope.dev.selectedData = data.data.token;
                    $scope.dev.result = "Token found and loaded";
                }else{
                    $scope.dev.result = "No results";
                }
            });
        };

        $scope.getTokenFromDeviceToken = function(devicetoken){
            devicetokenService.getTokenFromDeviceToken($scope.dev.devicetoken).then(function(data){
                $scope.dev.recibedData = data.data;
                if(data.data){
                    $scope.dev.selectedData = data.data.token;
                    $scope.dev.result = "Token found and loaded";
                }else{
                    $scope.dev.result = "No results";
                }
            });
        };

        $scope.sendSimplePush = function(token){
            console.log('entramos');
            token = $scope.dev.selectedData;
            if(token){
                pushlauncherService.sendSimplePush(token).then(function(data){
                    console.log(data);
                });
            }
        };

        init();
    }]);

}(angular.module("pushmeBaby.simplepush", [
    'ui.router',
    'devicetokenService',
    'pushlauncherService'
])));