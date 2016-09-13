var tumblrTemplate = '<section class="tumblr-html">\
    <div>\
        <div class="tumblr-header">\
            <div class="icon-box" ng-click="setHtmlType(\'text\');">\
                <img src="images/maps/t_text.jpg" />\
                <span>Text</span>\
            </div>\
            <div class="devider"></div>\
            <div class="icon-box" ng-click="setHtmlType(\'image\');">\
                <img src="images/maps/t_image.jpg" />\
                <span>Image</span>\
            </div>\
            <div class="devider"></div>\
            <div class="icon-box" ng-click="setHtmlType(\'link\');">\
                <img src="images/maps/t_link.jpg" />\
                <span>Link</span>\
            </div>\
            <div class="devider"></div>\
            <div class="icon-box" ng-click="setHtmlType(\'video\');">\
                <img src="images/maps/t_video.jpg" />\
                <span>Youtube</span>\
            </div>\
            <div class="devider"></div>\
            <div class="icon-box" ng-click="setHtmlType(\'soundcloud\');">\
                <img src="images/maps/t_soundcloud.png" />\
                <span>Sound</span>\
            </div>\
            <div class="devider"></div>\
            <div class="icon-box" ng-click="setHtmlType(\'twitter\');">\
                <img src="images/maps/t_twitter.png" />\
                <span>Twitter</span>\
            </div>\
            <div class="devider"></div>\
            <div class="icon-box" ng-click="setHtmlType(\'facebook\');">\
                <img src="images/maps/t_facebook.png" />\
                <span>Facebook</span>\
            </div>\
            <div class="devider"></div>\
            <div class="icon-box" ng-click="setHtmlType(\'file\');">\
                <img src="images/maps/t_file.jpg" />\
                <span>File</span>\
            </div>\
           \
        </div>\
        <div class="tumblr-action">\
            <div class="action-item text-action" ng-show="cardHtml.Type==\'text\'">\
                <div>\
                    <textarea ng-model="cardHtml.Text" placeholder="Type here..." class="form-control" style="width: 100%;"></textarea>\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-show="editedHtmlID" ng-click="updateCardHtml()">Done</button>\
                </div>\
            </div>\
            <div class="action-item image-action" ng-show="cardHtml.Type==\'image\'">\
                <div image-upload="" dropper-options="imageDropperOptions" ng-model="cardHtml.URL"></div>\
                <div class="mar-t-10">\
                    <input ng-model="cardHtml.URL" type="text" class="form-control" placeholder="Or you can paste link here..." />\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-show="editedHtmlID" ng-click="updateCardHtml()">Done</button>\
                </div>\
            </div>\
            <div class="action-item link-action" ng-show="cardHtml.Type==\'link\'">\
                <div>\
                    <input type="text" ng-model="cardHtml.URL" class="form-control" ng-change="linkChanged()" placeholder="Paste link here..." />\
                </div>\
                <div class="mar-t-10" id="ogForm">\
                    <div class="form-group og-section" ng-show="cardHtml.Title">\
                        <div class="col-sm-4 og-image" ng-show="cardHtml.Image">\
                            <img ng-src="{{cardHtml.Image}}" />\
                        </div>\
                        <div class="col-sm-8">\
                            <div class="row">\
                                <h4 class="og-title" ng-bind="cardHtml.Title"></h4>\
                            </div>\
                            <div class="row" ng-show="cardHtml.Description">\
                                <p class="og-desc" ng-bind="cardHtml.Description"></p>\
                            </div>\
                            <div class="row">\
                                <span class="og-domain" ng-bind="cardHtml.DomainName"></span>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="form-group og-section align-center" ng-show="cardHtml.loading">\
                    <img src="images/star_rotate_v3_loop.gif" style="height: 150px;" />\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-disabled="cardHtml.loading" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-disabled="cardHtml.loading" ng-show="editedHtmlID" ng-click="cancel()">Done</button>\
                </div>\
\
            </div>\
            <div class="action-item video-action" ng-show="cardHtml.Type==\'video\'">\
                <div>\
                    <input ng-model="cardHtml.URL" type="text" class="form-control" placeholder="Paste youtube link here..." />\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-show="editedHtmlID" ng-click="updateCardHtml()">Done</button>\
                </div>\
            </div>\
            <div class="action-item file-action" ng-show="cardHtml.Type==\'file\'">\
                <div image-upload="" dropper-options="fileDropperOptions" ng-model="cardHtml.URL"></div>\
                <div class="mar-t-10">\
                    <input ng-model="cardHtml.URL" type="text" class="form-control" placeholder="Or you can paste link here..." />\
                </div>\
                <div class="mar-t-10">\
                    <input ng-model="cardHtml.Text" type="text" class="form-control" placeholder="File Name" />\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-show="editedHtmlID" ng-click="updateCardHtml()">Done</button>\
                </div>\
            </div>\
            <div class="action-item video-action" ng-show="cardHtml.Type==\'soundcloud\'">\
                <div>\
                    <input ng-model="cardHtml.URL" type="text" class="form-control" placeholder="Paste soundcloud link here..." />\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-show="editedHtmlID" ng-click="updateCardHtml()">Done</button>\
                </div>\
            </div>\
            <div class="action-item" ng-show="cardHtml.Type==\'twitter\'">\
                <div>\
                    <input ng-model="cardHtml.URL" type="text" class="form-control" placeholder="Paste twitter tweet link here..." />\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-show="editedHtmlID" ng-click="updateCardHtml()">Done</button>\
                </div>\
            </div>\
            <div class="action-item" ng-show="cardHtml.Type==\'facebook\'">\
                <div>\
                    <input ng-model="cardHtml.URL" type="text" class="form-control" placeholder="Paste facebook post link here..." />\
                </div>\
                <div class="mar-t-10">\
                    <button class="btn btn-default pull-left" ng-hide="editedHtmlID" ng-click="cancel();">Cancel</button>\
                    <button class="btn btn-info pull-right" ng-hide="editedHtmlID" ng-click="addCardHtml()">Add</button>\
                    <button class="btn btn-info pull-right" ng-show="editedHtmlID" ng-click="updateCardHtml()">Done</button>\
                </div>\
            </div>\
            <div class="clear"></div>\
        </div>\
        <div class="tumblr-body" ui-sortable="sortableCardHtmlOptions" ng-model="tumblrHtmls">\
            <div ng-repeat="htmlItem in tumblrHtmls">\
                <div ng-if="!htmlItem.IsArchived">\
                    <div class="tumblr-item">\
                        <div class="tumblr-action-icons">\
                            <i class="fa fa-pencil" ng-click="editCardHtml(htmlItem)"></i>\
                            <i style="display:none;" class="fa fa-archive" ng-click="archiveCardHtml(htmlItem)"></i>\
                            <i ng-if="htmlItem.Type==\'image\'" class="fa fa-arrows-alt" ng-click="htmlItem.showSize=!htmlItem.showSize"></i>\
                            <i class="fa fa-times" ng-click="removeCardHtml($index)"></i>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'text\'">\
                            <div class="text-item">{{htmlItem.Text}}</div>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'image\'">\
                            <div ng-show="htmlItem.showSize" class="text-center mar-b-10">\
                                Image Height : <input class="mar-l-10" type="number" min="1" ng-model="htmlItem.ImageSize" />\
                            </div>\
                            <div class="image-item">\
                                <img style="height:{{htmlItem.ImageSize}}px" ng-src=\'{{htmlItem.URL}}\' alt=\'{{htmlItem.URL}}\' />\
                            </div>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'link\'">\
                            <div class="link-item">\
                                <a target="_blank" href="{{htmlItem.URL}}">\
                                    <div compile-html="htmlItem.Text">\
                                    </div>\
                                </a>\
                            </div>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'video\'">\
                            <div class="video-item">\
                                <iframe width="400" height="300" ng-src="{{htmlItem.URL | embedyoutube}}" frameborder="0" allowfullscreen></iframe>\
                            </div>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'file\'">\
                            <div class="file-item">\
                                <a target="_blank" href="{{htmlItem.URL}}">\
                                    <img src="images/maps/t_file.jpg" />\
                                    <span>{{htmlItem.Text}}</span>\
                                </a>\
                            </div>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'soundcloud\'">\
                            <div class="sound-item">\
                                <iframe width="400" height="200" allowtransparency="true" scrolling="no" frameborder="no" ng-src=\'{{htmlItem.URL|embedsoundcloud}}\'></iframe>\
                            </div>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'twitter\'">\
                            <div class="tweet-item">\
                                <twitter-post id="{{htmlItem.ID}}" tweet-post-url="{{htmlItem.URL}}"></twitter-post>\
                            </div>\
                        </div>\
                        <div ng-if="htmlItem.Type==\'facebook\'">\
                            <div class="fb-item">\
                                <facebook-post id="{{htmlItem.ID}}" post-url="{{htmlItem.URL}}"></facebook-post>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div ng-show="!tumblrHtmls.length">\
                <div class="row">\
                    <div class="col-md-12" style="text-align:center;">\
                        Please add some content here!\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</section>';
 
 var tumblrViewTemplate = '<section class="tumblr-html tmblr-html-view">\
	<div>\
		<div class="tumblr-body">\
			<div ng-repeat="htmlItem in tumblrHtmls | orderBy : \'DisplayOrderId\'">\
				<div class="tumblr-item">\
                    <div class="tumblr-action-icons" ng-if="tumblrEditable">\
                        <i class="fa fa-reply" ng-show="htmlItem.IsArchived" ng-click="unArchiveCardHtml(htmlItem)"></i>\
                        <i class="fa fa-check" ng-show="!htmlItem.IsArchived"></i>\
                    </div>\
					<div ng-if="htmlItem.Type==\'text\'">\
						<div class="text-item">{{htmlItem.Text}}</div>\
					</div>\
					<div ng-if="htmlItem.Type==\'image\'">\
						<div class="image-item">\
							<img style="height:{{htmlItem.ImageSize}}px" ng-src=\'{{htmlItem.URL}}\' alt=\'{{htmlItem.URL}}\' />\
						</div>\
					</div>\
					<div ng-if="htmlItem.Type==\'link\'">\
						<div class="link-item">\
							<a target="_blank" href="{{htmlItem.URL}}">\
								<div compile-html="htmlItem.Text">\
								</div>\
							</a>\
						</div>\
					</div>\
					<div ng-if="htmlItem.Type==\'video\'">\
						<div class="video-item">\
							<iframe width="400" height="300" ng-src="{{htmlItem.URL | embedyoutube}}" frameborder="0" allowfullscreen></iframe>\
						</div>\
					</div>\
					<div ng-if="htmlItem.Type==\'file\'">\
\
						<div class="file-item">\
							<a target="_blank" href="{{htmlItem.URL}}">\
								<img src="images/maps/t_file.jpg" />\
								<span>{{htmlItem.Text}}</span>\
							</a>\
						</div>\
					</div>\
					<div ng-if="htmlItem.Type==\'soundcloud\'">\
						<div class="sound-item">\
							<iframe width="400" height="200" ng-src="{{htmlItem.URL | embedsoundcloud}}" frameborder="0" allowfullscreen></iframe>\
						</div>\
					</div>\
					<div ng-if="htmlItem.Type==\'twitter\'">\
                        <div class="tweet-item">\
                            <twitter-post tweet-post-url="{{htmlItem.URL}}"></twitter-post>\
                        </div>\
					</div>\
					<div ng-if="htmlItem.Type==\'facebook\'">\
						<div class="fb-item">\
							<facebook-post post-url="{{htmlItem.URL}}"></facebook-post>\
						</div>\
					</div>\
				</div>\
                <div class="border-separator" ng-if="$index != (tumblrHtmls.length-1)"></div>\
			</div>\
            <div ng-show="!tumblrHtmls.length">\
                <div class="row">\
                    <div class="col-md-12">\
                        No content available yet!\
                    </div>\
                </div>\
            </div>\
		</div>\
	</div>\
</section>';

var fbPost = '<div class="fb-post" data-href="{{postUrl}}">\
</div>\
<script>\
	(function (d, s, id) {\
		var js, fjs = d.getElementsByTagName(s)[0];\
		if (d.getElementById(id))\
			return; js = d.createElement(s);\
		js.id = id;\
		js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";\
		fjs.parentNode.insertBefore(js, fjs);\
	}(document, \'script\', \'facebook-jssdk\'));\
</script>';