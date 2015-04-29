var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {
	game.load.spritesheet('kaboom', '../assets/images/explode.png', 128, 128);
}

var boom;
var key;
var explosions;

function create() {

	boom = game.add.sprite(300, 300, null);

	//boom.animations.add('explosion', 'kaboom');
	explosions = game.add.group();
    explosions.createMultiple(25, 'kaboom');
    explosions.forEach(function(one_sprite){
        one_sprite.animations.add('kaboom');
    }, this);

	key = game.input.keyboard.addKey(Phaser.Keyboard.UP);

	// Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        700, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
}

function update() {
	if (key.isDown) {
		var explosion = explosions.getFirstExists(false);
		if(explosion != null) {
			explosion.reset(game.rnd.integerInRange(0, 800), game.rnd.integerInRange(0, 600));
	    	explosion.play('kaboom', 30, false, true);
		}
    }

    // Updating FPS counter
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');
    }
}
