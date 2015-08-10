var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

/*
Infos:
3 arm positions
3 ball trajectories
    - shortest : 08 pos
    - middle   : 10 pos
    - long     : 12 pos

TODO :
- Display character
- Display ball(s)

- Move character
- Move balls on trajectories
*/

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    setup_grid_size();
}

function update() {
    draw_grid();
    pos = get_pointer_pos_to_grid();
    console.log(pos.x, pos.y);

}

function get_pointer_pos_to_grid() {
    pointer = game.input.position;
    pos = new Phaser.Point(game.math.snapToFloor(Math.floor(pointer.x), GRID_SIZE) / GRID_SIZE,
                           game.math.snapToFloor(Math.floor(pointer.y), GRID_SIZE) / GRID_SIZE)
    return pos;
}

function setup_grid_size() {
    GRID_SIZE = 40
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
