var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var filter;
var base_filter;
var is_player_vulnerable = true;
var flash_timer;
var vulnerable_timer;

function preload() {
    game.load.atlas('bot', '../assets/images/running_bot.png',
                    '../assets/images/running_bot.json');
    game.load.script('filter', '../js/filters/pixi/ColorMatrixFilter.js');
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    // Start physic engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Player and animation
    create_player();

    // Controls
    create_controls();

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
    // Flash timer
    flash_timer = game.time.create(false);
    flash_timer.loop(50, function(){
        filter.matrix = base_filter;
        bot.filters = [filter];
    }, this);

    // Vulnerable timer
    vulnerable_timer = game.time.create(false);
    vulnerable_timer.loop(250, function(){
        is_player_vulnerable = true;
    }, this);
}

function update() {
    // Player inputs
    if(up.isDown || down.isDown || left.isDown || right.isDown) {
        if(is_player_vulnerable) {
            hurt_player();    
        }
    }

    // DEBUG
    // debug();
}

function debug() {
}

function hurt_player() {
    /* -- FLASH -- */
    filter.matrix = experiment_filter;
    bot.filters = [filter];

    // We create a timer
    flash_timer.start();
    /* -- /FLASH/ -- */

    /* -- KNOCKBACK -- */
    player.forEach(function (graphic) {
        graphic.x += 5;
    });
    /* -- /KNOCKBACK/ -- */

    /* -- VULNERABLE -- */
    is_player_vulnerable = false;
    vulnerable_timer.start();
    /* -- /VULNERABLE/ -- */
}

function create_player() {
    // Bot sprite
    bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    bot.enableBody = true;
    game.physics.enable(bot, Phaser.Physics.ARCADE);
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


function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}
