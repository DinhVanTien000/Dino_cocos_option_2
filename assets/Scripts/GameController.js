

cc.Class({
    extends: cc.Component,

    properties: {
        popupDownload:cc.Node,
        popupDraw:cc.Node,

        player:cc.Node,
        _player:cc.Node,

        pointLimitR:cc.Node,
        pointLimitL:cc.Node,
        pointLimitT:cc.Node,
        pointLimitB:cc.Node,

        mousePosition:cc.Vec2,
        distance:cc.Vec2,

        nextPos:cc.Vec2,
        //transformPlayer:cc.Vec2,

        xMin:0.1,
        xMax:0.1,
        yMin:0.1,
        yMax:0.1,

        _x:0.1,
        _y:0.1,
    },

    onLoad () {
        window.gameReady && window.gameReady();

        this._player = this.player.getComponent("PlayerController");
    },

    start () {
        //window.gameEnd && window.gameEnd();

        var canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.GetLimitValue();
    },

    onTouchStart (event) 
    {
        if(this.player == null) return;

        this.OffPopupDraw();

        this.distance = cc.v2(0, 40);
    },

    onTouchMove (event) 
    {
        if(this.player == null) return;

        this.mousePosition = event.getLocation();

        this.nextPos = cc.v2(this.mousePosition.x + this.distance.x, this.mousePosition.y + this.distance.y);

        this._x =  cc.misc.clampf(this.nextPos.x, this.xMax, this.xMin);

        this._y = cc.misc.clampf(this.nextPos.y, this.yMax, this.yMin);

        this.player.setPosition(this._x, this._y);

        if(this.player.getPosition().x > 160)
        {
            this.player.setScale(-1, 1);
        }
        else
        {
            this.player.setScale(1, 1);
        }
    },

    onTouchEnd (event) 
    {

    },

    GetLimitValue()
    {
        this.xMin = this.pointLimitL.getPosition().x;
        this.xMax = this.pointLimitR.getPosition().x * 2;
        this.yMin = this.pointLimitB.getPosition().y;
        this.yMax = this.pointLimitT.getPosition().y * 2;
    },

    OffPopupDraw()
    {
        if(this.popupDraw.active == true) this.popupDraw.active = false;
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
