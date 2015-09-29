(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.about', {
                    url: '/about',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'AboutController',
                            templateUrl: 'about/about.tpl.html'
                        }
                    },
                    data: {
                        pageTitle: 'About'
                    }
                });
        }]);

    app.controller('AboutController', ['$scope', '$log','$state','$modal', function ($scope, $log, $state, $modal) {
        $log.info('App:: Starting AboutController');

        var init = function () {
            $scope.model = {};
            $scope.model.pageTitle = $state.current.data.pageTitle;
        };
        init();


        $scope.models = {
            selected: null,
            templates: [
                {type: "item", id: 1},
                {type: "item2", id: 1},
                {type: "header1", id: 1},
                {type: "disclaimer1", id: 1},
                {type: "footer1", id: 1},
                {type: "image1", id: 1, link:'http://str.yeeday.net/img/cm/es/mqu/no_image.png', linkDestination:''},
                {type: "freeHtml", id: 1, html:''},
                {type: "crosseling", id: 1},
                {type: "verMejoresB", id: 1},
                {type: "container", id: 1, columns: [[], []]},
                {type: "container3", id: 1, columns: [[],[],[]]}
            ],
            dropzones: {
                "A": [
                    {
                        "type": "header1",
                        "id": "1"
                    },

                ],
                "B": [

                ]
            }
        };

        $scope.$watch('models.dropzones', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.setImage = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: 'about/setImage.modal.tpl.html',
                size: 'md',
                scope: $scope
            });

            // Cuando cerramos el modal...
            $scope.modalInstance.result.then(function (newUrl) {
               // $log.debug(newUrl, newUrlDest);
                if (newUrl.link === 'reset') {
                    $scope.models.selected.link = 'http://str.yeeday.net/img/cm/es/mqu/no_image.png';
                    $scope.models.selected.linkDestination = '';
                }
                else {
                    $scope.models.selected.link = newUrl.link;
                    $scope.models.selected.linkDestination = newUrl.link2;
                }


            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }]);

}(angular.module("pushmeBaby.about", [
    'ui.router',
    'dndLists'
])));