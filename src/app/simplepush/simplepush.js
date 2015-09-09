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

    app.controller('SimplepushController', ['$log','$scope','$state', function ($log,$scope,$state) {

        var init = function () {
            $log.info('App:: Starting simplepushController');
            $scope.model={};
            $scope.model.pageTitle=$state.current.data.pageTitle;
        };

        init();

    }]);

}(angular.module("pushmeBaby.simplepush", [
    'ui.router'
])));