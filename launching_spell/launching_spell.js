var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var fireballs;
var FIRERATE;
var last_shot;
var is_ready_to_fire;

function preload() {
    game.load.spritesheet('fireball', '../assets/images/mario_fireball.png',
                          64, 64, 4);
}

function create() {
    FIRERATE = 200;
    is_ready_to_fire = true;
    last_shot = 0;

    fireballs = game.add.group()
    fireballs.enableBody = true;
    fireballs.physicsBodyType = Phaser.Physics.ARCADE;
    fireballs.createMultiple(30, 'fireball');
    fireballs.forEach(function(fireball){
        fireball.animations.add('fireball');
        fireball.checkWorldBounds = true;
        fireball.outOfBoundsKill = true;
    }, this);
    
    
    fire_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    if(fire_button.isDown && is_ready_to_fire) {
        if(fireballs.getFirstExists(false)) {
            projectile = fireballs.getFirstExists(false);
            projectile.reset(128, 128);
            projectile.play('fireball', 10, true);
            projectile.body.velocity.x = 500;

            is_ready_to_fire = false;
            last_shot = game.time.now;
        }
    }

    if(game.time.now > last_shot + FIRERATE) {
        is_ready_to_fire = true;
    }
}