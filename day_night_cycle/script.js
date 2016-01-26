var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-example",
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image("background", "../assets/images/colored_forest_800_600.png");
    game.load.image("nightFilter", "../assets/images/dark_blue.png");
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;
    var background = game.add.sprite(0, 0, "background");
    nightFilter = game.add.sprite(0, 0, "nightFilter");

    isNight = true;

    tweenRise = game.add.tween(nightFilter).to({alpha: 0},
                                                   2500,
                                                   Phaser.Easing.Linear.In);
    tweenFall = game.add.tween(nightFilter).to({alpha: 1},
                                                   2500,
                                                   Phaser.Easing.Linear.In);
    timer = game.time.create(false);
    timer.loop(5000, toggleDay, this);
    timer.start();
}

function update() {
    console.log(nightFilter.alpha);
}

function toggleDay() {
    console.log("Toggle");
    if(isNight) {
        tweenRise.start();
        isNight = false;
    } else {
        tweenFall.start();
        isNight = true;
    }
}
