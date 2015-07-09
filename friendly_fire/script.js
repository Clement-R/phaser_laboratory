var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

/*
RESSOURCES :

http://rotates.org/phaser/xv/
*/
var PI = 3.14159265359;
var BULLET_SPEED = 1200;

function preload() {
    game.load.image('body', '../assets/images/friendly_fire/body.png');
    game.load.image('arm', '../assets/images/friendly_fire/arm.png');
    game.load.image('gun', '../assets/images/friendly_fire/gun.png');
    game.load.image('bullet', '../assets/images/friendly_fire/bullet.png');
}

function create() {
    game.renderer.renderSession.roundPixels = true;
    game.stage.backgroundColor = 0x2c3e50;
    game.world.setBounds(0, 0, 992, 480);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 0;

    g_player = game.add.group();

    player = game.add.sprite(200, 150, 'body');

    arm = game.add.sprite(player.x + (player.width / 2),
                          player.y + (player.height / 3),
                          'arm');
    arm.anchor.set(0.5, 0.1);
    console.log(arm.anchor);
    g_player.add(player);
    g_player.add(arm);

    create_controls();
}

function update() {
    console.log(arm.x)
    console.log(arm.y)
    console.log(arm.anchor.x);
    console.log(arm.anchor.y);
    console.log(arm.width);
    console.log(arm.height);

    console.log(arm.x + (arm.width * arm.anchor.x))
    console.log(arm.y + (arm.height * arm.anchor.y))
    game.debug.pixel(arm.x + (arm.width * arm.anchor.x),
                     arm.y + (arm.height * arm.anchor.y),
                     'yellow');

    // arm rotation
    /*mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/PI)) - 86;
    arm.angle = mouse_angle;*/
    arm.angle += 2;
    /*mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/PI)) - 86;
    if(mouse_angle < 10 && mouse_angle > -180) {
        arm.angle = mouse_angle;
    } else {
    }*/
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
