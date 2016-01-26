var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.spritesheet('fireball', '../assets/images/fireball_3.png', 64, 48, 4);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 0x337799;

    fireball = game.add.sprite(10, 10, 'fireball');
    game.physics.enable(fireball, Phaser.Physics.ARCADE);
    fireball.checkWorldBounds = true;
    fireball.outOfBoundsKill = true;
    fireball.animations.add('fire');
    fireball.play('fire', 10, true);
    fireball.body.velocity.x = 500;
}

function update() {
    console.log(fireball.x);
}
