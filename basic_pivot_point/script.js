var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    var sprite_texture = game.add.bitmapData(64, 64);
    sprite_texture.ctx.beginPath();
    sprite_texture.ctx.rect(0,0,128,128);
    sprite_texture.ctx.fillStyle = '#ff0000';
    sprite_texture.ctx.fill();

    sprite = game.add.sprite(100, 100, sprite_texture);

    sprite.pivot.setTo(sprite.width / 2,
                       sprite.height / 2);
}

function update() {
    sprite.angle += 1;

    game.debug.pixel(sprite.x, sprite.y, "white");
}
