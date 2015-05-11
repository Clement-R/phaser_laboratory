var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var life;
var is_player_vulnerable = true;
var vulnerable_timer;

function preload() {
    game.load.image('heart_full', '../assets/images/heart_full.png');
    game.load.image('heart_half', '../assets/images/heart_half.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    show_life();
    create_controls();

    // Vulnerable timer
    vulnerable_timer = game.time.create(false);
    vulnerable_timer.loop(1000, function(){
        is_player_vulnerable = true;
    }, this);

    debug();
}

function update() {
    if(up.isDown) {
        if(is_player_vulnerable) {
            hit_player();
        }
    }
}

function debug() {
    //console.log(life);
}

function show_life() {
    life = game.add.group()
    life.create(200, 0, 'heart_full');
    life.create(100, 0, 'heart_full');
    life.create(0, 0, 'heart_full');
}

function hit_player() {
    heart = life.getFirstAlive();
    if(heart.key === "heart_full"){
        heart.loadTexture('heart_half');
    } else {
        heart.kill();
    }
    is_player_vulnerable = false;
    vulnerable_timer.start();
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}