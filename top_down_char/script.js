var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update:update });

var char;
var cursors;
var CHAR_SPEED;
var BULLET_SPEED;
var balls;
var next_fire = 0;
var fire_rate = 100;

function preload () {
    game.load.image('char', '../assets/images/playerBlue0.png');
    game.load.image('golf_ball', '../assets/images/ballGolf.png');
    CHAR_SPEED = 4;
    BULLET_SPEED = 700;
}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 0x2c3e50;

    char = game.add.sprite(game.world.centerX, game.world.centerY, 'char');
    char.anchor.setTo(0.5, 0.5);

    balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.ARCADE;
    balls.createMultiple(50, 'golf_ball');
    balls.setAll('checkWorldBounds', true);
    balls.setAll('outOfBoundsKill', true);

    cursors = game.input.keyboard.createCursorKeys();
}

function update () {
    // Movement of char
    if(cursors.up.isDown) {
        char.y -= CHAR_SPEED;
    } else if(cursors.down.isDown) {
        char.y += CHAR_SPEED;
    } else if (cursors.right.isDown) {
        char.x += CHAR_SPEED;
    } else if(cursors.left.isDown) {
        char.x -= CHAR_SPEED;
    }

    if(game.input.activePointer.isDown) {
        fire();
    }

    // Rotation of char to follow mouse pointer
    char.rotation = this.game.physics.arcade.angleToPointer(char);
}

function fire () {
    if(game.time.now > next_fire && balls.countDead() > 0) {
        next_fire = game.time.now + fire_rate;

        var ball = balls.getFirstDead();
        ball.reset(char.x + 0, char.y + 2.5);

        game.physics.arcade.moveToPointer(ball, BULLET_SPEED);
    }
}