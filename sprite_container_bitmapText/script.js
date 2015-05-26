var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var s;
var keyReset = false;
var min_y = 0;
var closest_word;
var counter = 0;

var bad_words_list = [
    "ANDOUILLE",
    "SACREBLEU",
    "ABRUTI",
    "AVORTON",
    "STAGIAIRE",
    "DIANTRE",
];

var good_words_list = [
    "HARDI",
    "PAIX",
    "AMOUR",
    "IMPRESSIONNANT",
];

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

    add_word(get_random_word(bad_words_list), 200, 10, bad_words, true);
    add_word(get_random_word(bad_words_list), 400, 100, bad_words, true);
    add_word(get_random_word(good_words_list), game.world.centerX, 550, good_words);
}

function update() {
    var bad_word = bad_words.getFirstAlive();
    var good_word = good_words.getFirstAlive();
    
    bad_words.forEach(function(word){
        if (word.y > 450) {
            word.destroy();
        }

        // Get closest word
        if(word.y > min_y) {
            min_y = word.y;
            closest_word = word;
        } 
    });

    good_words.forEach(function(good_word){
        if(good_word.is_launched) {
            game.physics.arcade.moveToObject(good_word, closest_word, 1, 80);
        }
    });

    var good_word = good_words.getFirstAlive();
    if(good_word && bad_words.length > 0) {
        var letter = good_word.children[counter].text.charCodeAt(0);

        if (key.isDown(letter + 32) || key.isDown(letter)) {
            good_word.children[counter].tint = "0xFF0000";
            if(counter + 1 < good_word.children.length) {
                counter += 1;
            } else {
                good_word.is_launched = true;
                counter = 0;
                min_y = 0;
                add_word(get_random_word(good_words_list), game.world.centerX, 550, good_words);
            }
        } else if (!key.isDown(letter - 32)){
            keyReset = false;
        }
    }

    game.physics.arcade.overlap(good_words, bad_words, collision_handler, null, this);
}

function add_word(word, x, y, group, movement) {
    var movement = movement || false;
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

    if(movement) {
        sprite.body.velocity.y = 50;
    } else {
        sprite.anchor.setTo(0.5, 0.5);
    }
}

function collision_handler(entity_a, entity_b) {
    entity_a.destroy();
    entity_b.destroy();
}

function get_random_word(words_list) {
    var rnd_int = game.rnd.integerInRange(0, words_list.length - 1);
    return words_list[rnd_int];
}
