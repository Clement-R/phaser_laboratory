var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image('ship', '../assets/images/playerShip2_red.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    turret = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
    turret.anchor.setTo(0.5, 0.5);
}

function update() {
    // Need to add 1.5 offset because rotation at 0 make the sprite look up
    turret.rotation = game.physics.arcade.angleToPointer(turret) + 1.5;
    debug();
}

function debug() {
    game.debug.spriteInfo(turret, 32, 32);
}