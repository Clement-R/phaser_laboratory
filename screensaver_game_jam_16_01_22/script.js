var Screensaver = {};

Screensaver.Game = function (game) {

};

Screensaver.Game.prototype = {
    preload: function() {
        this.load.image('red', 'red.png');
        this.load.image('yellow', 'yellow.png');
        this.load.image('green', 'green.png');
        this.load.image('blue', 'blue.png');
    },

    create: function() {
        this.stage.backgroundColor = 0x2c3e50;

        this.COLUMN = 4;
        this.ROW = 5;

        this.blockFalling = false;

        // Accessible via this.blocks[Y][X];
        this.blocks = [];
        this.blocksSprites = [];
        this.createBoard();
        this.debugArray();
        // this.sendBlock();
        console.log("--------------------------------");
        var emptyCell = this.findEmptyCell();
        console.log(emptyCell['x'] + " : " + emptyCell['y']);
    },

    update: function() {

    },

    sendBlock: function() {
        // console.log("Hello block");
        // this.blockFalling = true;

        // block = this.add.sprite(0, 0, 'red');
        // block.scale.setTo(0.5, 0.5);

        // this.physics.enable(block, Phaser.Physics.ARCADE);
        // block.body.collideWorldBounds = true;

        // blocks.add(block);

    },

    createBoard: function() {
        var counter = 1;
        // Y
        for (var i = 0; i < this.ROW; i++) {
            this.blocks[i] = [];
            this.blocksSprites[i] = [];
            // X
            for (var j = 0; j < this.COLUMN; j++) {
                this.blocks[i][j] = counter;
                this.blocksSprites[i][j] = null;
                counter ++;
            };
        };
    },

    debugArray: function() {
        // Y
        for (var i = 0; i < this.ROW; i++) {
            var currentLine = "";
            // X
            for (var j = 0; j < this.COLUMN; j++) {
                if(this.blocks[i][j] <= 9 ) {
                    currentLine += "  " + this.blocks[i][j];
                } else {
                    currentLine += " " + this.blocks[i][j];
                }
            };
            console.log(currentLine);
        };
    },

    findEmptyCell: function() {
        // Check for every empty cell on last line
        // If there is no empty cell, go on previous line and search
        // ad vitam eternam

        var emptyCells = [];
        var emptyCell = {'x': null, 'y': null};
        var cellFound = false;

        var y = (this.ROW - 1);
        var randX = [];
        for (var i = 0; i < this.COLUMN; i++) {
            randX[i] = i;
        };

        while(!cellFound) {

            if(emptyCells.length == 0) {

                if(this.blocks[y][x] == 0) {
                    // add this to possible cells
                }
            } else {
                cellFound = true;
            }

        }


    }
}