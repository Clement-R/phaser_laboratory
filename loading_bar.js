var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var preload_bar;
var progress;
var tick_time = 0.5;

function preload() {
}

function create() {
    progress = 0;
    game.time.events.loop(1, update_counter, game);

    preload_bar = game.add.graphics(0, 50);
    preload_bar.lineStyle(3, 0xffffff, 1);
    preload_bar.moveTo(0, 0);
    preload_bar.lineTo(game.world.width, 0);

    preload_bar.scale.x = 0;
}

function update_counter() {
    progress += tick_time;
    if(progress >= 100) {
        progress = 0;
        progress += tick_time;
    }
}

function update() {
    preload_bar.scale.x = progress * 0.01;
}