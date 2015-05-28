var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    circle = game.add.graphics(0, 0);
    circle.beginFill(0xFFFFFF, 1);
    circle.drawCircle(game.world.centerX, game.world.centerY, 100);

    cursor = game.add.graphics(game.world.centerX - 150, game.world.centerY);
    cursor.beginFill(0xFFFFFF);
    cursor.moveTo(-5, 0);
    cursor.lineTo(-30, 20);
    cursor.lineTo(-30, -20);
    cursor.endFill();
}

function update() {
    // cursor.rotation = game.physics.arcade.angleBetween(cursor, circle.position);
    cursor.rotation = 0;
}
