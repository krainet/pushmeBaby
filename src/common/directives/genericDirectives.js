/**
 * Created by hadock on 8/09/15.
 */
angular.module('genericDirectives', [])

    .directive('chat',function(){
        return {
            templateUrl: 'directives/templates/chat.tpl.html',
            restrict: 'E',
            replace: true,
        };
    })

    .directive('stats',function() {
        return {
            templateUrl: 'directives/templates/stats.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {
                'model': '=',
                'comments': '@',
                'number': '@',
                'name': '@',
                'colour': '@',
                'details': '@',
                'type': '@',
                'goto': '@'
            }

        };
    })

    .directive('header',function(){
        return {
            templateUrl:'directives/templates/header.tpl.html',
            restrict: 'E',
            replace: true,
        };
    })

    .directive('headerNotification',function() {
        return {
            templateUrl: 'directives/templates/header-notification.tpl.html',
            restrict: 'E',
            replace: true,
        };
    })

    .directive('notifications',function(){
        return {
            templateUrl:'directives/templates/notifications.tpl.html',
            restrict: 'E',
            replace: true,
        };
    })

    .directive('sidebar',['$location',function() {
        return {
            templateUrl:'directives/templates/sidebar.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 2;
                $scope.multiCollapseVar = 0;

                $scope.check = function(x){

                    if(x==$scope.collapseVar){
                        $scope.collapseVar = 0;
                    } else {
                        $scope.collapseVar = x;
                    }

                };

                $scope.multiCheck = function(y){

                    if(y==$scope.multiCollapseVar){
                        $scope.multiCollapseVar = 0;
                    }else{
                        $scope.multiCollapseVar = y;
                    }

                };
            }
        };
    }])

    .directive('sidebarSearch',function() {
        return {
            templateUrl:'directives/templates/sidebar-search.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'home';
            }
        };
    })

    .directive('timeline',function() {
        return {
            templateUrl:'directives/templates/timeline.tpl.html',
            restrict: 'E',
            replace: true,
        };
    });








