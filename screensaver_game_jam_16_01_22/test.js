var TestClass = function() {
    // Create the boards that will hold the logic
    // Accessible via this.blocks[Y][X]
    this.ROW = 5;
    this.COLUMN = 4;
    this.blocks = [];
    this.blocksSprites = [];
    this.createBoard();

    this.blocks[4][0] = 3;
    this.blocks[4][1] = 2;
    this.blocks[4][2] = 3;
    this.blocks[4][3] = 2;

    this.blocks[3][0] = 2;
    this.blocks[3][1] = 1;
    this.blocks[3][2] = 2;
    this.blocks[3][3] = 3;

    this.blocks[2][0] = 3;
    this.blocks[2][1] = 1;
    this.blocks[2][2] = 3;
    this.blocks[2][3] = 2;

    this.blocks[1][0] = 2;
    this.blocks[1][1] = 1;
    this.blocks[1][2] = 1;
    this.blocks[1][3] = 1;

    /*
    0 0 0 0
    2 1 1 1
    3 1 3 2
    2 1 2 3
    3 2 3 2
    */
};

TestClass.prototype.createBoard = function() {
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
};

TestClass.prototype.debugArray = function() {
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
};

TestClass.prototype.checkNeighborsY = function(x, y, counter) {
    // TODO : Check if we're not going out of bounds
    var value = this.blocks[y - 1][x];

    if(value == this.blocks[y][x]) {
        var matching = this.checkNeighborsY(x, y + 1, counter + 1);
    } else {
        return counter;
    }

    return matching;
};

TestClass.prototype.checkNeighborsX = function(x, y, counter, direction) {
    // TODO : Check if we're not going out of bounds
    var value = this.blocks[y][x + (1 * direction)]
    if(value == this.blocks[y][x]) {
        var matching = this.checkNeighborsX(x + (1 * direction),
                                            y, counter + 1, direction);
    } else {
        return counter;
    }
};
