var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var s;
var keyReset = false;
var min_y = 0;
var closest_word;

function preload() {
    game.load.bitmapFont('carrier_command',
                         '../assets/fonts/carrier_command.png',
                         '../assets/fonts/carrier_command.xml');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x2c3e50;
    key = game.input.keyboard;

    bad_words = game.add.group();
    good_words = game.add.group();

    add_word('FUCK', 200, 10, bad_words);
    add_word('TA RACE', 400, 100, bad_words);
    add_word('PEACE', 350, 450, good_words);
}

/*
    TODO :

    What would be great, is to create a Word class and set attributes like
    word_text (containing the word), next_letter and extending sprite for
    all the physic part.
*/

function update() {
    bad_words.forEach(function(bad_word){
        // bad_word.body.velocity.y = 50;
        good_words.forEach(function(good_word){
            if(checkOverlap(bad_word, good_word)) {
                bad_word.destroy();
                good_word.destroy();
            }
        });
    });

    var bad_word = bad_words.getFirstAlive();
    var good_word = good_words.getFirstAlive();

    if(good_word && bad_word) {
        // game.physics.arcade.moveToObject(good_word, bad_word, 1, 80);    
    }
    
    bad_words.forEach(function(word){
        if(word.y > min_y) {
            min_y = word.y;
            closest_word = word;
            /*var word_text = "";
            word.children.forEach(function(text){ word_text += text.text; });
            console.log(word_text);*/
        }
    });

    /*
    // Work and kill the sprite one by one (kill the two instantly but it's
    // because the second word is set as closest_word at the next frame,
    // a timer can solve this problem).
    if(game.time.totalElapsedSeconds() > 3) {
        closest_word.destroy();
        min_y = 0;
    }
    */

    var good_word = good_words.getFirstAlive();

    /*
    if (key.isDown(letter + 32) || key.isDown(letter)) {
        // TODO : Change typing effect //////
        word.children[cnt].alpha = 0;
        /////////////////////////////////////
        if(cnt + 1 < word.children.length) {
            cnt += 1;    
        } else {
            launch_word();
            console.log('Word killed');
        }
    } else if (!key.isDown(letter - 32)){
        keyReset = false;
    }*/
}

function add_word(word, x, y, group) {
    var font_size = 17;
    var width = 0;

    var sprite = game.add.sprite(x, y);
    group.add(sprite);

    for(var i = 0; i < word.length; i++) {
        var letter = word[i];
        width += 20;
        sprite.addChild(game.add.bitmapText((20 * i), 0,
                       'carrier_command', letter, font_size));
    };

    sprite.is_launched = false;
    game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.setSize(width, font_size, 0, 0);
}

function checkOverlap(entity_a, entity_b) {
    var bounds_a = entity_a.getBounds();
    var bounds_b = entity_b.getBounds();

    return Phaser.Rectangle.intersects(bounds_a, bounds_b);
}
