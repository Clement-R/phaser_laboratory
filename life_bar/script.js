var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var character;
var health_bar;

function preload() {
    game.load.spritesheet('player_mvt', '../assets/images/p1_spritesheet.png',
                          64, 64, 4);
    game.load.image('player', '../assets/images/p1_stand.png');
}

function create() {
    // Create character
    character = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    character.anchor.setTo(0.5, 0.5);

    // Life bar
    x = character.x - character.width / 2;
    y = character.y - character.height / 2 - 10;
    health_bar = game.add.graphics(x, y);
    health_bar.lineStyle(3, 0x00ff00, 1);
    health_bar.lineTo(character.width, 0);

    // Controls
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    // Group
    player = game.add.group();
    player.add(character);
    player.add(health_bar);
}

function update() {
    var life_scale = 0.2;

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

    // Move player group (character + health_bar)
    if(left.isDown) {
        player.x -= 5;
    }
    if(right.isDown) {
        player.x += 5;
    }

    // DEBUG
    // debug();
}

function debug() {
    game.debug.spriteBounds(character);
    console.log(health_bar.scale.x);
}