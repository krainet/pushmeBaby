/*
/!*
 * Config Services
 *!/
angular.module('configService', [])
    .factory('configService', ['$resource', '$q', '$log',
        function ($resource, $q, $log) {
            return {

                autentica: function () {
                    alert('¡Debes identificarte!');
                    var def = $q.defer();
                    def.resolve(true);

                    return def.$promise;
             //       return true;
                  //  $scope.showLoginModal = function() {
                 /!*       $scope.modalInstance = $uibModal.open({
                            controller: 'authController',
                            animation: true,
                            templateUrl: 'auth/auth.tpl.html',
                            size: 'md',
                            scope: $scope,
                        });
*!/
                        /!*$scope.modalInstance.result.then(function () {
                            /!** do nothing *!/
                            $log.debug("Auth ok");
                            return true;
                        }, function () {
                           // $state.go('root');
                            return false;
                            /!** do nothing *!/
                        });*!/

               //     };

                   /!* $log.debug("Hi ha token???" + localStorageService.get(CUSTOM_HEADER));
                    if (!localStorageService.get(CUSTOM_HEADER)) {
                        $log.debug("no token");
                        $scope.showLoginModal();
                    }*!/
                }

            };
        }]);

*/
