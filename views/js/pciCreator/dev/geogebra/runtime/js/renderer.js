define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html','geogebra/runtime/js/deployggb'], function($, html, deploy){
    var exercise = this;

    return {
        render : function(id, container, config, assetManager){
            var $container = $(container);
            var qid = $container.parent().data("serial");
            $container.append($('<div id="applet_container'+qid+'"></div>'));
			console.log(config);
            var parameters = {"showLogging":true,"id":"ggbApplet"+qid,"width":config.width,"height":config.height,"showToolBar":false,
					"ggbBase64": config.base64 || "",
                    "showMenuBar":false,"showAlgebraInput":false,"allowStyleBar":false,"showResetIcon":true,
                    "enableLabelDrags":false,"enableShiftDragZoom":true,"enableRightClick":false,"showToolBarHelp":false,
                    "errorDialogsActive":true,"useBrowserForJS":false,
                    "language":"en","isPreloader":false,"screenshotGenerator":false,"preventFocus":true,
                    "showSplash":false,"scale":"1","fixApplet":false,"prerelease":false,"playButtonAutoDecide":true,"playButton":false,"canary":false};
            
            var applet = new deploy('5.0', parameters, {"is3D":1});
            applet.setHTML5Codebase({"requirejs":"geogebra/runtime/js/"});
            applet.inject('applet_container'+qid);
			$container.parent().data("applet",  applet);
			return applet;
        },
        resize: function(applet, config){
            applet.getAppletObject().setSize(config.width,config.height);
        },
		setBase64: function(qid, base64){
			exercise.base64 = base64;
		}
    };
});
