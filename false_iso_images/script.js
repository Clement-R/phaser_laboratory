var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image('tree', '../assets/images/trees_1.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;
    game.add.sprite(0, 0, 'tree');
    game.add.sprite(130, 0, 'tree');
    game.add.sprite(65, 32, 'tree');
}

function update() {
}
