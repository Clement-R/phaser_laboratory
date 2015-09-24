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
var texts              = [];
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
    for (var i = 0; i < COLUMN_COUNT; i++) {
        for (var j = 0; j < ROW_COUNT; j++) {
            text = texts[i][j];
            sprite = tiles[i][j];
            text.x = Math.floor(sprite.x + sprite.width / 2);
            text.y = Math.floor(sprite.y + sprite.height / 2);
        }
    }
}

function create_tiles() {
    create_tiles_textures();

    // Random spawning algorithm, not good
    // for (var i = 0; i < COLUMN_COUNT; i++) {
    //     tiles[i] = [];
    //     for (var j = 0; j < ROW_COUNT; j++) {
    //         var texture = game.rnd.pick(tiles_textures);
    //         console.log(texture);
    //         tiles[i][j] = game.add.sprite(i * CELL_SIZE_SPACED,
    //                                       j * CELL_SIZE_SPACED,
    //                                       texture);
    //     };
    // };

    for (var i = 0; i < COLUMN_COUNT; i++) {
        tiles[i] = [];
        for (var j = 0; j < ROW_COUNT; j++) {
            tiles[i][j] = 0;
        };
    };

    // Populate one cell at a time and check there is no match
    for (var i = 0; i < COLUMN_COUNT; i++) {
        for (var j = 0; j < ROW_COUNT; j++) {

            var texture = "";

            // First column of the board
            if(i == 0) {
                // First row on the board
                if(j == 0) {
                    // First cell of the board
                    var texture = game.rnd.pick(tiles_textures);
                } else if (j == (ROW_COUNT - 1)) {
                    // Last row of the board
                    /* Check neighbors cells on top and right */
                    // var texture = game.rnd.pick(tiles_textures);
                    // top = tiles[i][j - 1]['tile_id']
                    // right = tiles[i + 1][j]['tile_id']

                } else {
                    // Other rows
                    /* Check neighbors cells on top, bottom and right */
                    // var texture = game.rnd.pick(tiles_textures);

                    // console.log(tiles)

                    // top = tiles[i][j - 1]['tile_id']
                    // console.log(top);
                    // bottom = tiles[i][j + 1]
                    // right = tiles[i + 1][j]

                    // values = [top, bottom, right];


                    // var texture = game.rnd.pick(tiles_textures);
                    // while (values.indexOf(texture) != -1) {
                    //     console.log("Search value");
                    // }
                }
            // Last colum of the board
            } else if(i == (COLUMN_COUNT - 1)) {
                // First row on the board
                if(j == 0) {
                    /* Check neighbors cells on left and bottom */
                    // var texture = game.rnd.pick(tiles_textures);
                } else if (j == (ROW_COUNT -1)) {
                    /* Check neighbors cells on top and left */
                    // var texture = game.rnd.pick(tiles_textures);
                } else {
                    /* Check neighbors cells on top, left and bottom */
                    // var texture = game.rnd.pick(tiles_textures);
                }
            } else {
                // First row on the board
                if(j == 0) {
                    /* Check neighbors on left, right and bottom */
                    // var texture = game.rnd.pick(tiles_textures);
                } else if (j == (ROW_COUNT -1)) {
                    /* Check neighbors on top, left and right */
                    // var texture = game.rnd.pick(tiles_textures);
                } else {
                    /* Check neighbors on all sides */
                    // var texture = game.rnd.pick(tiles_textures);
                }
            }

            if(texture != "") {
                // var texture = game.rnd.pick(tiles_textures);
                tiles[i][j] = game.add.sprite(i * CELL_SIZE_SPACED,
                                              j * CELL_SIZE_SPACED,
                                              texture);
            }
        }
    }

    for (var i = 0; i < COLUMN_COUNT; i++) {
        texts[i] = [];
        for (var j = 0; j < ROW_COUNT; j++) {
            var sprite = tiles[i][j];
            var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: sprite.width, align: "center" };
            texts[i][j] = game.add.text(0, 0, sprite['tile_id'], style);
            texts[i][j].anchor.set(0.5);
        }
    }

    // game.input.onDown.add(pick_tile, this);
}

function create_tiles_textures() {
    red_tile = game.add.bitmapData(64, 64);
    red_tile.ctx.beginPath();
    red_tile.ctx.rect(0,0,64,64);
    red_tile.ctx.fillStyle = '#1abc9c';
    red_tile.ctx.fill();
    red_tile.tile_id = "0";
    tiles_textures.push(red_tile);

    green_tile = game.add.bitmapData(64, 64);
    green_tile.ctx.beginPath();
    green_tile.ctx.rect(0,0,64,64);
    green_tile.ctx.fillStyle = '#3498db';
    green_tile.ctx.fill();
    green_tile.tile_id = "1";
    tiles_textures.push(green_tile);

    blue_tile = game.add.bitmapData(64, 64);
    blue_tile.ctx.beginPath();
    blue_tile.ctx.rect(0,0,64,64);
    blue_tile.ctx.fillStyle = '#e74c3c';
    blue_tile.ctx.fill();
    blue_tile.tile_id = "2";
    tiles_textures.push(blue_tile);
}