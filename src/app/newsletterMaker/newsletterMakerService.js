angular.module('newsletterMakerService', [])
    .factory('newsletterMakerService', ['$resource', '$q', '$log',
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
                            withCredentials: false,
                            timeout: 15000,
                            method: 'POST'
                        },
                        update: {
                            withCredentials: false,
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
                    var def = $q.defer();
                    this.api('nshops/').get({}, {}, function (data) {
                        $log.warn('Api::data::Shops');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                getComponents: function () {
                    var def = $q.defer();
                    this.api('ncomponents/').get({}, {}, function (data) {
                        $log.warn('Api::data::Components');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                getLastNews: function () {
                    var def = $q.defer();
                    this.api('nhistory/0/lastnews').get({}, {}, function (data) {
                        $log.warn('Api::data::lastNew');
                        def.resolve(data.data[0]);
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
                },
                getSpecials: function (date) {
                    var def = $q.defer();
                    this.api('nspecialday/0/' + date).get({}, {}, function (data) {
                        $log.warn('Api::data::Get all specials');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                getProduct: function (offer){
                    var def = $q.defer();
                    this.api('nspecialday/0/0/' + offer).get({}, {}, function (data) {
                        $log.warn('Api::data::Get product from offer');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                getNew: function (id) {
                    var def = $q.defer();
                    this.api('nhistory/' + id).get({}, {}, function (data) {
                        $log.warn('Api::data::Get new id: ' +id);
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                deleteNews: function (id) {
                    var def = $q.defer();
                    this.api('nhistory/' + id).remove({}, {}, function (data) {
                        $log.warn('Api::data::Delete id: ' +id);
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                duplicateNews: function (id) {
                    var def = $q.defer();
                    this.api('nhistory/' + id + '/duplicate').get({}, {}, function (data) {
                        $log.warn('Api::data::Duplicating id: '+id);
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                saveNewsLetter: function (id, params) {
                    var def = $q.defer();
                    this.api('nhistory/'+id).update({}, params, function (data) {
                        $log.warn('Api::data::Saving..');
                        def.resolve(data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                createNewsLetter: function (params) {
                    var def = $q.defer();
                    this.api('nhistory/').save({}, params, function (data) {
                        $log.warn('Api::data::Creating..');
                        def.resolve(data.data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                }

            };
        }
    ]);



