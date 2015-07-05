var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

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
}

function update() {
    if (cursors.down.isDown) {
        player.animations.play('walk_down', 5, true);
    } else if (cursors.up.isDown) {
        player.animations.play('walk_up', 5, true);
    } else if (cursors.left.isDown) {
        player.animations.play('walk_left', 5, true);
    } else if (cursors.right.isDown) {
        player.animations.play('walk_right', 5, true);
    }
}
