/*
 * Intercept all requests /responses
 * Ej. use to auth-tokens in headers
 */

angular.module('cInterceptor', [])
        .factory('cInterceptor', ['$q', '$rootScope','localStorageService', function ($q, $rootScope, localStorageService) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};

                        //Get saved data of your custom header from sessionStorage
                        $rootScope.customHeader = localStorageService.get(CUSTOM_HEADER);
                        config.headers = {
                            'Content-type': 'application/json;charset=UTF-8'
                        };

                        //Add custom header/data to request
                        config.headers[CUSTOM_HEADER] = $rootScope.customHeader;
                        return config;
                    },
                    'response': function (response) {
                        //Save data custom header to send in next request
                        if (response.headers(CUSTOM_HEADER) !== null) {
                            $rootScope.customHeader = response.headers(CUSTOM_HEADER);
                            localStorageService.setItem(CUSTOM_HEADER, response.headers(CUSTOM_HEADER));
                        } else {
                            $rootScope.customHeader = localStorageService.get(CUSTOM_HEADER);
                        }
                        response.headers('Allow', '*');
                        return response;
                    },
                    'responseError': function (rejection) {
                        if (rejection.status === 403){
                            localStorageService.set(CUSTOM_HEADER,'no-token');
                        }else{
                            //Nothing
                        }
                        console.log('Reject::');
                        console.log(rejection);
                        return $q.reject(rejection);
                    }
                };
            }
        ]);

