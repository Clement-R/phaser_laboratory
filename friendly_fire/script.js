var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

/*
RESSOURCES :

http://rotates.org/phaser/xv/
*/
var PI = 3.14159265359;

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

    player = game.add.sprite(150, 383, 'body');

    gun = game.add.sprite(player.x + (player.width / 2),
                          player.y + (player.height / 3),
                          'gun');

    gun.pivot.setTo(-12, 13);
    gun.enableBody = true;

    arm = game.add.sprite(player.x + (player.width / 2),
                          player.y + (player.height / 3),
                          'arm');
    arm.anchor.setTo(0.5, 0);

    create_controls();
    create_bullets();

    gun.angle = arm.angle + 86;
}

function update() {
    game.debug.spriteInfo(gun, 32, 32);
    game.debug.pixel(gun.x, gun.y, 'rgba(0,255,255,1)');
    game.debug.body(gun);

    // arm rotation
    mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/PI)) - 86;
    if(mouse_angle < 10 && mouse_angle > -180) {
        arm.angle = mouse_angle;
        gun.angle = arm.angle + 86;
    }

    if(spacebar.isDown && is_ready_to_fire) {
        if(bullets.getFirstExists(false)) {
            bullet = bullets.getFirstExists(false);
            bullet.anchor.setTo(0.5, 0.5);
            bullet.reset(gun.x + gun.width,
                         gun.y);
            bullet.body.velocity.x = 1400;
            bullet.rotation = game.physics.arcade.angleBetween(bullet, gun);

            is_ready_to_fire = false;
            last_shot = game.time.now;
        }
    }
    // Fire cooldown checker
    if(game.time.now > last_shot + FIRERATE) {
        is_ready_to_fire = true;
    }
}

function create_bullets() {
    FIRERATE = 200;
    bullet_DAMAGE = 10;
    is_ready_to_fire = true;
    last_shot = 0;

    bullets = game.add.group()
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(100, 'bullet');

    bullets.forEach(function(bullet){
        bullet.damage = bullet_DAMAGE;
        bullet.body.gravity.allowGravity = false;
        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;
    }, this);
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}