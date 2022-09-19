

cc.Class({
    extends: cc.Component,

    properties: {

        timeSpawn:0.3,

        startSpawn:true,

        player:cc.Node,

        arrPoint: {
            type: [cc.Node],
            default: []
        },

        arrEnemy: {
            type: [cc.Prefab],
            default: []
        },

        _indexE:0,
        _indexP:0,
        _playerSize:1,
    },

    onLoad () {

        this.player = this.player.getComponent("PlayerController");
    },

    start () {
        this.SpawEnemy();
    },

    //update (dt) {},

    SpawEnemy()
    {
        this.schedule(this.startSpawn, this.timeSpawn);
    },

    ChooseRandomPoint()
    {
        this._indexP = cc.math.randomRangeInt(0, 22);
    },

    GetLevelOfPlayer()
    {
        this._playerSize = this.player.levelSize;
    },

    ChooseRandomEnemy()
    {
        this.GetLevelOfPlayer();

        if(this._playerSize == 1)
        {
            this._indexE = 0;
        }
        else if(this._playerSize == 2)
        {
            let random = cc.math.randomRangeInt(0, 20);

            if(random > 12) this._indexE = 1;
            else this._indexE = 0;
        }
        else if(this._playerSize == 3)
        {
            let random = cc.math.randomRangeInt(0, 20);

            if(random > 10) this._indexE = 2;
            else if(random < 5) this._indexE = 0;
            else this._indexE = 1;
        }
        else
        {
            if(random > 15) this._indexE = 5;
            else if(random < 5) this._indexE = 4;
            else if(random < 10) this._indexE = 3;
            else this._indexE = 2;
        }
    },

    CreateEnemy()
    {
        console.log("sjncx");

        if(this.startSpawn == false) return;

        this.ChooseRandomPoint();
        this.ChooseRandomEnemy();

        let enemy = cc.instantiate(this.arrEnemy[_indexE]);

        enemy.parent = this.node;

        enemy.setPosition(this.arrPoint[_indexP]);

        //enemy.getComponent("EnemyController").
    }
});
