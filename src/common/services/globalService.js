/* 
 * Global Services Test Módule
 */
angular.module('globalService', [])
        .factory('globalService', ['$resource', '$q', '$log','localStorageService','$rootScope',
            function ($resource, $q, $log, localStorageService, $rootScope) {
                return {
                    api: function (extra_route) {
                        if (!extra_route) {
                            extra_route = '';
                        }
                        return $resource(API_URL + '/' + extra_route, {}, {
                            query: {
                                timeout: 15000
                            },
                            save: {
                                timeout: 15000,
                                method: 'POST'
                            },
                            get: {
                                timeout: 15000,
                                method: 'GET'
                            }
                        });
                    },
                    getAction: function () {
                        //Service action with promise resolve (then)
                        var def = $q.defer();
                        this.api().get({}, {}, function (data) {
                            $log.warn('Api::data:: ');
                            $log.warn(data);
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    testFunction: function () {
                        alert('testFunction');
                    },
                    getUrlParam: function (parameterName) {
                        parameterName += "=";
                        var parameterValue = (location.hash.indexOf(parameterName)) ? location.hash.substring(location.hash.indexOf(parameterName) + parameterName.length) : null;
                        if (parameterValue !== null && parameterValue.indexOf('&') >= 0) {
                            parameterValue = parameterValue.substring(0, parameterValue.indexOf('&'));
                        }
                        return parameterValue;
                    },
                    saveCsrfToken: function (token) {

                    },
                    setStorage: function (key, value) {
                        var def = $q.defer();
                        if (key && value) {
                            /*if ($rootScope.onlyCookiesSupport) {
                                //Only Cookie Support
                                localStorageService.cookie.set(key, value);
                            } else {*/
                                //Storage Support
                                localStorageService.set(key, value);
                          //  }
                        }
                        def.resolve();
                        return def.promise;
                    },
                    getStorage: function (key) {
                        var def = $q.defer();
                        if (key) {
                            /*if ($rootScope.onlyCookiesSupport) {
                                //Only Cookie Support
                                def.resolve(localStorageService.cookie.get(key));
                            } else {*/
                                //Storage Support
                                def.resolve(localStorageService.get(key));
                            //}
                        } else {
                            $log.debug('No key to read...');
                            def.resolve(false);
                        }
                        return def.promise;
                    },
                    removeStorage: function (key) {
                        var def = $q.defer();
                        if (key) {
                            localStorageService.cookie.remove(key);
                            localStorageService.remove(key);
                        } else {
                            $log.debug('No key to delete...');
                        }
                        def.resolve();
                        return def.promise;
                    },
                    removeAllStorage: function (type) {
                        var def = $q.defer();
                        if (type === 1) {
                            //remove LOCALSTORAGE
                            localStorageService.clearAll();
                        } else {
                            //remove Cookies
                            localStorageService.cookie.clearAll();
                        }
                        def.resolve();
                        return def.promise;
                    }

                };
            }]);



