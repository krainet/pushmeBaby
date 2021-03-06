/*jshint newcap:false*/
(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.newsletterScheduler', {
                    url: '/newsletterscheduler',
                    parent: 'root',
                    resolve: {
                        autentica: (['authService', function (authService) {
                            return authService.autentica();
                        }]),
                    },
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

            var init = function (msg) {
                $log.info('App:: Starting newsletterSchedulerController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;
                $scope.isCollapsed = false;
                $scope.data = {};
                $scope.vm={};

                $scope.alerts = [msg];
                newsletterMakerService.getNewsIds().then(function (data) {
                    $scope.vm.tableParams = new ngTableParams({count:20, sorting:{updatedAt:'desc'}}, { data: data,counts:[20,30,50,100]});
                }, function (err) {
                    $log.err(err);
                });

            };

            init({ type: 'warning', msg: 'Bienvenido a NewsLetterScheduler, Duplica, envia o elimina Newsletters!!', time:'3000' });

            $scope.addAlert = function(msg, type, time) {
                $scope.alerts.push({msg: msg, type: type, time:time});
            };

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };


            $scope.duplicate = function(id){
                $scope.addAlert('Duplicando ' + id +'...',  'warning', 3000);
                newsletterMakerService.duplicateNews(id).then(function (data) {
                    init({msg:'Newsletter duplicada correctamente', type: 'success', time: 3000});
                }, function (err) {
                    $scope.addAlert('Error al duplicar!', 'danger', 3000);
                    $log.error(err);
                });
            };

            $scope.delete = function(id){
                $scope.addAlert('Se esta eliminando la newsletter ' + id +'...',  'warning', 3000);
                newsletterMakerService.deleteNews(id).then(function (data) {
                    init({msg:'Newsletter '+id+' eliminada correctamente', type: 'success', time: 3000});
                }, function (err) {
                    $scope.addAlert('Error al eliminar!', 'danger', 3000);
                    $log.error(err);
                });
            };

            $scope.send = function(id, account, country){
                $scope.addAlert('Se esta subiendo la newsletter ' + id + ' a: ' + account + ', ' + country +'...', 'warning', 5000);
                newsletterSchedulerService.sendNews(id).then(function (data) {
                    init({msg:'Newsletter '+id+' subida correctamente', type: 'success', time: 3000});
                }, function (err) {
                    $scope.addAlert('Error al enviar!', 'danger', 3000);
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
                    $state.go('root.newsletterMaker', {'id_news' : data.id});
                }, function (err) {
                    $scope.addAlert('Error al crear nueva Newsletter!', 'danger', 3000);
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