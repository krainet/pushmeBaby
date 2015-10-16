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
                /*getNew: function (id) {
                 var def = $q.defer();
                 this.api('nhistory/' + id).get({}, {}, function (data) {
                 $log.warn('Api::data::Get new id: ' +id);
                 def.resolve(data.data);
                 }, function (err) {
                 def.reject(err);
                 });
                 return def.promise;
                 },
                 getNewsIds: function () {
                 var def = $q.defer();
                 this.api('nhistory/0/ids').get({}, {}, function (data) {
                 $log.warn('Api::data::Get all ids');
                 def.resolve(data.data);
                 }, function (err) {
                 def.reject(err);
                 });
                 return def.promise;
                 },*/
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



