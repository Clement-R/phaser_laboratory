var game = new Phaser.Game(700, 700, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image('castleMid', '../assets/images/castleMid.png');
    game.load.image('snowCenter', '../assets/images/snowCenter.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 0x2c3e50;
    walls = game.add.group();

    /* Walls */
    for (var i = 9; i >= 0; i--) {
        for (var j = 9; j >= 0; j--) {
            if(i == 0 || i == 9) {
                wall = game.add.sprite(70 * i,
                                       70 * j,
                                       "snowCenter");
            } else {
                if(j == 0 || j == 9) {
                    wall = game.add.sprite(70 * i,
                                           70 * j,
                                           "snowCenter");
                }
            }
            game.physics.enable(wall, Phaser.Physics.ARCADE);
            wall.body.immovable = true;
            walls.add(wall);
        };
    };

    /* Player */
    player = game.add.sprite(140, 140, 'castleMid');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    timer = game.time.create(false);
    timer.loop(2000, function(){
        player.body.velocity.x = 5000;
    }, this);
    timer.start();
}

function update() {
    game.physics.arcade.collide(player, walls);

}
