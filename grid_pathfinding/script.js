var GameTemplate = {};

GameTemplate.Game = function (game) {

};

GameTemplate.Game.prototype = {
    preload: function() {
    },

    create: function() {
        this.stage.backgroundColor = 0x2c3e50;

        this.ROW = 10;
        this.COLUMN = 10;
        this.TILE_SIZE = 64;

        this.logicalBoard = [];
        this.createBoard();

        var easystar = new EasyStar.js();
        easystar.setGrid(this.logicalBoard);
        easystar.setAcceptableTiles([0]);
        easystar.findPath(1, 1, 5, 5, this.printPath.bind(this));
        easystar.calculate();
    },

    update: function() {
    },

    createBoard: function() {
        var counter = 1;
        // Y
        for (var i = 0; i < this.ROW; i++) {
            this.logicalBoard[i] = [];
            // this.blocksSprites[i] = [];
            // X
            for (var j = 0; j < this.COLUMN; j++) {

                this.logicalBoard[i][j] = 0;
                // this.blocksSprites[i][j] = null;

                counter ++;
            };
        };
    },

    printPath: function(path) {
        if (path === null) {
            console.log("The path to the destination point was not found.");
        } else {
            for (var i = 0; i < path.length; i++) {
                console.log("P: " + i + ", X: " + path[i].x + ", Y: " + path[i].y);
                // Print tile on world
                this.addTile(path[i].x, path[i].y);
            }
        }
    },

    addTile: function(x, y) {
        var tile_texture = this.add.bitmapData(this.TILE_SIZE, this.TILE_SIZE);
        tile_texture.ctx.beginPath();
        tile_texture.ctx.rect(0, 0, 64, 64);
        tile_texture.ctx.fillStyle = '#f39c12';
        tile_texture.ctx.fill();

        bird = this.add.sprite(x * this.TILE_SIZE, y * this.TILE_SIZE, tile_texture);
    }
}
