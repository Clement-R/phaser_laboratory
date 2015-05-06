var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var SPEED;

function preload() {
    game.load.image('background_1', '../assets/images/parallax-forest-back-trees.png');
    game.load.image('background_2', '../assets/images/parallax-forest-middle-trees.png');
    game.load.image('background_3', '../assets/images/parallax-forest-front-trees.png');
}

function create() {
    SPEED = 2;
    sp = game.add.sprite(0, 0, "background_1");

    background_1 = game.add.tileSprite(0, 0, game.world.width,
                                              game.world.height, "background_1");
    background_2 = game.add.tileSprite(0, 0, game.world.width,
                                              game.world.height, "background_2");
    background_3 = game.add.tileSprite(0, 0, game.world.width,
                                              game.world.height, "background_3");

    background_1.scale.setTo(4);
    background_2.scale.setTo(4);
    background_3.scale.setTo(4);

    create_controls();
}

function update() {
    if(left.isDown) {
        background_1.tilePosition.x += SPEED / 4;
        background_2.tilePosition.x += SPEED / 2;
        background_3.tilePosition.x += SPEED;
    } else if (right.isDown) {
        background_1.tilePosition.x -= SPEED / 4;
        background_2.tilePosition.x -= SPEED / 2;
        background_3.tilePosition.x -= SPEED;
    }
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
