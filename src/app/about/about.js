(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('root.about', {
                    url: '/about',
                    parent: 'root',
                    views: {
                        "container@": {
                            controller: 'AboutController',
                            templateUrl: 'about/about.tpl.html'
                        }
                    },
                    data: {
                        pageTitle: 'About'
                    }
                });
        }]);

    app.controller('AboutController', ['$scope', '$log','$state','$modal', '$templateCache', '$compile', function ($scope, $log, $state, $modal, $templateCache, $compile) {
        $log.info('App:: Starting AboutController');

        var init = function () {
            $scope.model = {};
            $scope.model.pageTitle = $state.current.data.pageTitle;

            $scope.data = {};

            //TODO QUE VINGUI PER API!!!!!!!
            $scope.data.colorshops = {
                mqu : {color : '#E78808', name:'Tech', link:'http://tech.mequedouno.com', logo: 'http://str.yeeday.net/img/cm/es/mqu/logo-mqu.png'},
                mqc : {color : "#6A3792", name: "Chic", link:'http://chic.mequedouno.com', logo: 'http://str.yeeday.net/img/cm/es/mqc/logochic.png'},
                mqd : {color : "#167DAE", name: "Deporte", link:'http://deporte.mequedouno.com', logo: 'http://str.yeeday.net/img/cm/es/mqd/logodepord.png'},
                mqk : {color : "#F21B19", name: "Kids", link:'http://kids.mequedouno.com', logo: 'http://str.yeeday.net/img/cm/es/mqk/logmqk.png'},
                mqh : {color : "#603619", name: "Hogar",link:'http://hogar.mequedouno.com', logo: 'http://str.yeeday.net/img/cm/es/mqh/logo-mqh.png' },
                mqv : {color : "#8C003A", name: "Vino", link:'http://vino.mequedouno.com', logo: 'http://str.yeeday.net/img/cm/es/mqv/logo-mqv.png'},
                mqs : {color : "#009343", name: "Super", link:'http://super.mequedouno.com', logo: 'http://str.yeeday.net/img/cm/es/mqs/logo-mqs_nl.png'}
            };
            $scope.data.color = $scope.data.colorshops.mqu.color;
            $scope.data.name = 'Nova Newsletter';
            $scope.data.shop = 'mqu';
            $scope.data.link = 'http://tech.mequedouno.com';
            $scope.data.logo = 'http://st2.yeeday.net/img/cm/es/mqu/logo-mqu.png';
            $scope.data.htmlp = '';

            $scope.content = {"content_type" : "video", "title" : "Video 00", "data" : "blablabla"};

        };
        init();

        $scope.models = {
            selected: null,
            templates: [
                {name: "Header", type: "header1", id: 1, template: 'about/templates/Header1.tpl.html' },
                {name: "Disclaimer", type: "disclaimer1", id: 1, template: 'about/templates/Disclaimer1.tpl.html'},
                {name: "Footer", type: "footer1", id: 1, template: 'about/templates/Footer1.tpl.html'},
                {name: "Image 580", type: "image580", id: 1, template: '',link:'http://str.yeeday.net/img/cm/es/mqu/no_image.png'},
                {name: "Image 270", type: "image270", id: 1, template: '', link:'http://str.yeeday.net/img/cm/es/mqu/no_image.png'},
                {name: "Simple Text", type: "simpleText", id: 1, template: 'about/templates/simpleText.tpl.html'},
                {name: "Html", type: "freeHtml", id: 1, template: '', html:'<table width="580" border="0" cellpadding="0" cellspacing="0" style="text-align: center;"><tbody><tr><td style="color: rgb(82, 79, 79);text-align: left;"><h1>Bienvenido al CLUB VIP</h1></td></tr></tbody></table><table width="100%" border="0" cellpadding="0" cellspacing="0" style="color: rgb(34, 34, 34);background-color: rgb(255, 255, 255);text-align: center;"><tbody><tr><td width="100%"> <table width="580" border="0" cellpadding="0" cellspacing="0" style="text-align: center;"><tbody><tr><td style="color: rgb(107, 107, 107);text-align: left;"><a href="http://hogar.mequedouno.com" target="_blank" style="color: rgb(248, 135, 0);"><strong>Tienes Envío Gratis hasta final de año</strong></a><br>Hola, eres un cliente VIP en MeQuedoUno. Y nos apetece compartirlo contigo. En algún momento de nuestra breve pero intensa historia has estado ahí, dándolo todo y disfrutando de las oportunidades más tentadoras, por eso, ahora que se acerca nuestro Sexto Aniversario<strong> ¡queremos celebrarlo contigo!</strong></td></tr></tbody></table></td></tr></tbody></table>'},
                {name: "Crosseling", type: "crosseling", template: 'about/templates/Crosseling1.tpl.html', id: 1},
                {name: "MOButton", type: "verMejoresB", template: 'about/templates/VerMejoresB.tpl.html',id: 1},
                {name: "¿Eres fan?", type: "fan", template: 'about/templates/Fan.tpl.html',id: 1},
                {name: "Barra", type: "bar", template: 'about/templates/Bar.tpl.html',id: 1},
                {name: "Apps", type: "apps", template: 'about/templates/Apps.tpl.html',id: 1},
                {name: "Contenedor", type: "container", id: 1, columns: [[], []]},
                {name: "Contenedor 3", type: "container3", id: 1, columns: [[],[],[]]}
            ],
            dropzones: {
                "A": [
                    {
                        "name": "Disclaimer",
                        "type": "disclaimer1",
                        "id": 1,
                        "template": "about/templates/Disclaimer1.tpl.html"
                    },
                    {
                        "name": "Barra",
                        "type": "bar",
                        "template": "about/templates/Bar.tpl.html",
                        "id": 1
                    },
                    {
                        "name": "Header",
                        "type": "header1",
                        "id": 1,
                        "template": "about/templates/Header1.tpl.html"
                    },
                    {
                        "name": "Image 580",
                        "type": "image580",
                        "id": 1,
                        "template": "",
                        "link": "http://str.yeeday.net/img/cm/es/mqu/15-09-14UnoMiniPreciosN1.jpg"
                    },
                    {
                        "name": "¿Eres fan?",
                        "type": "fan",
                        "template": "about/templates/Fan.tpl.html",
                        "id": 1
                    },
                    {
                        "name": "Crosseling",
                        "type": "crosseling",
                        "template": "about/templates/Crosseling1.tpl.html",
                        "id": 1
                    },
                    {
                        "name": "Contenedor",
                        "type": "container",
                        "id": 1,
                        "columns": [
                            [
                                {
                                    "name": "Image 270",
                                    "type": "image270",
                                    "id": 2,
                                    "template": "",
                                    "link": "http://str.yeeday.net/img/cm/es/mqd/15-09-07DeporteCiclismoN1.jpg",
                                    "footerText": "WOW!",
                                    "footerDiscount": "99% Dto."
                                }
                            ],
                            [
                                {
                                    "name": "Image 270",
                                    "type": "image270",
                                    "id": 2,
                                    "template": "",
                                    "link": "http://str.yeeday.net/img/cm/es/mqs/15-09-07SuperMaxipacksN1.jpg",
                                    "footerText": "Megaventa",
                                    "footerDiscount": "80% Dto."
                                }
                            ]
                        ]
                    },
                    {
                        "name": "Contenedor",
                        "type": "container",
                        "id": 2,
                        "columns": [
                            [
                                {
                                    "name": "Image 270",
                                    "type": "image270",
                                    "id": 2,
                                    "template": "",
                                    "link": "http://str.yeeday.net/img/cm/es/mqk/15-09-07KidsSillaRecaroN1.jpg"
                                }
                            ],
                            [
                                {
                                    "name": "Image 270",
                                    "type": "image270",
                                    "id": 2,
                                    "template": "",
                                    "link": "http://str.yeeday.net/img/cm/es/mqc/15-09-07ChicPerfumescosmeticaN1.jpg"
                                }
                            ]
                        ]
                    },
                    {
                        "name": "Image 580",
                        "type": "image580",
                        "id": 1,
                        "template": "",
                        "link": "http://str.yeeday.net/img/cm/es/mqs/15-09-14SuperCosmeticaNL.jpg",
                        "alt": "Bla Bla",
                        "footerText": "Super Campaña!",
                        "footerDiscount": "80% Dto."
                    },
                    {
                        "name": "Apps",
                        "type": "apps",
                        "template": "about/templates/Apps.tpl.html",
                        "id": 1
                    },
                    {
                        "name": "Barra",
                        "type": "bar",
                        "template": "about/templates/Bar.tpl.html",
                        "id": 2
                    },
                    {
                        "name": "Footer",
                        "type": "footer1",
                        "id": 1,
                        "template": "about/templates/Footer1.tpl.html"
                    }
                ]
            }
        };

        $scope.$watch('models.dropzones', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.$watch('data.shop', function(data) {
            $scope.data.color = $scope.data.colorshops[data].color;
            $scope.data.logo = $scope.data.colorshops[data].logo;
            $scope.data.link = $scope.data.colorshops[data].link;
        }, true);

        $scope.setImage = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: 'about/setImage.modal.tpl.html',
                size: 'md',
                scope: $scope
            });

        };
        $scope.setSimpleText = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: 'about/setSimpleText.modal.tpl.html',
                size: 'md',
                scope: $scope
            });

        };
        $scope.setFreeHtml = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: 'about/setFreeHtml.modal.tpl.html',
                size: 'lg',
                scope: $scope
            });
            $scope.modalInstance.result.then(function () {

            }, function () {

            });
        };

        $scope.getCss = function () {
            return $templateCache.get('about/templates/head.tpl.html');
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
                        '<tr> <td> <a href="'+ item.linkDestination +'"> ' +

                        '<table width="580" align="right" border="0" cellpadding="0" cellspacing="0" class="devicewidth"> ' +
                        '<tbody> <tr> ' +
                        '<td width="580" align="center" class="devicewidth" style=" color: white; font-size: 9px; font-weight: bold; font-family: Arial, sans-serif;"> ' +
                        '<img alt="'+ item.alt +'" src="' + item.link + '" border="0" width="580" style="display:block; border:none; outline:none; text-decoration:none;" class="banner"> ' +
                        '</td> </tr> ';

                    if (item.footerText || item.footerDiscount) {
                        html +=
                            '<tr> <td width="580" class="fullWidth" bgcolor="';
                        html += !item.color ? $scope.data.color : item.color;
                        html += '" height="50"> ' +
                            '<table  border="0" cellpadding="0" cellspacing="0" width="580" class="fullWidth"> ' +
                            '<tbody> <tr> ';
                        if (item.footerText) {
                            html += '<td  width="170" style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #ffffff; padding-left: 10px;" align="';
                            html += item.footerDiscount ? 'left' : 'center';
                            html += '" height="50"> <strong>' + item.footerText + '</strong> </td> ';
                        }
                        if (item.footerDiscount) {
                            html += '<td style="font-family: Helvetica, arial, sans-serif; font-size: 16px; color: #ffffff;" height="50" align="';
                            html += item.footerText ? 'right' : 'center';
                            html += '" height="50">' + item.footerDiscount + '</td>';
                        }
                            html +='</tr> </tbody> </table></td> </tr> ';
                    }
                    html+=
                        '</tbody> </table> </a> </td> </tr> ' +
                        '</tbody> </table> ';
                    html +='</td> </tr> </tbody> </table> </td> </tr> </tbody> </table>';


                    break;

                case 'image270':
                    html += '<table width="290" align="left" border="0" cellpadding="0" cellspacing="0" class="devicewidth"> ' +
                        '<tbody> ' +
                        '<tr> <td width="100%" height="20"></td> </tr> ' +
                        '<tr> <td> <a href="'+ item.linkDestination +'"> ' +

                        '<table width="270" align="right" border="0" cellpadding="0" cellspacing="0" class="devicewidth"> ' +
                        '<tbody> <tr> ' +
                        '<td width="270" align="center" class="devicewidth" style=" color: white; font-size: 9px; font-weight: bold; font-family: Arial, sans-serif;"> ' +
                        '<img alt="'+ item.alt +'" src="' + item.link + '" border="0" width="270" style="display:block; border:none; outline:none; text-decoration:none;" class="colimg2"> ' +
                        '</td> </tr> ';

                    if (item.footerText || item.footerDiscount) {
                        html +=
                            '<tr> <td width="270" bgcolor="';
                        html += !item.color ? $scope.data.color : item.color;
                        html += '" height="50"> ' +
                            '<table  border="0" cellpadding="0" cellspacing="0"> ' +
                            '<tbody> <tr> ' +
                            '<td  width="170" style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #ffffff; padding-left: 10px;" align="left" height="50"> ' +
                            '<strong>' + item.footerText + '</strong> </td> ' +

                            '<td style="font-family: Helvetica, arial, sans-serif; font-size: 16px; color: #ffffff;" height="50" align="right" height="50">' +
                            item.footerDiscount + '</td> </tr> </tbody> </table> ' +
                            '</td> </tr> ';
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
                    html += item.html;
                    html +='</td> </tr> </tbody> </table> </td> </tr> </tbody> </table>';
                    break;

                case 'header1':
                    var temp = $templateCache.get(item.template);
                    temp = temp.replace(/{{data.link}}/g,$scope.data.link);
                    temp = temp.replace(/{{data.logo}}/g,$scope.data.logo);
                    html += temp;
                    break;

                case 'container':
                    html += '<table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
                        '<tbody>' +
                        '<tr>' +
                        '<td width="100%"> ' +
                        '<table bgcolor="#ffffff" width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">' +
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

        $scope.preview = function () {
            var html = $scope.getCss();
            html += '<body>' +
                '<img alt="pixel" src="https://pixel.monitor1.returnpath.net/pixel.gif?r=85afb1fc5f7afe43775452ccdb1a74b05fd9a6c5" width="1" height="1" style="line-height: 0px; display: block;">' +
                '<table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader"><tbody>';

            angular.forEach($scope.models.dropzones.A, function (item) {
                html += '<tr><td width="100%" valign="top" align="center">';
                html += $scope.returnHtml(item);
                html += '</td></tr>';

            });

            html += '</table></body></html>';
            var newWindow = window.open();
            newWindow.document.write(html.replace(/{{data.color}}/g,$scope.data.color));

        };
    }]);

}(angular.module("pushmeBaby.about", [
    'ui.router',
    'dndLists',
    'textAngular',
])));