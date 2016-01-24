var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image('red', 'red.png');
    game.load.image('yellow', 'yellow.png');
    game.load.image('green', 'green.png');
    game.load.image('blue', 'blue.png');
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    createBoard();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 50;

    blocks = game.add.group();

    sendBlock();
}

function update() {
    // game.physics.arcade.collide(blocks.children[blocks.children.length - 1], blocks, function(){
    //     sendBlock();
    // });

    // if(blocks.children[blocks.children.length - 1].body.blocked['down']) {
    //     sendBlock();
    // }

}

function sendBlock() {
    console.log("Hello block");

    block = game.add.sprite(0, 0, 'red');
    block.scale.setTo(0.5, 0.5);

    // game.physics.enable(block, Phaser.Physics.ARCADE);
    // block.body.collideWorldBounds = true;

    blocks.add(block);

}

function createBoard() {

}