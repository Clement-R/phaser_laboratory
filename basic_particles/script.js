var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var emitter;

function preload() {
    game.load.image('star', '../assets/images/starGold.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x337799;

    score_text = game.add.text(game.width / 2, game.height / 2, 'Click !',
                               { font: '26px Arial', fill: '#fff' });
    score_text.anchor.setTo(0.5, 0.5);

    // emitter(x, y, maxNumberParticles)
    emitter = game.add.emitter(0, 0, 500);
    emitter.makeParticles('star');
    emitter.gravity = 200;

    game.input.onDown.add(particleBurst, this);

}

function update() {
}

function particleBurst(pointer) {

    //  Position the emitter where the mouse/touch event was
    emitter.x = pointer.x;
    emitter.y = pointer.y;

    //  The first parameter sets the effect to "explode"
    //  which means all particles are emitted at once.
    //  The second gives each particle a 2000ms lifespan.
    //  The third is ignored when using burst/explode mode.
    //  The final parameter (10) is how many particles will
    //  be emitted in this single burst.
    emitter.start(true, 2000, null, 50);
}