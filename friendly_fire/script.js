var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

/*
RESSOURCES :

http://rotates.org/phaser/xv/
*/

function preload() {
    game.load.image('body', '../assets/images/friendly_fire/body.png');
    game.load.image('arm', '../assets/images/friendly_fire/arm.png');
    game.load.image('gun', '../assets/images/friendly_fire/gun.png');
}

function create() {
    game.renderer.renderSession.roundPixels = true;
    game.stage.backgroundColor = 0x2c3e50;
    game.world.setBounds(0, 0, 992, 480);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 200;

    player = game.add.sprite(150, 383, 'body');
    arm = game.add.sprite(player.x + (player.width / 2),
                             player.y + (player.height / 3),
                             'arm');
    arm.anchor.setTo(0.5, 0);

    gun = game.add.sprite(arm.x,
                          arm.y,
                          'gun');
    //gun.anchor.setTo(0.5, 0);
    gun.rotation = arm.rotation;
}

function update() {
    game.debug.spriteInfo(arm, 32, 32);
    arm.rotation = game.physics.arcade.angleToPointer(arm) - 1.5;
    gun.rotation = arm.rotation + 1.5;

    /*
    gun.x = arm.bounds.x + (arm.width / 2);
    gun.y = arm.bounds.y + (arm.height / 1);*/
}
