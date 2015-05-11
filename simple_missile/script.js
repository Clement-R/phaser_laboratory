var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var emitter;
function preload() {
    game.load.spritesheet('rocket', '../assets/images/rockets32x32x8.png', 32, 32, 8);
    game.load.spritesheet('smoke', '../assets/images/smoke64x64x8.png', 64, 64, 8);
}

function create() {
    game.stage.backgroundColor = 0x337799;
    game.add.sprite(0, 0, 'rocket');


    //  Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    emitter = game.add.emitter(game.world.centerX, 500, 400);
    emitter.makeParticles('smoke');

    // min, max
    emitter.setXSpeed(0, 2);
    emitter.setYSpeed(0, 0);

    // min, max
    emitter.setRotation(0, 0);

    // min, max, rate, ease, yoyo
    emitter.setAlpha(0.1, 1, 3000);

    // minX, maxX, minY, maxY, rate, ease, yoyo
    emitter.setScale(0.4, 1.5, 0.4, 1.5, 6000, Phaser.Easing.Quintic.Out);
    emitter.gravity = -100;

    // explode, lifespan, frequency, quantity, forceQuantity
    emitter.start(false, 2000, 20);

    // TODO /////////////////////////////////////////////
    // Add fadding off effect for the trail to look more natural
    // Make smoke following the missile
    /////////////////////////////////////////////////////

    emitter.emitX = 64;
    emitter.emitY = 100;

    /*game.add.tween(emitter).to( { emitX: 800-64 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    game.add.tween(emitter).to( { emitY: 200 }, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);*/
}

function update() {
    emitter.x += 0.2;
    emitter.y += 0.5;
}
