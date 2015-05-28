var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    circle = game.add.graphics(game.world.centerX, game.world.centerY);
    circle.beginFill(0xFFFFFF, 1);
    circle.drawCircle(0, 0, 100);
    circle.inputEnabled = true;
    circle.input.enableDrag(true);

    cursor = game.add.graphics(game.world.centerX - 150, game.world.centerY);
    cursor.beginFill(0xFFFFFF);
    cursor.moveTo(-5, 0);
    cursor.lineTo(-30, 20);
    cursor.lineTo(-30, -20);
    cursor.endFill();
    cursor.inputEnabled = true;
    cursor.input.enableDrag(true);
}

function update() {
    cursor.rotation = game.physics.arcade.angleBetween(cursor, circle.position);
}
