var CELL_SIZE          = 64;
var CELL_SPACE         = 4;
var ROW_COUNT          = 8;
var COLUMN_COUNT       = 8;
var CELL_SIZE_SPACED   = CELL_SIZE + CELL_SPACE;
var BOARD_WIDTH        = CELL_SIZE_SPACED * COLUMN_COUNT + CELL_SPACE;
var BOARD_HEIGHT       = CELL_SIZE_SPACED * ROW_COUNT + CELL_SPACE;

var DRAGGING           = false;
var DRAG_DIRECTION     = '';

var tiles_textures     = [];
var tiles              = [];
var temp_tile;


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    create_tiles();
}

function update() {

}

function create_tiles() {
    create_tiles_textures();

    // Random spawning algorithm, not good
    for (var i = 0; i < COLUMN_COUNT; i++) {
        tiles[i] = [];
        for (var j = 0; j < ROW_COUNT; j++) {
            var texture = game.rnd.pick(tiles_textures);
            console.log(texture);
            tiles[i][j] = game.add.sprite(i * CELL_SIZE_SPACED,
                                          j * CELL_SIZE_SPACED,
                                          texture);
        };
    };

    // Populate one cell at a time and check there is no match
    for (var i = 0; i < COLUMN_COUNT; i++) {
        tiles[i] = [];
        for (var j = 0; j < ROW_COUNT; j++) {
            /* TODO */

            // First column of the row
            if(i == 0) {
                // First row on the board
                if(j == 0) {
                    // First row of the board
                    var texture = game.rnd.pick(tiles_textures);
                } else if (j == (ROW_COUNT - 1)) {
                    // Last row of the board

                    /* Check neighbors cells on top and right */
                } else {
                    // Other rows

                    /* Check neighbors cells on top, bottom and right */
                }
            // Last colum of the row
            } else if(i == (COLUMN_COUNT - 1)) {

            } else {
                //
            }

            /* /TODO */
            tiles[i][j] = game.add.sprite(i * CELL_SIZE_SPACED,
                                          j * CELL_SIZE_SPACED,
                                          texture);
        };
    };

    // game.input.onDown.add(pick_tile, this);
}

function create_tiles_textures() {
    red_tile = game.add.bitmapData(64, 64);
    red_tile.ctx.beginPath();
    red_tile.ctx.rect(0,0,64,64);
    red_tile.ctx.fillStyle = '#1abc9c';
    red_tile.ctx.fill();
    tiles_textures.push(red_tile);

    green_tile = game.add.bitmapData(64, 64);
    green_tile.ctx.beginPath();
    green_tile.ctx.rect(0,0,64,64);
    green_tile.ctx.fillStyle = '#3498db';
    green_tile.ctx.fill();
    tiles_textures.push(green_tile);

    blue_tile = game.add.bitmapData(64, 64);
    blue_tile.ctx.beginPath();
    blue_tile.ctx.rect(0,0,64,64);
    blue_tile.ctx.fillStyle = '#e74c3c';
    blue_tile.ctx.fill();
    tiles_textures.push(blue_tile);
}