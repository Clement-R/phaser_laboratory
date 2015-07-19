var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image('star', '../assets/images/starGold.png');
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    sprite = game.add.sprite(100, 100, 'star');
    sprite.anchor.setTo(0.5, 0.5);

    pointer = game.input.position;
    line1 = new Phaser.Line(sprite.x, sprite.y, pointer.x, pointer.y);
}

function update() {
    line1.setTo(sprite.x, sprite.y, pointer.x, pointer.y);
    game.debug.geom(line1);
}
