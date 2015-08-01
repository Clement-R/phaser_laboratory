var game = new Phaser.Game(700, 700, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image('castleMid', '../assets/images/castleMid.png');
    game.load.image('snowCenter', '../assets/images/snowCenter.png');
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;
    walls = game.add.group();
}

function update() {
    for (var i = 9; i >= 0; i--) {
        for (var j = 9; j >= 0; j--) {
            if(i == 0 || i == 9) {
                walls.add(game.add.sprite(70 * i,
                                          70 * j,
                                          "snowCenter"));
            } else {
                if(j == 0 || j == 9) {
                    walls.add(game.add.sprite(70 * i,
                                              70 * j,
                                              "snowCenter"));
                }
            }

        };
    };
}
