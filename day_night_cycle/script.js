var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-example",
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image("background", "../assets/images/colored_forest_800_600.png");
    game.load.image("nightFilter", "../assets/images/dark_blue.png");
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;
    var background = game.add.sprite(0, 0, "background");
    var nightFilter = game.add.sprite(0, 0, "nightFilter")

    console.log(nightFilter);

    var tweenFall = game.add.tween(nightFilter).to({alpha: 0},
                                                   5000,
                                                   Phaser.Easing.Linear.In,
                                                   true,
                                                   0,
                                                   -1,
                                                   true);
}

function update() {
}
