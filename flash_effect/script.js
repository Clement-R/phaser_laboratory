var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var filter;
var base_filter;
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
    // Used formula for ColorMatrixFilter calculation :
    /*
    destR = ( a[0]  * srcR ) + ( a[1]  * srcG ) + ( a[2]  * srcB ) + ( a[3]  * srcA )
    destG = ( a[5]  * srcR ) + ( a[6]  * srcG ) + ( a[7]  * srcB ) + ( a[8]  * srcA )
    destB = ( a[10] * srcR ) + ( a[11] * srcG ) + ( a[12] * srcB ) + ( a[13] * srcA )
    destA = ( a[15] * srcR ) + ( a[16] * srcG ) + ( a[17] * srcB ) + ( a[18] * srcA )
    */

    // Experiment
    /*
    experiment_filter = [1,0,0,0,
                         0,1,0,0,
                         0,0,1,0,
                         0,0,0,1];
    */
    // Base matrix
    // base_filter = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];

    // Hide sprite
    /*
    experiment_filter = [0,0,0,0,
                         0,0,0,0,
                         0,0,0,0,
                         0,0,0,0];
    */
}

function update() {
    // Player inputs
    if(up.isDown || down.isDown || left.isDown || right.isDown) {
        filter.matrix = experiment_filter;
        bot.filters = [filter];
    } else {
        filter.matrix = base_filter;
        bot.filters = [filter];
    }

    // DEBUG
    // debug();
}

function debug() {
}

function flash(sprite) {
    
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
