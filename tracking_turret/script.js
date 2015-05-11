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
    turret.rotation = game.physics.arcade.angleToPointer(turret);
    //turret.rotation += 0.025;
    debug();
}

function debug() {
    // game.debug.spriteBounds(turret);
    // console.log(game.physics.arcade.angleToPointer(turret));
    // console.log(turret.rotation);
}