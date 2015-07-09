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

    player = game.add.sprite(150, 383, 'body');

    arm = game.add.sprite(player.x + (player.width / 2),
                          player.y + (player.height / 3),
                          'arm');
    arm.anchor.set(0.5, 0);

    gun = game.add.sprite(arm.x,
                          arm.y + arm.height,
                          'gun');
    gun.enableBody = true;
    gun.anchor.set(0, 0.65);
    // gun.visible = false;

    /*player.addChild(gun);
    player.addChild(arm);*/

    create_controls();
    create_bullets();

    arm.angle = -90;
    gun.angle = arm.angle + 88.5;
    var p = new Phaser.Point(arm.x, arm.y);
    p.rotate(p.x, p.y, gun.rotation, false, 13);
    gun.x = p.x;
    gun.y = p.y;
}

function update() {
    // player.x += 1;
    game.debug.spriteInfo(gun, 32, 32);
    game.debug.pixel(gun.x, gun.y, 'green');

    next_x = gun.x + 16 * Math.cos(gun.rotation);
    next_y = gun.y + 10 * Math.sin(gun.rotation);
    game.debug.pixel(next_x, next_y, 'pink');

    // console.log(next_x - gun.x, next_y - gun.y);

    // arm rotation
    mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/PI)) - 86;
    if(mouse_angle < 10 && mouse_angle > -180) {
        arm.angle = mouse_angle;
        var p = new Phaser.Point(arm.x, arm.y);
        p.rotate(p.x, p.y, gun.rotation, false, 13);
        gun.x = p.x;
        gun.y = p.y;
        gun.angle = arm.angle + 88.5;
    } else {
        var p = new Phaser.Point(arm.x, arm.y);
        p.rotate(p.x, p.y, gun.rotation, false, 13);
        gun.x = p.x;
        gun.y = p.y;
        gun.angle = arm.angle + 88.5;
    }

    fire();
}

function fire() {
    if(game.input.activePointer.isDown && is_ready_to_fire) {
        if(bullets.getFirstExists(false)) {
            bullet = bullets.getFirstExists(false);
            // bullet.anchor.setTo(0.5, 0.5);

            next_x = gun.x + 16 * Math.cos(gun.rotation);
            next_y = gun.y + 10 * Math.sin(gun.rotation);

            // Set the bullet position to the gun position
            // bullet.reset(gun.x + 14, gun.y - 6);
            bullet.reset(next_x + 5, next_y - 6);
            bullet.rotation = gun.rotation;

            // Shoot it in the right direction
            bullet.body.velocity.x = Math.cos(bullet.rotation) * BULLET_SPEED;
            bullet.body.velocity.y = Math.sin(bullet.rotation) * BULLET_SPEED;

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
    FIRERATE = 400;
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
