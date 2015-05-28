var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;
    create_controls();

    circle = game.add.graphics(game.world.centerX, game.world.centerY);
    circle.beginFill(0xFFFFFF, 1);
    circle.drawCircle(0, 0, 100);


    cursor = game.add.graphics(game.world.centerX - 150, game.world.centerY);
    cursor.beginFill(0xFFFFFF, 1);
    cursor.drawCircle(0, 0, 10);
    cursor.inputEnabled = true;
    cursor.input.enableDrag(true);
    cursor.rotation = game.physics.arcade.angleBetween(cursor, circle);
}

function update() {
    
    cursor.x = circle.x + (50 + 150) * Math.cos(cursor.rotation);
    cursor.y = circle.y + (50 + 150) * Math.sin(cursor.rotation);
    
    //cursor.rotation = game.physics.arcade.angleBetween(cursor, circle);
    if(up.isDown) {
        cursor.rotation += 0.05;
    } else if (down.isDown) {
        cursor.rotation -= 0.05;
    }
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
