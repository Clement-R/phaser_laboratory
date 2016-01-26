var Screensaver = {};

Screensaver.Game = function (game) {

};

Screensaver.Game.prototype = {
    preload: function() {
        this.load.image('red', 'red.png');
        this.load.image('yellow', 'yellow.png');
        this.load.image('green', 'green.png');
        this.load.image('blue', 'blue.png');
        this.load.image('background', 'uncolored_hills_mod.png');
    },

    create: function() {
        this.stage.backgroundColor = 0x2c3e50;
        background = this.add.tileSprite(0,
        								 0,
        								 1024,
                                         1024,
                                         "background");
        background.tileScale.x = 1;
        background.tileScale.y = 0.75;

        // Keep original size
    	this.input.onDown.add(function(){
    		this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    		this.scale.startFullScreen(false);
    	}.bind(this));

        this.COLORS = ['red', 'yellow', 'green', 'blue'];

        // TODO : Calculate those values
        this.COLUMN = 3;
        this.ROW = 5;
        this.TILE_SIZE = 64;
        this.NO_GUTTER_TILE_SIZE = 57;
        this.GUTTER = 7;

        this.blockFalling = false;

        // Create the boards that will hold the logic
        // Accessible via this.blocks[Y][X]
        this.blocks = [];
        this.blocksSprites = [];
        this.createBoard();

        this.sendBlock();
    },

    update: function() {
    	background.tilePosition.x -= 0.25;
    },

    sendBlock: function() {
        var emptyCell = this.findEmptyCell();

        if(emptyCell) {
            // Choose a random, get its logical value and update
            // the logical board with it
            var color = Phaser.ArrayUtils.getRandomItem(this.COLORS);
            var value = this.COLORS.indexOf(color) + 1;
            this.blocks[emptyCell['y']][emptyCell['x']] = value;

            // Check if we are on last line
            var lastLine = false;
            if(emptyCell['y'] == (this.ROW - 1)) {
                lastLine = true;
            }

            // Calculate x position
            var x = emptyCell['x'] * this.TILE_SIZE;

            // Calculate y position of fall and final position after uuuh effect
            var position = (emptyCell['y'] - 1) * this.NO_GUTTER_TILE_SIZE
            if(lastLine) {
                var lockedPosition = position + 64;
            } else {
                // Take gutter of last piece in count
                var lockedPosition = position + 57;
            }
            var y = lockedPosition - this.GUTTER;

            // Create sprite
            var block = this.add.sprite(x, -128, color);
            block.scale.setTo(0.5, 0.5);

            this.tweenFall = this.add.tween(block).to({y: y},
                                                      750,
                                                      Phaser.Easing.Cubic.In);
            this.tweenUh = this.add.tween(block).to({y: lockedPosition},
                                                    250,
                                                    Phaser.Easing.Linear.In);
            if(!lastLine){
                this.tweenFall.chain(this.tweenUh);
            } else {
                this.tweenFall.onComplete.add(function(){
                    this.updateLogic(emptyCell['x'], emptyCell['y']);
                }, this);
            }

            this.tweenUh.onComplete.add(function(){
                this.updateLogic(emptyCell['x'], emptyCell['y']);
            }, this);

            this.tweenFall.start();
        } else {
            this.state.start('Game');
        }

    },

    updateLogic: function(x, y) {
        // Check for match
        this.checkMatch(x, y);
        // Delete matching blocks
        //
        // Make blocks fall
        //
        // Send new block
        this.sendBlock();
    },

    checkMatch: function(x, y) {
        // this.blocks;
    },

    checkNeighbors: function(x, y, direction) {
    },

    deleteBlock: function(x, y) {

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
        console.log("-----------------------------------------------");
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