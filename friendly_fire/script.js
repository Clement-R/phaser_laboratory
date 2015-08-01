var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

/*
RESSOURCES :

http://rotates.org/phaser/xv/
http://www.piskelapp.com/p/agxzfnBpc2tlbC1hcHByEwsSBlBpc2tlbBiAgICQ5-jtCAw
http://www.gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/

Tilemap collision :
http://www.gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/
http://phaser.io/examples/v2/tilemaps/map-collide

{"character":
    {
        "head":
        {
            "x": body.x + body.width / 2,
            "y": body.y
        }
        "arm":
        {
            "x": body.x + body.width / 2,
            "y": body.y + body.height / 3
        }
        "legs":
        {
            "x": body.x + body.width / 2,
            "y": body.y + body.height
        }
    }
}

*/
var BULLET_SPEED = 3000;

function preload() {
    /* Character parts */
    game.load.image('body', '../assets/images/friendly_fire/body.png');
    game.load.image('arm', '../assets/images/friendly_fire/arm.png');

    /* Gun parts */
    game.load.image('gun', '../assets/images/friendly_fire/gun.png');

    /* Ammunitions */
    game.load.image('bullet', '../assets/images/friendly_fire/bullet.png');

    /* Maps */
    game.load.tilemap('level1', 'maps/map_01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('castleMid', '../assets/images/castleMid.png');
    game.load.image('snowCenter', '../assets/images/snowCenter.png');
}

function create() {
    // Scaling options
    /*
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.scale.setScreenSize(true);
    */

    game.stage.backgroundColor = 0x2c3e50;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 200;

    /* Map creation */
    map = game.add.tilemap('level1');
    map.addTilesetImage('castleMid');
    map.setCollisionBetween(4, 9);
    map.setCollisionBetween(2684354564, 2684354566);

    collisionLayer = map.createLayer("Calque 1");
    collisionLayer.debug = true;

    /* Player creation */
    create_player();

    /* Debug sight line */
    pointer = game.input.position;
    line1 = new Phaser.Line(arm.x, arm.y, pointer.x, pointer.y);
}

function update() {
    // arm rotation
    mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/Math.PI)) - 88;
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

    game.physics.arcade.collide(p_body, collisionLayer);

    bullets.forEach(function(bullet){
        game.physics.arcade.collide(bullet, collisionLayer, function(){
            bullet.kill();
        });

        /* Try to catch collision with intersect */

        /*****************************************/

        /*if(bullet.alive) {
            game.physics.arcade.overlap(bullet, collisionLayer, function(){
                bullet.kill();
                console.log('kill');
            });
        }*/
    });

    // Debug sight line
    // Calculate point coordinates
    x = gun.x + gun.height * 0.66 * Math.cos(gun.rotation);
    y = gun.y + gun.height * 0.66 * Math.sin(gun.rotation);

    // Set new point to origin
    x -= gun.x;
    y -= gun.y;

    // Get coordinates after rotation
    angle = -1.57; // We make a rotation of -90°
    x_new = x * Math.cos(angle) - y * Math.sin(angle);
    y_new = x * Math.sin(angle) + y * Math.cos(angle);

    // Set new point to it's original position
    next_x = x_new + gun.x;
    next_y = y_new + gun.y;

    // Set point to end of cannon
    next_x = next_x + gun.width * Math.cos(gun.rotation);
    next_y = next_y + gun.width * Math.sin(gun.rotation);

    line1.setTo(next_x, next_y, pointer.x, pointer.y);

    game.debug.geom(line1);

    /* QUICK FIX */
    arm.x = p_body.x + (p_body.width / 2);
    arm.y = p_body.y + (p_body.height / 3);

    /*
    var player;

    // Then to detect the sides all around the player.
    player.body.blocked.up
    player.body.blocked.left
    player.body.blocked.right
    player.body.blocked.bottom
    */

    game.debug.body(p_body);

    g.forEach(function(sprite){
        sprite.body.velocity.x = 0;
    });
    move();
}

function fire() {
    if(game.input.activePointer.isDown && is_ready_to_fire) {
        if(bullets.getFirstExists(false)) {
            bullet = bullets.getFirstExists(false);

            bullet.body.allowGravity = false;
            // Calculate point coordinates
            x = gun.x + gun.height * 0.66 * Math.cos(gun.rotation);
            y = gun.y + gun.height * 0.66 * Math.sin(gun.rotation);

            // Set new point to origin
            x -= gun.x;
            y -= gun.y;

            // Get coordinates after rotation
            angle = -1.57; // We make a rotation of -90°
            x_new = x * Math.cos(angle) - y * Math.sin(angle);
            y_new = x * Math.sin(angle) + y * Math.cos(angle);

            // Set new point to it's original position
            next_x = x_new + gun.x;
            next_y = y_new + gun.y;

            // Set point to end of cannon
            next_x = next_x + gun.width * Math.cos(gun.rotation);
            next_y = next_y + gun.width * Math.sin(gun.rotation);

            // Set the bullet position to the gun position
            bullet.reset(next_x, next_y);
            bullet.rotation = gun.rotation;

            // Shoot it in the right direction
            gun_precision_angle = 1.5;
            game.physics.arcade.velocityFromAngle(gun.angle + game.rnd.integerInRange(-gun_precision_angle, gun_precision_angle),
                                                  BULLET_SPEED,
                                                  bullet.body.velocity);
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
        // bullet.body.gravity.y = 0;
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

    up_k = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    down_k = game.input.keyboard.addKey(Phaser.Keyboard.S);
    right_k = game.input.keyboard.addKey(Phaser.Keyboard.D);
    left_k = game.input.keyboard.addKey(Phaser.Keyboard.Q);
}

function move() {
    g.forEach(function(sprite) {
        sprite.body.velocity.x = 0;
    });

    if(up_k.isDown || up.isDown) {
        g.forEach(function(sprite) {
            if(sprite.body.onFloor()) {
                sprite.body.velocity.y = -100;
            }
        });
    }
    if(down_k.isDown || down.isDown) {

    }
    if(left_k.isDown || left.isDown) {
        g.forEach(function(sprite){
            sprite.body.velocity.x = -100;
        });
    } else if (right_k.isDown || right.isDown) {
        g.forEach(function(sprite){
            sprite.body.velocity.x = 100;
        });
    }
}

function create_player() {
    p_body = game.add.sprite(150, 383, 'body');

    g = game.add.group();

    arm = game.add.sprite(p_body.x + (p_body.width / 2),
                          p_body.y + (p_body.height / 3),
                          'arm');
    arm.anchor.set(0.5, 0);

    gun = game.add.sprite(arm.x,
                          arm.y + arm.height,
                          'gun');
    gun.anchor.set(0, 0.65);

    create_controls();
    create_bullets();

    arm.angle = -90;
    gun.angle = arm.angle + 88.5;
    var p = new Phaser.Point(arm.x, arm.y);
    p.rotate(p.x, p.y, gun.rotation, false, 13);
    gun.x = p.x;
    gun.y = p.y;

    g.add(p_body);
    g.add(gun);
    g.add(arm);

    g.enableBody = true;
    g.physicsBodyType = Phaser.Physics.ARCADE;

    g.forEach(function(sprite){
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = true;
    });

    arm.body.gravity = 0;
    gun.body.gravity = 0;
}