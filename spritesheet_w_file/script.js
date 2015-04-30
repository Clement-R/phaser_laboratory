var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var player;

function preload() {
    game.load.atlas('bot', '../assets/images/running_bot.png', '../assets/images/running_bot.json');
}

function create() {
    // Sprite and animation
    bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    bot.anchor.setTo(0.5, 0.5);

    bot.animations.add('run');

    // Controls
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
}

function update() {
    // Player inputs
    if(left.isDown) {
        bot.animations.play('run', 10, true);
        bot.x -= 2;
    } else {
        bot.animations.stop('run');
    }
}
