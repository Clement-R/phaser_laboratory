var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var player;
function preload() {
    game.load.atlas('bot', '../assets/images/running_bot.png', '../assets/images/running_bot.json');
}

function create() {
    game.stage.backgroundColor = 0x95a5a6;

    // Sprite and animation
    bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    bot.anchor.setTo(0.5, 0.5);

    bot.animations.add('run');

    // Controls
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    // Group
    player = game.add.group();
    player.add(bot);
}

function update() {
    // Player inputs
    if(left.isDown) {
        bot.animations.play('run', 10, true);
        bot.scale.x = 1;
        player.x -= 2;
    } else if (right.isDown) {
        bot.animations.play('run', 10, true);
        bot.scale.x = -1; //flipped
        player.x += 2;
    } else {
        bot.animations.stop('run');
    }

    if(up.isDown) {
        player.y -= 2;
    } else if(down.isDown) {
        player.y += 2;
    }
}