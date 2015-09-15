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

    for (var i = 0; i < ROW_COUNT; i++) {
        tiles[i] = [];
        for (var j = 0; j < COLUMN_COUNT; j++) {
            var texture = game.rnd.pick(tiles_textures);
            console.log(texture);
            tiles[i][j] = game.add.sprite(i * CELL_SIZE_SPACED,
                                          j * CELL_SIZE_SPACED,
                                          texture);
        };
    };

    game.input.onDown.add(pick_tile, this);
}

function create_tiles_textures() {
    red_tile = game.add.bitmapData(64, 64);
    red_tile.ctx.beginPath();
    red_tile.ctx.rect(0,0,64,64);
    red_tile.ctx.fillStyle = '#ff0000';
    red_tile.ctx.fill();
    tiles_textures.push(red_tile);

    green_tile = game.add.bitmapData(64, 64);
    green_tile.ctx.beginPath();
    green_tile.ctx.rect(0,0,64,64);
    green_tile.ctx.fillStyle = '#00ff00';
    green_tile.ctx.fill();
    tiles_textures.push(green_tile);

    blue_tile = game.add.bitmapData(64, 64);
    blue_tile.ctx.beginPath();
    blue_tile.ctx.rect(0,0,64,64);
    blue_tile.ctx.fillStyle = '#0000ff';
    blue_tile.ctx.fill();
    tiles_textures.push(blue_tile);
}

function pick_tile(){
    // Saving input coordinates
    start_x = game.input.worldX;
    start_y = game.input.worldY;
    // Saving row and column numbers
    moving_row = Math.floor(start_y / CELL_SIZE);
    moving_col = Math.floor(start_x / CELL_SIZE);

    // now dragging is allowed
    DRAGGING = true;

    // updating listeners
    game.input.onDown.remove(pick_tile, this);
    game.input.onUp.add(release_tile, this);
}

function release_tile() {

}