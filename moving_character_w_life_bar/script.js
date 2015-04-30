var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var player;
var health_bar;
var life_scale = 0.05;

function preload() {
    game.load.atlas('bot', '../assets/images/running_bot.png', '../assets/images/running_bot.json');
}

function create() {
    // Sprite and animation
    bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    bot.anchor.setTo(0.5, 0.5);

    bot.animations.add('run');

    // Controls
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    // Life bar
    x = bot.x - bot.width / 2;
    y = bot.y - bot.height / 2 - 10;
    health_bar = game.add.graphics(x, y);
    health_bar.lineStyle(3, 0x00ff00, 1);
    health_bar.lineTo(bot.width, 0);

    // Group
    player = game.add.group();
    player.add(bot);
    player.add(health_bar);
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

    // Add life
    if(up.isDown) {
        if(health_bar.scale.x < 1) {
            health_bar.scale.x += life_scale;
        }
    }
    // Remove life
    if(down.isDown) {
        if(health_bar.scale.x >= 0 && (health_bar.scale.x - 0.001) >= 0) {
            health_bar.scale.x -= life_scale;
        }
    } 
}
