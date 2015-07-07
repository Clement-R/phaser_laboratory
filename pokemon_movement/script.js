var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var prev_anim = "walk_down"
var animationRunning = false;
var mov_distance = 32;
var mov_time = 900;
var mov_easing = Phaser.Easing.Linear.None;

function preload() {
    game.load.spritesheet('player', '../assets/images/pokemon_player.png', 32, 32, 12);
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    cursors = game.input.keyboard.createCursorKeys();
    player = game.add.sprite(100, 100, 'player');

    player.animations.add('walk_down', [0, 1, 2]);
    player.animations.add('walk_left', [3, 4, 5]);
    player.animations.add('walk_right', [6, 7, 8]);
    player.animations.add('walk_up', [9, 10, 11]);

    player.animations.frame = 1;
}

function theEnd () {
    player.animations.stop(prev_anim, true);
    animationRunning = false;

    switch(prev_anim) {
        case "walk_up":
            player.animations.frame = 10;
        break;

        case "walk_down":
            player.animations.frame = 1;
        break;

        case "walk_left":
            player.animations.frame = 4;
        break;

        case "walk_right":
            player.animations.frame = 7;
        break;
    }
}

function move_player(direction) {
    mov_direction = ""
    switch(direction) {
        case "up":
            mov_direction = {y: player.y - mov_distance};
            prev_anim = "walk_up";
        break;

        case "down":
            mov_direction = {y: player.y + mov_distance};
            prev_anim = "walk_down";
        break;

        case "left":
            mov_direction = {x: player.x - mov_distance};
            prev_anim = "walk_left";
        break;

        case "right":
            mov_direction = {x: player.x + mov_distance};
            prev_anim = "walk_right";
        break;
    }

    tween = game.add.tween(player).to(mov_direction,
                                      mov_time,
                                      mov_easing,
                                      true);
    animationRunning = true;
    tween.onComplete.addOnce(theEnd, this);
    player.animations.play(prev_anim, 5, true);
}

function update() {
    if (cursors.down.isDown && animationRunning === false) {
        move_player("down");
    } else if(cursors.up.isDown && animationRunning === false) {
        move_player("up");
    } else if(cursors.left.isDown && animationRunning === false) {
        move_player("left");
    } else if(cursors.right.isDown && animationRunning === false) {
        move_player("right");
    }
}
