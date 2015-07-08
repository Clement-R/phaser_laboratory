var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var player;
var health_bar;
var life_scale;

var HEALTH = 100;
var FIREBALL_DAMAGE = 25;

var timer;
var filter;
var base_filter;
var experiment_filter;

var is_player_vulnerable = true;
var vulnerable_timer;

function preload() {
    game.load.atlas('bot', '../assets/images/running_bot.png',
                    '../assets/images/running_bot.json');
    game.load.spritesheet('fireball', '../assets/images/mario_fireball.png',
                          64, 64, 4);
    game.load.spritesheet('kaboom', '../assets/images/explode.png', 128, 128);
    game.load.script('filter', '../js/filters/pixi/ColorMatrixFilter.js');
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    // Start physic engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Player and animation
    create_player();

    // Fireballs
    create_fireballs();

    // EXPLOSIONS BITCH !
    create_explosions();

    // Controls
    create_controls();

    timer = game.time.create(false);
    // Filters
    filter = new PIXI.ColorMatrixFilter();
    // White matrix
    experiment_filter = [1,1,1,1,
                         1,1,1,1,
                         1,1,1,1,
                         0,0,0,1];
    // Base matrix
    base_filter = [1,0,0,0,
                   0,1,0,0,
                   0,0,1,0,
                   0,0,0,1];

    // Vulnerable timer
    vulnerable_timer = game.time.create(false);
    vulnerable_timer.loop(250, function(){
        is_player_vulnerable = true;
    }, this);
}

function update() {
    // Player inputs
    if(left.isDown) {
        bot.animations.play('run', 10, true);
        bot.scale.x = 1;
        bot.x -= 2;
        health_bar.x = bot.x - bot.width / 2;
    } else if (right.isDown) {
        bot.animations.play('run', 10, true);
        bot.scale.x = -1;
        bot.x += 2;
        health_bar.x = bot.x + bot.width / 2;
    } else {
        bot.animations.stop('run');
    }

    // FIRE !
    if(spacebar.isDown && is_ready_to_fire) {
        if(fireballs.getFirstExists(false)) {
            projectile = fireballs.getFirstExists(false);
            projectile.anchor.setTo(0.5, 0.5);
            projectile.reset(10, game.world.centerY);
            projectile.play('fire', 10, true);
            projectile.body.velocity.x = 500;

            is_ready_to_fire = false;
            last_shot = game.time.now;
        }
    }
    // Fire cooldown checker
    if(game.time.now > last_shot + FIRERATE) {
        is_ready_to_fire = true;
    }

    // Collision between fireball and bot
    game.physics.arcade.overlap(bot, fireballs, hit_player, null, this);

    // DEBUG
    // debug();
}

function debug() {
    console.log("Bot health : " + bot.health);
    console.log("Life scale : " + life_scale);

    game.debug.spriteBounds(bot);
    fireballs.forEachAlive(function(fireball) {
            game.debug.spriteBounds(fireball);
        }
    );

    game.debug.text(bot.x, 30, 10);
    game.debug.text(bot.y, 30, 25);

    game.debug.text(player.x, 70, 10);
    game.debug.text(player.y, 70, 25);
}

function life_down(life) {
    if(bot.health > 0) {
        health_bar.scale.x -= life_scale;
        bot.health -= life;
    }

    if (bot.health <= 0) {
        kill_player();
        create_player();
    }
}

function kill_player() {
    var explosion = explosions.getFirstExists(false);
    if(explosion != null) {
        explosion.reset(bot.x, bot.y);
        explosion.anchor.setTo(0.5, 0.5);
        explosion.play('explode', 30, false, true);
    }

    player.forEach(function (graphic) {
        graphic.kill()
    });
}

function life_up(life) {
    if(bot.health < HEALTH) {
        health_bar.scale.x += life_scale;
        bot.health += life;
    }
}

function hit_player(bot, fireball) {
    filter.matrix = experiment_filter;
    bot.filters = [filter];

    // We create a timer
    timer.loop(50, function(){
        filter.matrix = base_filter;
        bot.filters = [filter];
    }, this);
    timer.start();

    /* -- KNOCKBACK -- */
    player.forEach(function (graphic) {
        graphic.x += 25;
    });
    /* -- /KNOCKBACK/ -- */

    /* -- VULNERABLE -- */
    is_player_vulnerable = false;
    vulnerable_timer.start();
    /* -- /VULNERABLE/ -- */

    life_scale = fireball.damage / HEALTH;
    life_down(fireball.damage);
    fireball.kill();
}

function create_player() {
    // Bot sprite
    bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    bot.enableBody = true;
    bot.health = HEALTH;
    game.physics.enable(bot, Phaser.Physics.ARCADE);
    bot.body.collideWorldBounds = true;
    bot.checkWorldBounds = true;
    bot.anchor.setTo(0.5, 0.5);

    bot.animations.add('run');

    // Life bar
    x = bot.x - bot.width / 2;
    y = bot.y - bot.height / 2 - 10;
    health_bar = game.add.graphics(x, y);
    health_bar.lineStyle(3, 0x00ff00, 1);
    health_bar.lineTo(bot.width, 0);

    // Group
    player = game.add.group();
    player.add(bot);
    player.add(health_bar);
}

function create_fireballs() {
    FIRERATE = 200;
    is_ready_to_fire = true;
    last_shot = 0;

    fireballs = game.add.group()
    fireballs.enableBody = true;
    fireballs.physicsBodyType = Phaser.Physics.ARCADE;
    fireballs.createMultiple(30, 'fireball');
    fireballs.forEach(function(fireball){
        fireball.damage = FIREBALL_DAMAGE;
        fireball.animations.add('fire');
        fireball.scale.setTo(0.5);
        fireball.checkWorldBounds = true;
        fireball.outOfBoundsKill = true;
    }, this);
}

function create_explosions() {
    explosions = game.add.group();
    explosions.createMultiple(25, 'kaboom');
    explosions.forEach(function(explosion){
        explosion.position.setTo(50, 50);
        explosion.animations.add('explode');
    });
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
