var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var distance = 50;
var rotation_speed = 0.1;
var effect_ready = true;
var start_time;
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
}

function update() {

    cursor.x = circle.x + (50 + distance) * Math.cos(cursor.rotation);
    cursor.y = circle.y + (50 + distance) * Math.sin(cursor.rotation);

    if(up.isDown) {
        cursor.rotation += rotation_speed;
    } else if (down.isDown) {
        cursor.rotation -= rotation_speed;
    }

    if(spacebar.isDown && effect_ready) {
        emitter.start(true, 2000, null, 10);
        effect_ready = false;
        // start_time = this.game.time.totalElapsedSeconds();
    }
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
