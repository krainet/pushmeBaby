/*jshint newcap:false*/
(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.newsletterScheduler', {
                    url: '/newsletterscheduler',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'newsletterSchedulerController',
                            templateUrl: 'newsletterScheduler/newsletterScheduler.tpl.html'
                        }
                    },
                    data: {
                        pageTitle: 'Programar'
                    }
                });
        }]);

    app.controller('newsletterSchedulerController', ['$log','$scope','$state','$http','ngTableParams','$filter','newsletterMakerService', 'newsletterSchedulerService',
        function ($log,$scope,$state,$http,ngTableParams,$filter,newsletterMakerService, newsletterSchedulerService) {

            var news = function (callbackFunc) {
                newsletterMakerService.getNewsIds().then(function (data) {
                    callbackFunc(data);
                }, function (err) {
                    callbackFunc ([]);
                });
            };

            var init = function () {
                $log.info('App:: Starting newsletterSchedulerController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.isCollapsed = false;
                $scope.data = {};
                $scope.vm={};
                newsletterMakerService.getNewsIds().then(function (data) {
                    $scope.vm.tableParams = new ngTableParams({count:5}, { data: data ,counts:[5,10,15,20]});
                }, function (err) {
                    $log.err(err);
                });

            };


            init();
            /*
             function randomDate(start, end) {
             var mydate=new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
             return mydate.yyyymmdd();
             }

             var self = this;
             var data = [];

             for (i = 0; i < 201; i++) {
             data.push({id:i,name: "Push "+Math.floor( Math.random() * 500), msg:"Push prueba "+Math.floor( Math.random() * 500), dateSend:randomDate(new Date(2015,0,1), new Date())});
             }
             */
            //  var data = newsletterSchedulerData.data;



            $scope.duplicate = function(id){
                newsletterMakerService.duplicateNews(id).then(function (data) {
                    init();
                }, function (err) {
                    $log.error(err);
                });
            };

            $scope.delete = function(id){
                newsletterMakerService.deleteNews(id).then(function (data) {
                    init();
                }, function (err) {
                    $log.error(err);
                });
            };

            $scope.send = function(id){
                newsletterSchedulerService.sendNews(id).then(function (data) {
                    $log.error(data);
                    init();
                }, function (err) {
                    $log.error(err);
                });
            };

            $scope.edit = function(id) {
                $state.go('root.newsletterMaker', {'id_news' : id});
            };
            $scope.new = function() {
                var params = {
                    name: 'Newsletter',
                    shop: 'mqu',
                    json: JSON.stringify({model : []}),
                    html: JSON.stringify('')
                };
                newsletterMakerService.createNewsLetter(params).then(function (data) {
                    $log.debug(data);
                    // loadModel(data);
                    $state.go('root.newsletterMaker', {'id_news' : data.id});
                }, function (err) {
                    // def.reject(err);
                });
            };

        }]);

}(angular.module("pushmeBaby.newsletterScheduler", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'newsletterSchedulerService',
    'newsletterMakerService'
])));