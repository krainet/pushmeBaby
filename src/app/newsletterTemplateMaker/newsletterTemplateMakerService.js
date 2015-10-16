angular.module('newsletterTemplateMakerService', [])
    .factory('newsletterTemplateMakerService', ['$resource', '$q', '$log',
        function ($resource, $q, $log) {
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
                            withCredentials: true,
                            timeout: 15000,
                            method: 'POST'
                        },
                        update: {
                            withCredentials: true,
                            timeout: 15000,
                            method: 'PUT'
                        },
                        get: {
                            timeout: 15000,
                            method: 'GET'
                        },
                        remove: {
                            timeout: 15000,
                            method: 'DELETE'
                        }
                    });
                },
                getShops: function () {
                    /*var def = $q.defer();
                    this.api('nshops/').get({}, {}, function (data) {
                        $log.warn('Api::data::Shops');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;*/
                },
                getComponents: function () {
                    /*var def = $q.defer();
                    this.api('ncomponents/').get({}, {}, function (data) {
                        $log.warn('Api::data::Components');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;*/
                }

            };
        }
    ]);



