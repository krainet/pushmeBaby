/* 
 * newsletterScheduler service
 */
angular.module('newsletterSchedulerService', [])
    .factory('newsletterSchedulerService', ['$resource', '$q', '$log',
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
                            timeout: 15000,
                            method: 'POST'
                        },
                        get: {
                            timeout: 15000,
                            method: 'GET'
                        }
                    });
                },

                sendNews: function (id) {
                    var def = $q.defer();
                    this.api('nsend/'+id).get({}, {}, function (data) {
                        $log.warn('Api::data::Sending ' + id +'...');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                }
            };
        }]);



