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

        this.COLORS = ['red', 'yellow', 'green', 'blue'];

        // TODO : Calculate those values
        this.COLUMN = 1;
        this.ROW = 5;
        this.TILE_SIZE = 64;
        this.GUTTER = 7;

        this.blockFalling = false;

        // Create the boards that will hold the logic
        // Accessible via this.blocks[Y][X]
        this.blocks = [];
        this.blocksSprites = [];
        this.createBoard();

        // DEBUG : Test if emptyCell choose tiles
        //         from previous lines if needed
        // this.blocks[4][0] = 1;
        // this.blocks[4][1] = 1;
        // this.blocks[4][2] = 1;
        // this.blocks[4][3] = 1;

        // DEBUG
        this.debugArray();
        console.log("--------------------------------");

        //var emptyCell = this.findEmptyCell();
        // DEBUG
        //console.log(emptyCell['x'] + " : " + emptyCell['y']);

        this.sendBlock();
    },

    update: function() {

    },

    sendBlock: function() {
        var emptyCell = this.findEmptyCell();
        if(emptyCell) {

            var color = Phaser.ArrayUtils.getRandomItem(this.COLORS);
            var value = this.COLORS.indexOf(color) + 1;
            var lastLine = false;

            if(emptyCell['y'] == (this.ROW - 1)) {
                lastLine = true;
            }

            this.blocks[emptyCell['y']][emptyCell['x']] = value;


            var x = emptyCell['x'] * this.TILE_SIZE;

            if(this.previousY) {
                var y = this.previousY - 64;
            } else {
                var y = emptyCell['y'] * this.TILE_SIZE;
            }

            var gutter = y + this.GUTTER;

            var block = this.add.sprite(x, -128, color);
            block.scale.setTo(0.5, 0.5);

            this.tweenFall = this.add.tween(block).to({y: y},
                                                      1000,
                                                      Phaser.Easing.Cubic.In);
            this.tweenUh = this.add.tween(block).to({y: gutter},
                                                    500,
                                                    Phaser.Easing.Linear.In);
            if(!lastLine){
                this.tweenFall.chain(this.tweenUh);
            } else {
                this.tweenFall.onComplete.add(function(){
                    this.previousY = block.y;
                    this.checkNeighbors();
                }, this);
            }

            this.tweenUh.onComplete.add(function(){
                this.previousY = block.y;
                this.checkNeighbors();
            }, this);

            // this.tweenFall.onComplete.add(this.checkNeighbors, this);

            this.tweenFall.start();

            // this.physics.enable(block, Phaser.Physics.ARCADE);
            // block.body.collideWorldBounds = true;

            // blocks.add(block);
        } else {
            // this.debugArray();
        }

    },

    checkNeighbors: function() {
        // Check for match
        // Delete matching blocks
        // Send new block
        this.sendBlock();
    },

    deleteBlock: function() {

    },

    createBoard: function() {
        var counter = 1;
        // Y
        for (var i = 0; i < this.ROW; i++) {
            this.blocks[i] = [];
            this.blocksSprites[i] = [];
            // X
            for (var j = 0; j < this.COLUMN; j++) {

                this.blocks[i][j] = 0;
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
        var emptyCells = [];
        var emptyCell = {'x': null, 'y': null};
        var cellFound = false;

        var y = (this.ROW - 1);

        var randX = [];
        for (var i = 0; i < this.COLUMN; i++) {
            randX[i] = i;
        };
        randX = Phaser.ArrayUtils.shuffle(randX);

        while(!cellFound) {
            // Check for every empty cell on current line
            for (var x = 0; x < randX.length; x++) {
                if(this.blocks[y][x] == 0) {
                    emptyCells.push({'x': x, 'y': y});
                }
            };

            // If no empty cell was found, we search on previous line
            if(emptyCells.length > 0) {
                cellFound = true;
            } else if((y - 1) < 0) {
                // No more empty cell
                return false;
            } else {
                y -= 1;
            }
        }

        var randomCell = Phaser.ArrayUtils.getRandomItem(emptyCells);
        return randomCell;
    }
}