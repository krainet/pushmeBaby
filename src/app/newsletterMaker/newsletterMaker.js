(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.newsletterMaker', {
                    url: '/newsletterMaker/:id_news',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'newsletterMakerController',
                            templateUrl: 'newsletterMaker/newsletterMaker.tpl.html'
                        }
                    },
                    resolve:{
                        autentica: (['authService',  function (authService) {
                            return authService.autentica();
                        }]),
                        colorshops: (['newsletterMakerService', '$q', '$log',
                            function (newsletterMakerService, $q, $log) {
                                $log.info('newsletterMaker::ResolveShops::');
                                var def = $q.defer();
                                newsletterMakerService.getShops().then(function (data) {
                                    var aux = {};
                                    angular.forEach(data, function(shop, key) {
                                        aux[shop.shop_name] = JSON.parse(shop.value);
                                    });
                                    def.resolve(aux);
                                }, function (err) {
                                    def.reject(err);
                                });
                                return def.promise;
                            }]),
                        components: (['newsletterMakerService', '$q', '$log',
                            function (newsletterMakerService, $q, $log) {
                                $log.info('newsletterMaker::ResolveComponents::');
                                var def = $q.defer();
                                newsletterMakerService.getComponents().then(function (data) {
                                    def.resolve(data);
                                }, function (err) {
                                    def.reject(err);
                                });
                                return def.promise;
                            }]),
                        lastnews: (['newsletterMakerService', '$q', '$log','$stateParams',
                            function (newsletterMakerService, $q, $log, $stateParams) {
                                var def = $q.defer();
                                if($stateParams.id_news) {
                                    $log.info('newsletterMaker::ResolveNew::' + $stateParams.id_news);
                                    newsletterMakerService.getNew($stateParams.id_news).then(function (data) {
                                        def.resolve(data);
                                    }, function (err) {
                                        def.reject(err);
                                    });
                                }
                                else {
                                    newsletterMakerService.getLastNews().then(function (data) {
                                        $log.info('newsletterMaker::ResolveLastNew::' + data.id);
                                        def.resolve(data);
                                    }, function (err) {
                                        def.reject(err);
                                    });
                                }
                                return def.promise;
                            }])
                    },
                    data: {
                        pageTitle: 'Newsletter Maker'
                    }
                });
        }]);

    app.controller('newsletterMakerController', ['$scope', '$log','$state','$uibModal', '$templateCache', '$compile', 'colorshops','components','lastnews', 'newsletterMakerService',
        function ($scope, $log, $state, $uibModal, $templateCache, $compile, colorshops, components, lastnews, newsletterMakerService) {
            $log.info('App:: Starting newsletterMakerController');

            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;

                $scope.data = {};
                $scope.data.colorshops = colorshops;

                $scope.data.color = $scope.data.colorshops.mqu.color;
                $scope.data.link = $scope.data.colorshops.mqu.link;
                $scope.data.logo = $scope.data.colorshops.mqu.logo;

                $scope.data.target = {};

                $scope.datepicker = {};
                $scope.datepicker.dateOptions = {formatYear: 'yy', startingDay: 1};
                $scope.datepicker.format = 'dd-MM-yyyy';
                $scope.datepicker.opened = false;

                $scope.alerts = [
                    { type: 'warning', msg: 'Bienvenido a NewsLetterMaker, Arrastra elementos para crear Newsletters. Pasalo bien!!', time:'3000' }
                ];
                loadModel(lastnews);
            };

            $scope.addAlert = function(msg, type, time) {
                $scope.alerts.push({msg: msg, type: type, time:time});
            };

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.models = {
                selected: null,
                templates: [],
                dropzones: {}
            };
            var i = 0;
            angular.forEach(components, function(comp, key) {
                //var values = JSON.parse(comp.value);
                $scope.models.templates[i] = comp;
                $scope.models.templates[i].values = JSON.parse(comp.values);
                if (comp.type == 'container') {
                    $scope.models.templates[i].columns = $scope.models.templates[i].values.columns;
                    $scope.models.templates[i].values ='';
                }
                ++i;
            });

            var loadModel = function (json) {
                $scope.data.id   = json.id;
                $scope.data.name = json.name;
                $scope.data.shop = json.shop;
                $scope.data.json = json.json;
                $scope.data.subject = json.subject;
                $scope.data.target.account = json.account;
                $scope.data.target.country = json.country;
                $scope.data.target.replyToEmail = json.replyToEmail;
                $scope.data.target.replyToLabel = json.replyToLabel;
                $scope.models.dropzones.A = JSON.parse($scope.data.json).model;
                $scope.data.expectedDate = json.expectedDate;
                loadSpecials($scope.data.expectedDate);
            };

            var loadSpecials = function (date) {
                newsletterMakerService.getSpecials(date).then(function (specials) {
                    $scope.data.specials = specials;
                }, function (err) {
                    $log.error(err);
                });
            };
            init();

            $scope.$watch('models.dropzones', function(model) {
                $scope.modelAsJson = angular.toJson(model, true);
            }, true);

            $scope.$watch('data.shop', function(data) {
                $scope.data.color = $scope.data.colorshops[data].color;
                $scope.data.logo = $scope.data.colorshops[data].logo;
                $scope.data.link = $scope.data.colorshops[data].link;
            }, true);

            $scope.$watch('data.expectedDate', function(data) {
                loadSpecials(data);
            }, true);


            $scope.openDatepicker = function($event) {
                $scope.datepicker.opened = true;
            };

            $scope.setImage = function () {

                // $log.debug($scope.models.selected.color);
                $scope.modalInstance = $uibModal.open({
                    templateUrl: 'newsletterMaker/setImage.modal.tpl.html',
                    size: 'lg',
                    controller: 'modalSetImageController',
                    scope: $scope
                });
            };
            $scope.setSimpleText = function () {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: 'newsletterMaker/setSimpleText.modal.tpl.html',
                    size: 'lg',
                    scope: $scope
                });

            };
            $scope.setFreeHtml = function () {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: 'newsletterMaker/setFreeHtml.modal.tpl.html',
                    size: 'lg',
                    scope: $scope
                });
                $scope.modalInstance.result.then(function () {

                }, function () {

                });
            };
            $scope.loadNews = function () {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: 'newsletterMaker/loadNews.modal.tpl.html',
                    size: 'lg',
                    controller: 'modalNewsController',
                    scope: $scope
                });

                $scope.modalInstance.result.then(function (id) {
                    $log.debug(id);
                    newsletterMakerService.getNew(id).then(function (data) {
                        $log.debug(data);
                        loadModel(data);
                    }, function (err) {
                        $log.error(err);
                    });

                }, function () {

                });
            };

            $scope.getCss = function () {
                return $templateCache.get('newsletterMaker/templates/head.tpl.html');
            };

            $scope.returnHtml = function(item) {
                var html = '';
                switch(item.type) {
                    case 'image580':
                        html += '<table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
                            '<tbody>' +
                            '<tr>' +
                            '<td width="100%"> ' +
                            '<table bgcolor="#ffffff" width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
                            '<tbody> ' +
                            '<tr> <td> ';

                        html += '<table width="580" align="left" border="0" cellpadding="0" cellspacing="0" class="devicewidth"> ' +
                            '<tbody> ' +
                            '<tr> <td width="100%" height="20"></td> </tr> ' +
                            '<tr> <td> <a href="'+ item.values.linkDestination +'"> ' +

                            '<table width="580" align="right" border="0" cellpadding="0" cellspacing="0" class="devicewidth"> ' +
                            '<tbody> <tr> ' +
                            '<td width="580" align="center" class="devicewidth" style=" color: white; font-size: 9px; font-weight: bold; font-family: Arial, sans-serif;"> ' +
                            '<img alt="'+ item.values.alt +'" src="' + item.values.link + '" border="0" width="580" style="display:block; border:none; outline:none; text-decoration:none;" class="banner"> ' +
                            '</td> </tr> ';

                        if (item.values.footerText || item.values.footerDiscount) {
                            html +=
                                '<tr> <td width="580" class="fullWidth" bgcolor="';
                            html += !item.values.color ? $scope.data.color : item.values.color;
                            html += '" height="50"> ' +
                                '<table  border="0" cellpadding="0" cellspacing="0" width="580" class="fullWidth"> ' +
                                '<tbody> <tr> ';
                            if (item.values.footerText) {
                                html += '<td  width="170" style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #ffffff; padding-left: 10px;" align="';
                                html += item.values.footerDiscount ? 'left' : 'center';
                                html += '" height="50"> <strong>' + item.values.footerText + '</strong> </td> ';
                            }
                            if (item.values.footerDiscount) {
                                html += '<td style="font-family: Helvetica, arial, sans-serif; font-size: 16px; color: #ffffff;" height="50" align="';
                                html += item.values.footerText ? 'right' : 'center';
                                html += '" height="50">' + item.values.footerDiscount + '</td>';
                            }
                            html +='</tr> </tbody> </table></td> </tr> ';
                        }
                        html+=
                            '</tbody> </table> </a> </td> </tr> ' +
                            '</tbody> </table> ';
                        html +='</td> </tr> </tbody> </table> </td> </tr> </tbody> </table>';

                        break;

                    case 'image270':
                        html += '<table width="284" align="left" border="0" cellpadding="0" cellspacing="0"> ' +
                            '<tbody> ' +
                            '<tr> <td width="100%" height="20"></td> </tr> ' +
                            '<tr> <td> <a href="'+ item.values.linkDestination +'"> ' +

                            '<table width="270" align="right" border="0" cellpadding="0" cellspacing="0"> ' +
                            '<tbody> <tr> ' +
                            '<td width="270" align="center" style=" color: white; font-size: 9px; font-weight: bold; font-family: Arial, sans-serif;"> ' +
                            '<img alt="'+ item.values.alt +'" src="' + item.values.link + '" border="0" width="270" style="display:block; border:none; outline:none; text-decoration:none;" class="colimg2"> ' +
                            '</td> </tr> ';

                        if (item.values.footerText || item.values.footerDiscount) {
                            html +=
                                '<tr> <td width="100%" bgcolor="';
                            html += !item.values.color ? $scope.data.color : item.values.color;
                            html += '" height="25"> ' +
                                '<table  border="0" cellpadding="0" cellspacing="0" width="100%"> ' +
                                '<tbody> <tr> ';
                            if (item.values.footerText) {
                                html += '<td style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #ffffff;" class="';
                                html += item.values.footerDiscount ? 'taulaLeft' : 'taulaCenter';
                                html += '" height="25"> <strong>' + item.values.footerText + '</strong> </td> ';
                            }
                            if (item.values.footerDiscount) {
                                html += '<td style="font-family: Helvetica, arial, sans-serif; font-size: 16px; color: #ffffff;" class="';
                                html += item.values.footerText ? 'taulaRight' : 'taulaCenter';
                                html += '" height="25">' + item.values.footerDiscount + '</td>';
                            }
                            html +='</tr> </tbody> </table></td> </tr> ';
                        }
                        html+=
                            '</tbody> </table> </a> </td> </tr> ' +
                            '</tbody> </table> ';
                        break;

                    case 'freeHtml':
                        html += '<table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
                            '<tbody>' +
                            '<tr>' +
                            '<td width="100%"> ' +
                            '<table bgcolor="#ffffff" width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
                            '<tbody> ' +
                            '<tr> <td> ';
                        html += item.values.html;
                        html +='</td> </tr> </tbody> </table> </td> </tr> </tbody> </table>';
                        break;

                    case 'header1':
                        var temp = $templateCache.get(item.template);
                        temp = temp.replace(/{{data.link}}/g,$scope.data.link);
                        temp = temp.replace(/{{data.logo}}/g,$scope.data.logo);
                        html += temp;
                        break;

                    case 'container':
                        html += '<table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
                            '<tbody>' +
                            '<tr>' +
                            '<td width="100%"> ' +
                            '<table bgcolor="#ffffff" width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
                            '<tbody> ' +
                            '<tr> <td> ';

                        angular.forEach(item.columns, function (item2) { //columnes
                            angular.forEach(item2, function (item3) { //files
                                html +=$scope.returnHtml(item3);
                            });
                        });

                        html +='</td> </tr> </tbody> </table> </td> </tr> </tbody> </table>';

                        break;

                    case 'container3':
                        break;

                    default:
                        html += item.template !== '' ?  $templateCache.get(item.template) : '';
                        break;
                }

                return html;
            };

            $scope.constructNews = function () {
                var html = $scope.getCss();
                html += '<body>' +
                    '<img alt="pixel" src="https://pixel.monitor1.returnpath.net/pixel.gif?r=85afb1fc5f7afe43775452ccdb1a74b05fd9a6c5" width="1" height="1" style="line-height: 0px; display: block;">' +
                    '<table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader"><tbody>';

                var text = '';
                angular.forEach($scope.models.dropzones.A, function (item) {
                    text += '<tr><td width="100%" valign="top" align="center">';
                    text += $scope.returnHtml(item);
                    text += '</td></tr>';

                });
                html += text;
                html += '</table></body></html>';
                text = text.replace(/(<([^>]+)>)/ig,"").trim();
                text = text.replace(/\s /g, '');
                text = text.replace(/&nbsp;/g, '');
                return { html:html.replace(/{{data.color}}/g,$scope.data.color), text:text };

            };
            $scope.preview = function () {
                var newWindow = window.open();
                newWindow.document.write($scope.constructNews().html);
            };

            $scope.new = function () {
                //  var def = $q.defer();
                var params = {
                    name: 'Newsletter',
                    shop: $scope.data.shop,
                    json: JSON.stringify({model : []}),
                    html: JSON.stringify(''),
                    text: JSON.stringify('')
                };
                newsletterMakerService.createNewsLetter(params).then(function (data) {
                    $log.debug(data);
                   // loadModel(data);
                    $state.go('root.newsletterMaker', {'id_news' : data.id});

                }, function (err) {
                    // def.reject(err);
                });
            };

            $scope.save = function () {
                //  var def = $q.defer();
                var params = {
                    name: $scope.data.name,
                    shop: $scope.data.shop,
                    expectedDate: $scope.data.expectedDate,
                    account: $scope.data.target.account,
                    country: $scope.data.target.country,
                    replyToEmail: $scope.data.target.replyToEmail,
                    replyToLabel: $scope.data.target.replyToLabel,
                    json: JSON.stringify({model : $scope.models.dropzones.A}),
                    html: $scope.constructNews().html,
                    text: $scope.constructNews().text
                };
                newsletterMakerService.saveNewsLetter($scope.data.id, params).then(function (data) {
                    $scope.addAlert('Newsletter guardada correctamente', 'success', 3000);
                    $scope.addAlert('Ten en cuenta que la newsletter esta guardada en ' + $scope.data.target.account + ', ' + $scope.data.target.country, 'warning', 5000);

                }, function (err) {
                    $scope.addAlert('Error al guardar!', 'danger', 3000);
                    // def.reject(err);
                });
                //return def.promise;
            };
        }]);

    app.controller('modalSetImageController', ['$scope', '$uibModalInstance', '$log', '$filter','$rootScope', 'newsletterMakerService',
        function ($scope, $uibModalInstance, $log, $filter, $rootScope, newsletterMakerService) {

            var init = function (){
                $scope.status = {};
                //$scope.status.openOffers = !!$scope.models.selected.values.offer;
                //$scope.status.openSpecials = !!$scope.models.selected.values.special;
                $scope.status.oneAtATime = true;
                $scope.status.openOffers = false;
                $scope.status.openSpecials = false;
            };
            init();

            $scope.getProduct = function(){
                newsletterMakerService.getProduct($scope.models.selected.values.offer).then(function (data) {
                    $log.debug(data);
                    var link = 'https://str.yeeday.net/img/p';
                    var id = data.id_image.toString().split('');
                    $log.debug(id);
                    angular.forEach(id, function(iddd) {
                        link += '/' + iddd;
                    });
                    $log.debug(link);
                    $scope.models.selected.values.special = false;
                    $scope.models.selected.values.link=link + '/' +data.id_image +'-p-thickbox.jpg';
                    $scope.models.selected.values.alt = data.mq_bill_name;
                    $scope.models.selected.values.linkDestination = 'http://'+ data.shop_name +'.mequedouno.com/product.php?id_product=' + data.id_product + '&utm_source=Newsleter&utm_medium=email&utm_campaign=NL_' + data.shop + '_' +data.id_product+ '&ekey=[EMV FIELD]EMAIL_ORIGINE[EMV /FIELD]';
                }, function (err) {
                    $log.error(err);
                });
            };
            /*$scope.changeSpecial = function(sp){
             $scope.models.selected.values.special = sp.id_specialday;
             $scope.models.selected.values.offer = false;
             $scope.models.selected.values.link='http://str.yeeday.net/img/sp/'+ sp.id_specialday +'/'+sp.img_path;
             $scope.models.selected.values.alt = sp.name;
             $scope.models.selected.values.linkDestination = 'http://www.mequedouno.com/?id_spd=' + sp.id_specialday;
             };*/
            $scope.clickOffers = function() {
                $scope.status.openOffers = !$scope.status.openOffers;
                $scope.status.openSpecials = false;
            };
            $scope.clickSpecials = function(){
                $scope.status.openOffers = false;
                $scope.status.openSpecials = !$scope.status.openSpecials;
            };

        }]);

    app.controller('modalNewsController', ['$scope','$state', '$uibModalInstance', '$log', 'ngTableParams','$filter','$rootScope', 'newsletterMakerService',
        function ($scope,$state, $uibModalInstance, $log, NgTableParams,$filter, $rootScope, newsletterMakerService) {
            var init = function (){
                $scope.data = {};
                $scope.vm={};

                newsletterMakerService.getNewsIds().then(function (data) {
                    $scope.vm.tableParams = new NgTableParams({count:10}, { data: data,counts:[5,10,15,20]});
                }, function (err) {
                    $log.error(err);
                });
            };
            init();

            $scope.duplicate = function(id){
                newsletterMakerService.duplicateNews(id).then(function (data) {
                    init();
                }, function (err) {
                    $log.error(err);
                });
            };

            $scope.delete = function(id){
                newsletterMakerService.deleteNews(id).then(function (data) {
                    init();
                }, function (err) {
                    $log.error(err);
                });
            };

            $scope.edit = function(id) {
                $state.go('root.newsletterMaker', {'id_news' : id});
            };

        }]);

}(angular.module("pushmeBaby.newsletterMaker", [
    'authService',
    'ui.router',
    'ngAnimate',
    'ngTable',
    'dndLists',
    'textAngular',
    'sticky',
    'newsletterMakerService',
])));