var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var bird;
var player;
var score = 0;

var PLAYER_SPEED = 5;
var TRAVEL_TIME = 3000; // in ms
var EGGS_PER_TRAVEL = 2;
var DIRECTION = 1;

// TODO ////////////////////////////////////////////////////////////////
/*
    Increment bird speed for curved difficulty

    To do :
      - Fix egg spwaning position

    To try :
      - Powers up

    Juicy !
      - Make eggs rotate while falling
      - Nice crashing animation when falling on the ground
*/
////////////////////////////////////////////////////////////////////////

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x337799;

    // Start physic engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the game entities
    create_bird();
    create_player();
    create_eggs();

    // Create the controls
    create_controls();

    // Make the bird move /////////////////////////////////////////////////////
    bird_movement = game.add.tween(bird).to({x: game.world.width - bird.width},
                                            TRAVEL_TIME, "Linear", true, 0,
                                            Number.MAX_VALUE, true);
    bird_movement.onLoop.add(function(){
        DIRECTION = -DIRECTION;
    });
    bird_movement.start();

    timer = game.time.create(false);
    timer.loop(TRAVEL_TIME / EGGS_PER_TRAVEL, test_drop_egg, this);
    timer.start();
}

function update() {
    if(right.isDown) {
        player.x += PLAYER_SPEED;
    } else if (left.isDown) {
        player.x -= PLAYER_SPEED;
    }

    game.physics.arcade.overlap(player, eggs, catch_egg, null, this);
    //debug();
}

function debug() {
    game.debug.body(player);
    eggs.forEach(function(egg){
        game.debug.body(egg);
    }, this);
}

function test_drop_egg() {
    var time = game.rnd.integerInRange(0, TRAVEL_TIME / EGGS_PER_TRAVEL);
    game.time.events.add(time, drop_egg, this);
}

function drop_egg() {
    egg = eggs.getFirstExists(false);
    if (egg) {
        egg.reset(bird.x + (bird.width - egg.width) * DIRECTION,
                  bird.y + (bird.height - egg.height));
    }
}

function catch_egg(player, egg) {
    console.log("Catched !");
    egg.kill();
    score += 1;
    console.log(score);
}

function create_bird() {
    var bird_texture = game.add.bitmapData(64, 64);
    bird_texture.ctx.beginPath();
    bird_texture.ctx.rect(0,0,128,128);
    bird_texture.ctx.fillStyle = '#ff0000';
    bird_texture.ctx.fill();

    bird = game.add.sprite(0, 0, bird_texture);
}

function create_player() {
    var player_texture = game.add.bitmapData(64, 64);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,128,128);
    player_texture.ctx.fillStyle = '#0000ff';
    player_texture.ctx.fill();

    // Create the player and put him in the middle of the screen
    player = game.add.sprite((game.world.width / 2) - player_texture.width/2,
                             game.world.height - player_texture.height - 5,
                             player_texture);

    player.enableBody = true;
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.checkWorldBounds = true;
}

function create_eggs() {
    var egg_texture = game.add.bitmapData(16, 16);
    egg_texture.ctx.beginPath();
    egg_texture.ctx.rect(0,0,128,128);
    egg_texture.ctx.fillStyle = '#ff00ff';
    egg_texture.ctx.fill();

    eggs = game.add.group();
    eggs.createMultiple(50, egg_texture);

    eggs.forEach(function(egg){
        game.physics.enable(egg, Phaser.Physics.ARCADE);
        egg.enableBody = true;
        egg.outOfBoundsKill = true;
        //egg.checkWorldBounds = true;
        egg.body.gravity.y = 200;
    }, this);
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}