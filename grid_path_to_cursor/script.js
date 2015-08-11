var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    setup_grid_size();

    var start_tile_tex = game.add.bitmapData(GRID_SIZE, GRID_SIZE);
    start_tile_tex.ctx.beginPath();
    start_tile_tex.ctx.rect(0,0,GRID_SIZE,GRID_SIZE);
    start_tile_tex.ctx.fillStyle = '#ff0000';
    start_tile_tex.ctx.fill();

    var end_tile_tex = game.add.bitmapData(GRID_SIZE, GRID_SIZE);
    end_tile_tex.ctx.beginPath();
    end_tile_tex.ctx.rect(0,0,GRID_SIZE,GRID_SIZE);
    end_tile_tex.ctx.fillStyle = '#00ff88';
    end_tile_tex.ctx.fill();

    pos = coord_to_pos(new Phaser.Point(8, 8));
    start_tile = game.add.sprite(pos.x, pos.y, start_tile_tex);
    end_tile = game.add.sprite(pos.x, pos.y, end_tile_tex);
}

function draw_path(pos_1, pos_2) {
    var path_tile_tex = game.add.bitmapData(GRID_SIZE, GRID_SIZE);
    path_tile_tex.ctx.beginPath();
    path_tile_tex.ctx.rect(0,0,GRID_SIZE,GRID_SIZE);
    path_tile_tex.ctx.fillStyle = '#ff5a00';
    path_tile_tex.ctx.fill();

    while(pos_2.y != pos_2.x && pos_2.y != pos_1.y)
    if(pos_2.x > pos_1.x) {

    } else {

    }
}

function update() {
    draw_grid();
    pointer = game.input.position;
    pointer_pos = round_pos(new Phaser.Point(pointer.x, pointer.y));
    end_tile.position = pointer_pos;
}

function round_pos(position) {
    pos = pos_to_coord(position);
    rounded_pos = coord_to_pos(pos);
    return rounded_pos;
}

function pos_to_coord(position) {
    pos_grid = new Phaser.Point(game.math.snapToFloor(Math.floor(position.x), GRID_SIZE) / GRID_SIZE,
                         game.math.snapToFloor(Math.floor(position.y), GRID_SIZE) / GRID_SIZE)
    return pos_grid;
}

function coord_to_pos(grid_coord) {
    pos_grid = new Phaser.Point(grid_coord.x * GRID_SIZE,
                                grid_coord.y * GRID_SIZE);
    return pos_grid;
}

function setup_grid_size() {
    GRID_SIZE = 40;
    GRID_WIDTH = game.world.width / GRID_SIZE;
    GRID_HEIGHT = game.world.height / GRID_SIZE;
}

function draw_grid() {
    for (var i = 0; i < GRID_HEIGHT; i++) {
        line = new Phaser.Line(0,
                               i * GRID_SIZE,
                               game.world.width,
                               i * GRID_SIZE);
        game.debug.geom(line, "#FFFFFF");
    }
    for (var j = 0; j < GRID_WIDTH; j++) {
        line = new Phaser.Line(j * GRID_SIZE,
                               0,
                               j * GRID_SIZE,
                               game.world.height);
        game.debug.geom(line, "#FFFFFF");
    }
}
