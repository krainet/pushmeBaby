/* 
 * Api Test Módule
 */
angular.module('authService', [])
        .factory('authService', ['$resource', '$q', '$log',
            function ($resource, $q, $log) {
                return {
                    api: function (extra_route) {
                        if (!extra_route) {
                            extra_route = '';
                        }
                        return $resource(API_URL + '/auth' + extra_route, {}, {
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
                    getUserInfo: function () {
                        //Service action with promise resolve (then)
                        var def = $q.defer();
                        this.api('').get({}, {}, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    submitLogin: function (username,password) {
                        //Service action with promise resolve (then)
                        var def = $q.defer();
                        postData = {
                            username:username,
                            password:password
                        };
                        this.api().save({}, postData, function (data) {
                            def.resolve(data);
                            if(data.token){

                            }
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    testFunction: function () {
                        alert('testFunction');
                    }
                };
            }]);



