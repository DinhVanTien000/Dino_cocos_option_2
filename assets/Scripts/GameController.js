

cc.Class({
    extends: cc.Component,

    properties: {
        popupDownload:cc.Node,
    },

    onLoad () {
        window.gameReady && window.gameReady();
    },

    start () {
        window.gameEnd && window.gameEnd();

        this.scheduleOnce(this.OpenPopup, 3);
    },

    OpenPopup()
    {
        this.popupDownload.active = true;
    },

    Bt_Download()
    {

        this.installHandle();
    },

    installHandle: function () {
        // If ad network is google ads
        if (typeof (ExitApi) != "undefined") {
            cc.log("Call exit api")
            ExitApi.exit();
            return;
        }
    
        // If ad netwrok is ironsources
        if (typeof (dapi) != "undefined") {
            cc.log("Call dapi");
            dapi.openStoreUrl();
            return;
        }
    
        // If ad network support MRAID 2.0
        if (typeof(mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.lightrain.motorace");
                return;
            }
    
            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://apps.apple.com/us/app/moto-race-master-bike-racing/id1632648936");
                return;
            }
    
            mraid.open("https://play.google.com/store/apps/details?id=com.lightrain.motorace");
            return;
        }
        // If ad network is mindword. window alway avaiable so skip undefined check
        window.install && window.install();
    },
});
