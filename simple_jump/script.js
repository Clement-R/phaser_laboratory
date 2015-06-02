var game = new Phaser.Game(800, 400, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var player;
var jumpTimer = 0;
var jumpButton;
var jump = 0;
var maxJump = 2;
var speed = 1;

function preload() {
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x2c3e50;

    game.physics.arcade.gravity.y = 300;

    var player_texture = game.add.bitmapData(64, 64);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,32,32);
    player_texture.ctx.fillStyle = '#00eeff';
    player_texture.ctx.fill();

    player = game.add.sprite(32, 320, player_texture);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.maxVelocity.y = 500;
    player.body.setSize(20, 32, 5, 16);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    jumpButton.onDown.add(function(){
        if(/* game.time.now > jumpTimer && */ jump < maxJump){
            if(jump == 0) {
                console.log('JUMP');
            } else {
                console.log('DOUBLE JUMP');
            }
            
            player.body.velocity.y = -500;
            // jumpTimer = game.time.now + 350;
            jump += 1;
        }
    });
}

function update() {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150 * speed;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150 * speed;
    }

    if(sprintButton.isDown) {
        speed = 2;
    } else {
        speed = 1;
    }

    if(player.body.onFloor()) {
        jump = 0;
    }
}

function render () {
    game.debug.bodyInfo(player, 16, 24);
}