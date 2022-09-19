

cc.Class({
    extends: cc.Component,

    properties: {
        pos_start_X:200,
        pos_start_Y:200,
        pos_end_X:245,
        pos_end_Y:200,
        timeMove:2,
        timeBack:0.5
    },

    start () {
        var seq = cc.repeatForever(
            cc.sequence(
                 cc.moveTo(this.timeMove, this.pos_end_X, this.pos_end_Y),
                 cc.moveTo(this.timeBack, this.pos_start_X, this.pos_start_Y)
             ));
 
         this.node.runAction(seq);
    },

});
