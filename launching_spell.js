var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var fireball;

function preload() {
    game.load.spritesheet('fireball', 'assets/images/mario_fireball.png',
                          64, 64, 4);
}

function create() {
    fireball = game.add.sprite(128, 128, 'fireball');
    fireball.animations.add('fireball');

    fireballs = game.add.group()
}

function update() {
    fireball.animations.play('fireball', 10, true);
    fireball.x += 5;
}


/*
this.bullets = this.add.group();
this.bullets.enableBody = true;
this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
this.bullets.createMultiple(30, 'player_shot');
this.bullets.setAll('anchor.x', 0.5);
this.bullets.setAll('anchor.y', 1);
this.bullets.setAll('outOfBoundsKill', true);
this.bullets.setAll('checkWorldBounds', true);
*/