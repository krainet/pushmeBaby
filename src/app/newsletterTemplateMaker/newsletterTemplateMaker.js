(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.newsletterTemplateMaker', {
                    url: '/newsletterTemplateMaker',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'newsletterTemplateMakerController',
                            templateUrl: 'newsletterTemplateMaker/newsletterTemplateMaker.tpl.html'
                        }
                    },
                    resolve:{

                    },
                    data: {
                        pageTitle: 'newsletterTemplateMaker'
                    }
                });
        }]);

    app.controller('newsletterTemplateMakerController', ['$scope', '$log','$state', '$modal', 'newsletterTemplateMakerService',
        function ($scope, $log, $state, $modal, newsletterTemplateMakerService) {
            $log.info('App:: Starting newsletterTemplateMakerController');

            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;
                $scope.data = {};
            };
            init();
        }]);

}(angular.module("pushmeBaby.newsletterTemplateMaker", [
    'ui.router',
    'ngAnimate',
    'ngTable',
    'dndLists',
    'textAngular',
    'sticky',
    'newsletterTemplateMakerService',
])));