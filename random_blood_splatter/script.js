var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var distance = 50;
var rotation_speed = 0.1;
var effect_ready = true;
var start_time;
var next_shot = 3;
var PI = 3.14159265359;

function preload() {
    game.load.image('star', '../assets/images/starGold.png');
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;
    create_controls();

    circle = game.add.graphics(game.world.centerX, game.world.centerY);
    circle.beginFill(0xFFFFFF, 1);
    circle.drawCircle(0, 0, 100);

    cursor = game.add.graphics(game.world.centerX - distance, game.world.centerY);
    cursor.beginFill(0xFFFFFF, 1);
    cursor.drawCircle(0, 0, 10);
    cursor.inputEnabled = true;
    cursor.input.enableDrag(true);
    cursor.rotation = game.physics.arcade.angleBetween(cursor, circle);

    emitter = game.add.emitter(circle.x, circle.y, 100);
    emitter.makeParticles('star');
    emitter.gravity = 0;

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;

    /*emitter.setYSpeed(300, 400);
    emitter.setXSpeed(-10, 10);*/

    /*emitter.setYSpeed(-250, 250);
    emitter.setXSpeed(-250, 250);*/

    emitter.minParticleSpeed.setTo(-50, -50);
    emitter.maxParticleSpeed.setTo(50, 50);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;
}

function update() {

    cursor.x = circle.x + (50 + distance) * Math.cos(cursor.rotation);
    cursor.y = circle.y + (50 + distance) * Math.sin(cursor.rotation);

    if(up.isDown) {
        cursor.rotation += rotation_speed;
    } else if (down.isDown) {
        cursor.rotation -= rotation_speed;
    }

    // cursor.angle = (game.physics.arcade.angleToPointer(cursor) * (180/PI)) - 0.01;

    if(spacebar.isDown && effect_ready) {
        emitter.start(true, 0, null, 10);
        effect_ready = false;
        start_time = game.time.totalElapsedSeconds();
    }

    if(game.time.totalElapsedSeconds() - start_time >= next_shot) {
        effect_ready = true;
    }

    emitter.forEachExists(function(particle){
        if(particle.body.velocity.y > 0) {
            particle.body.velocity.y -= 0.02;
        } else {
            particle.body.velocity.y += 0.02;
        }

        if(particle.body.velocity.x > 0) {
            particle.body.velocity.x -= 0.02;
        } else {
            particle.body.velocity.x += 0.02;
        }

    });
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
