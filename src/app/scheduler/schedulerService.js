/* 
 * scheduler service
 */
angular.module('schedulerService', [])
        .factory('schedulerService', ['$resource', '$q', '$log',
            function ($resource, $q, $log) {
                return {
                    api: function (extra_route) {
                        if (!extra_route) {
                            extra_route = '';
                        }
                        return $resource(API_URL + '/schedulers/' + extra_route, {}, {
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
                            },
                            put: {
                                timeout: 15000,
                                method: 'PUT'
                            },
                            delete: {
                                timeout: 15000,
                                method: 'DELETE'
                            }
                        });
                    },
                    getAllCampaigns: function () {
                        var def = $q.defer();
                        this.api().get({}, {}, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    getCampaign: function(id){
                        var def = $q.defer();
                        this.api(id).get({}, {}, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    submitCampaign: function (name,segments,msg_apple,msg_android,date_send) {
                        var def = $q.defer();
                        var postData = {
                            name:name,
                            segments:segments,
                            message_apple:msg_apple,
                            message_android:msg_android,
                            date_send:date_send
                        };
                        this.api().save({}, postData, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    saveCampaign: function (id,name,segments,msg_apple,msg_android,date_send,is_draft) {
                        var def = $q.defer();
                        var postData = {
                            name:name,
                            segments:segments,
                            message_apple:msg_apple,
                            message_android:msg_android,
                            date_send:date_send,
                            is_draft:is_draft
                        };
                        this.api(id).put({}, postData, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    deleteCampaign: function(id){
                        var def = $q.defer();
                        this.api(id).delete({}, {}, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    }
                };
            }]);



