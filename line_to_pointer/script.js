var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var PI = 3.14159265359;

function preload() {
    game.load.image('star', '../assets/images/starGold.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 0x2c3e50;

    g = game.add.group();

    sprite = game.add.sprite(350, 250, 'star');

    arm_texture = game.add.bitmapData(32, 64);
    arm_texture.ctx.beginPath();
    arm_texture.ctx.rect(0, 0, 32, 64);
    arm_texture.ctx.fillStyle = "#27ae60";
    arm_texture.ctx.fill();
    arm = game.add.sprite(sprite.x + sprite.width / 2,
                          sprite.y + sprite.height / 2,
                          arm_texture);
    arm.anchor.set(0.5, 0);

    g.add(sprite);
    g.add(arm);

    pointer = game.input.position;
    line1 = new Phaser.Line(arm.x, arm.y, pointer.x, pointer.y);
}

function update() {
    line1.setTo(arm.x, arm.y, pointer.x, pointer.y);
    game.debug.geom(line1);

    /* Phaser way */
    mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/PI));
    arm.angle = mouse_angle - 90;

    g.forEach(function(child){
        // child.x += 0.5;
    });
}
