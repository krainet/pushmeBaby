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

    app.controller('SimplepushController', ['$log','$scope','$state','devicetokenService','pushlauncherService','$sce',
        function ($log,$scope,$state,devicetokenService,pushlauncherService,$sce) {

            var init = function () {
                $log.info('App:: Starting simplepushController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.dev = {};
                $scope.dev.show_dialog=false;
                $scope.dev.result = "";
                $scope.dev.platform=0;
                $scope.dev.android_platform=false;
                $scope.dev.apple_platform=false;

                //Prod object
                $scope.prod=$scope.dev;
                $scope.prod.all_platform=true;
            };

            $scope.setDevPlatform = function(id_platform){
                $scope.dev.platform=id_platform;
                $scope.dev.apple_platform=id_platform===2?$scope.dev.apple_platform=false:true;
                $scope.dev.android_platform=id_platform===1?$scope.dev.android_platform=false:true;
            };

            $scope.setPlatform = function(id_platform){
                $scope.prod.platform=id_platform;
                $scope.prod.apple_platform=id_platform===2||id_platform===999?$scope.dev.apple_platform=false:true;
                $scope.prod.android_platform=id_platform===1||id_platform===999?$scope.dev.android_platform=false:true;
                $scope.prod.all_platform=id_platform===1||id_platform===2?$scope.dev.all_platform=false:true;
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

            $scope.getTokenFromDeviceToken = function(){
                if(!$scope.dev.devicetoken){
                    $scope.dev.result = '<i class="fa fa-exclamation-triangle" style="color:red;"></i> No token provided';
                }else{
                    devicetokenService.getTokenFromDeviceToken($scope.dev.devicetoken).then(function(data){
                        $scope.dev.recibedData = data.data;
                        if(data.data){
                            $scope.dev.selectedData = data.data.token;
                            var extra='';
                            if(data.data.token.length>50){
                                extra='...';
                            }
                            $scope.dev.result = '<h6>Token Loaded:</h6><span class="label label-primary">'+data.data.token.substr(0,40)+extra+'</span>';
                        }else{
                            $scope.dev.result = '<i class="fa fa-exclamation-triangle" style="color:red;"></i> No target fixed to send PUSH';
                        }
                        $scope.dev.result = $sce.trustAsHtml($scope.dev.result);
                    });
                }
                $scope.dev.show_dialog=true;
            };

            $scope.sendSimplePush = function(token){
                if($scope.dev.platform===0){
                    alert('Debes seleccionar la plataforma de envio');
                    return false;
                }
                token = $scope.dev.selectedData;

                if(token){
                    pushMsg = {
                        token : token,
                        pushName : $scope.dev.push_name?$scope.dev.push_name:'PushTEST',
                        pushTitle: $scope.dev.push_title?$scope.dev.push_title:'Example push title',
                        pushMessage: $scope.dev.push_message?$scope.dev.push_message:'Push example message ...',
                        platform:$scope.dev.platform
                    };
                    pushlauncherService.sendSimplePush(pushMsg).then(function(data){
                        $log.info('Push send result');
                        $log.info(data);
                    });
                }else{
                    alert('Debes fijar un token al que enviar');
                }
            };

            $scope.clearDevForm = function(){
                $scope.dev.selectedData=null;
                $scope.dev.push_name='';
                $scope.dev.push_title='';
                $scope.dev.push_message='';
                $scope.dev.devicetoken='';
                $scope.dev.id_customer='';
                $scope.dev.email='';
                $scope.dev.show_dialog=false;
            };

            init();
        }]);

}(angular.module("pushmeBaby.simplepush", [
    'ui.router',
    'devicetokenService',
    'pushlauncherService',
    'ngAnimate'
])));