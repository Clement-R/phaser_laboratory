var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var socket;
var num;
var players = new Array();

function preload() {
    game.load.atlas('bot', '../assets/images/running_bot.png', '../assets/images/running_bot.json');
}

function create() {
    game.stage.backgroundColor = 0x337799;
    cursors = game.input.keyboard.createCursorKeys();

    /* Server communication */
    socket = io();

    socket.on('notify_new_player', function(data){
        console.log("A new player has connect (id :" + data['id'] + ").");
        add_new_player(data['pos']);
    });

    setup_player();
}

function update() {
    // Player inputs
    if(left.isDown) {
        bot.animations.play('run', 10, true);
        bot.scale.x = 1;
        player.x -= 2;
    } else if (right.isDown) {
        bot.animations.play('run', 10, true);
        bot.scale.x = -1; //flipped
        player.x += 2;
    } else {
        bot.animations.stop('run');
    }

    if(up.isDown) {
        player.y -= 2;
    } else if(down.isDown) {
        player.y += 2;
    }

    socket.emit('game_update', {x: player.x, y: player.y});
}

function setup_player() {
    // Sprite and animation
    var x = game.rnd.integerInRange(50, game.world.width - 50)
    var y = game.rnd.integerInRange(50, game.world.height - 50)
    bot = game.add.sprite(x, y, 'bot');
    bot.anchor.setTo(0.5, 0.5);

    bot.animations.add('run');

    // Controls
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    // Group
    player = game.add.group();
    player.add(bot);

    socket.emit('new_player', {x: x, y: y});
}

function add_new_player(pos) {
    var sprite = game.add.sprite(pos.x, pos.y, 'bot');
    players.push(sprite);
}