var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var fire_button;
var FIRERATE;
var last_shot;
var is_ready_to_fire;
var gray;
var tween;
var crop_rect;

function preload() {
    game.load.image('spell', '../assets/images/spell_01.png');
}

function create() {
    FIRERATE = 2500;
    is_ready_to_fire = true;
    last_shot = 0;

    spell_icon = game.add.sprite(50, 50, 'spell');
    
    fire_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    crop_rect = new Phaser.Rectangle(0, 0, spell_icon.width, spell_icon.height);
    tween = game.add.tween(crop_rect).to({height: spell_icon.height}, FIRERATE, Phaser.Easing.Linear.InOut, false, 0);

    spell_icon.crop(crop_rect);

    // Weird effect
    //tween = game.add.tween(spell_icon.scale).to({y: 1}, FIRERATE, Phaser.Easing.Linear.InOut, false, 0);

    // Fading effect
    // tween = game.add.tween(spell_icon).to({alpha: 1}, FIRERATE, Phaser.Easing.Linear.InOut, false, 0);

    // Idea
    // http://phaser.io/examples/v2/display/arc-details
}

function update() {
    if(fire_button.isDown) {
        fire();
    }

    update_fire();
    spell_icon.updateCrop();
}

function fire() {
    if(is_ready_to_fire) {
        last_shot = game.time.now;
        is_ready_to_fire = false;
        crop_rect.height = 0;
        // spell_icon.alpha = 0;
        tween.start();
    }  
}

function update_fire() {
    if(game.time.now > last_shot + FIRERATE) {
        is_ready_to_fire = true;
    }
}