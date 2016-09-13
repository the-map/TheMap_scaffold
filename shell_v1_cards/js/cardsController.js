 var app = angular.module('cardApp', ['toaster']);
 app.run(['$rootScope',function($rootScope){
	  $rootScope.guid = function () {

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
						.toString(16)
						.substring(1);
            }

            return s4() + s4() + s4();
        };

        $rootScope.getParamFromURL = function (url, name) {

            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
					results = regex.exec(url);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };


        $rootScope.parseXml = function (text) {
            var parseXml;

            if (window.DOMParser) {
                parseXml = function (xmlStr) {
                    return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
                };
            } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
                parseXml = function (xmlStr) {
                    var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = "false";
                    xmlDoc.loadXML(xmlStr);
                    return xmlDoc;
                };
            } else {
                parseXml = function () { return null; };
            }

            return parseXml(text);
        };

        $rootScope.url2domain = function (data) {
            var a = document.createElement('a');
            a.href = data;
            return a.hostname;
        };


 }]);
  app.controller('cardsController', [ '$scope','$timeout','toaster', function ( $scope,$timeout,toaster) {
    $scope.ArticleCards=[];


        $scope.parseXml = function (text) {
            var parseXml;

            if (window.DOMParser) {
                parseXml = function (xmlStr) {
                    return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
                };
            } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
                parseXml = function (xmlStr) {
                    var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = "false";
                    xmlDoc.loadXML(xmlStr);
                    return xmlDoc;
                };
            } else {
                parseXml = function () { return null; };
            }

            return parseXml(text);
        };

        $scope.url2domain = function (data) {
            var a = document.createElement('a');
            a.href = data;
            return a.hostname;
        };

    $scope.guid = function () {

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
						.toString(16)
						.substring(1);
            }

            return s4() + s4() + s4();
        };

			    $scope.articleCard = { Title: "", ID: $scope.guid(), ArticleID: $scope.guid(), MappingID: $scope.guid() ,ArticleCardHtmls:[]};
			     
			}]);


app.directive('tmTumblr', ['$timeout', 'toaster','$sce','$rootScope', function ($timeout, toaster,$sce,$rootScope) {

        return {
            restrict: 'AE',
            template:tumblrTemplate,
            scope: {
                'tumblrHtmls': '=tumblrHtmls',
                'imageDropperUrl': '=imageDropperUrl',
                'fileDropperUrl': '=fileDropperUrl',
                'parentID': '=parentId'
            },
            controller: ["$scope", function ($scope) {
                $scope.imageDropperOptions = {
                    label: "Add file... Drop/Click here",
                    postUrl: $scope.imageDropperUrl,
                    onSuccess: function (url, file) {
                        console.log(url);
                        console.log(file);

                    }
                };

                $scope.fileDropperOptions = {
                    label: "Add file... Drop/Click here",
                    postUrl: $scope.fileDropperUrl,
                    onSuccess: function (url, file) {
                        console.log(url);
                        console.log(file);
                        $timeout(function () { $scope.cardHtml.Text = file.name; }, 10);

                    }
                };
            }],
            link: function (scope, element, attrs, controllers) {

                scope.setHtmlType = function (type) {
                    scope.cardHtml = {
                        Type: type
                    };
                };

                scope.cancel = function () {
                    scope.cardHtml = {};
                    scope.editedHtmlID = null;
                };

                scope.updateCardHtml = function () {
                    if (!scope.cardHtml.URL && !scope.cardHtml.Text) {
                        $timeout(function () {
                            toaster.pop('error', "Tour:", "Html field is required.", 3000);
                        }, 1);
                        return;
                    }
                    scope.cardHtml = {};
                    scope.editedHtmlID = null;
                }

                scope.addCardHtml = function () {
                    if (!scope.cardHtml.URL && !scope.cardHtml.Text) {
                        $timeout(function () {
                            toaster.pop('error', "Tour:", "Html field is required.", 3000);
                        }, 1);
                        return;
                    }

                    if (!scope.tumblrHtmls) {
                        scope.tumblrHtmls = [];
                    }

                    var htmlItem = {
                        URL: scope.cardHtml.URL,
                        Text: scope.cardHtml.Text,
                        Type: scope.cardHtml.Type,
                        ID: scope.cardHtml.ID,
                        CardID: scope.parentID,
                        DisplayOrderId: scope.tumblrHtmls.length + 1,
                        IsArchived: false
                    };

                    scope.tumblrHtmls.push(htmlItem);

                    scope.cancel();
                };

                /* This requires 'jquery-cross-domain-ajax' require dependency to be loaded on page */
                scope.linkChanged = function () {
                    scope.cardHtml.loading = true;
                    $.ajax({
                        url: scope.cardHtml.URL,
                        type: 'GET',
                        success: function (res) {
                            var xml = $rootScope.parseXml(res.responseText);
                            var dom = $(xml);
                            var ogTitle = dom.find("meta[property='og\:title']").attr("content");
                            var ogDesc = dom.find("meta[property='og:\description']").attr("content");
                            var ogImage = dom.find("meta[property='og:\image']").attr("content");
                            var domain = $rootScope.url2domain(scope.cardHtml.URL);
                            ogTitle = $('<div></div>').html(ogTitle).text();
                            ogDesc = $('<div></div>').html(ogDesc).text();
                            var title = dom.find("title").text();
                            console.log(ogTitle);
                            console.log(title);
                            $timeout(function () {
                                scope.cardHtml.loading = false;
                                scope.cardHtml.Title = ogTitle || title || scope.cardHtml.URL;
                                scope.cardHtml.Description = ogDesc;
                                scope.cardHtml.Image = ogImage;
                                scope.cardHtml.DomainName = domain;
                            }, 10);
                            $timeout(function () {
                                scope.cardHtml.Text = $("#ogForm", element).html().replace(/[ ]*(?:ng-show|ng-bind) *= *"[^"]*" */g, "").replace(/[\r\n]/g, "");
                            }, 500);
                        }
                    });
                };

                scope.sortableCardHtmlOptions = {
                    update: function (e, ui) {
                        $timeout(function () {
                            _.each(scope.tumblrHtmls, function (item, index) {
                                item.DisplayOrderId = index + 1;
                            });
                            console.log(scope.tumblrHtmls);
                        }, 2000);

                    }
                };

                scope.editCardHtml = function (data) {
                    if (!data) {
                        return;
                    }
                    scope.cardHtml = data;
                    scope.editedHtmlID = data.ID;
                };

                scope.archiveCardHtml = function (data) {
                    data.IsArchived = true;
                };

                scope.removeCardHtml = function ($index) {
                    scope.tumblrHtmls.splice($index, 1);
                };
            }
        }
    }]);


    app.directive('tmTumblrView', ['toaster','$sce', function (toaster,$sce) {

        return {
            restrict: 'AE',
            template: tumblrViewTemplate,
            scope: {
                'tumblrHtmls': '=tumblrHtmls',
                'tumblrEditable': '=tumblrEditable'
            },
            controller: ["$scope", function ($scope) {

            }],
            link: function (scope, element, attrs, controllers) {
                scope.unArchiveCardHtml = function (data) {
                    data.IsArchived = false;
                }
            }
        }
    }]);

     app.filter('embedyoutube', ['$sce', function ($sce) {

        var getParamFromURL = function (url, name) {

            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
					results = regex.exec(url);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

        return function (url) {
            /* Extracts : https://www.youtube.com/watch?v=vjlwDZ3DtkI */
            var param = getParamFromURL(url, "v");
            /* Extracts https://youtu.be/vjlwDZ3DtkI or https://www.youtube.com/embed/vjlwDZ3DtkI */
            if (!param || param == "") {
                var arr = url.split("/");
                param = arr[arr.length - 1];
            }
            var embedUrl = "https://www.youtube.com/embed/" + param;
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }]);

    app.filter('embedsoundcloud', ['$sce', function ($sce) {

        return function (url) {

            var embedUrl = "http://w.soundcloud.com/player/?url=" + url;
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }]);

    app.directive('facebookPost', ['$timeout','$sce', function ($timeout,$sce) {
        return {
            restrict: 'AE',
            templateUrl: fbPost,
            scope: {
                postUrl: '@'
            },
            link: function (scope, element, attrs, controllers) {

                try {
                    scope.$watch("postUrl", function (newValue, oldValue) {
                        getFbPost();
                    });

                    function getFbPost() {
                        $(".fb-post", element).empty();
                        $(".fb-post", element).attr("data-href", scope.postUrl);
                        $timeout(function () {
                            window.FB.XFBML.parse(element[0]);
                        }, 1);
                    }
                    getFbPost();
                }
                catch (ex) { console.log(ex); }
            }
        }
    }]);

    app.directive('twitterPost', ['$http', '$timeout','$sce', function ($http, $timeout,$sce) {
        return {
            restrict: 'AE',
            template: '<div class="twitter-post"></div><div id="container1"></div>',
            scope: {
                tweetPostUrl: '@'
            },
            link: function (scope, element, attrs, controllers) {

                try {
                    scope.$watch("tweetPostUrl", function (newValue, oldValue) {
                        //if ($rootScope.tweetInit == true) return;
                        //$rootScope.tweetInit = true;
                        getTweet();

                    });

                    function getTweet() {
                        $(".twitter-post", element).empty();
                        var tweetUrl = scope.tweetPostUrl;
                        // option1
                        if (tweetUrl.match("/$")) {
                            tweetUrl = tweetUrl.substr(0, tweetUrl.lastIndexOf('/'));
                        }
                        var tweetUrlArray = tweetUrl.split('/');
                        var postid = tweetUrlArray[tweetUrlArray.length - 1];
                        $timeout(function () {
                            window.twttr.widgets.createTweet(postid, $(".twitter-post", element)[0], { conversation: 'none' }).then(function (el) {
                                console.log(el); /* Here we get twitter iframe */
                                $(el).contents().find('.EmbeddedTweet').css('max-width', '100%');
                            });
                        }, 500);

                        
                    };
                }
                catch (ex) { console.log(ex); }
            }
        }
    }]);
	
	    app.directive('imageUpload', ['$timeout', '$http', 'toaster', function ($timeout, $http, toaster) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                options: '=dropperOptions'
            },
            link: function (scope, ele, attrs, ngModel) {
                scope.options.label = scope.options.label || "Drop File/Click here";
                scope.options.maxUploadSize = scope.options.maxUploadSize || 10; /*MB*/

                $(ele).dropper({ label: scope.options.label }).on("start.dropper", function (e, files) {

                    if (files[0]) {
                        var currentFile = files[0].file;
                        if (((currentFile.size / 1024) / 1024) > scope.options.maxUploadSize) {
                            $timeout(function () {
                                toaster.pop('error', "TheMap Says:", "Max file size of " + maxUploadSize + "MB exceeded.", 3000);
                            }, 1);

                            return;
                        }

                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $timeout(function () {
                                toaster.pop('wait', "TheMap Says:", "Uploading file...", 0);
                            }, 1);

                            var dataToSave = {
                                "Data": e.target.result,
                                "Name": currentFile.name,
                                "Type": currentFile.type
                            };
                            var req = {
                                method: 'POST',
                                url: scope.options.postUrl,
                                data: dataToSave
                            };

                            $http(req).
							success(function (response) {
							    toaster.clear();
							    $timeout(function () {
							        ngModel.$setViewValue(response.location);
							    }, 1);

							    if (scope.options.onSuccess) {
							        scope.options.onSuccess(response.location, currentFile);
							    }
							}).
							error(function () {
							    toaster.clear();
							    $timeout(function () {
							        ngModel.$setViewValue(e.target.result);
							    }, 1);
							    if (scope.options.onSuccess) {
							        scope.options.onSuccess(e.target.result, currentFile, true);
							    }
							});
                        };

                        reader.readAsDataURL(files[0].file);
                    }
                });
            }
        };
    }]);
