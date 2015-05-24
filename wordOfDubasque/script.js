var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var words;
var baddy;
var player;
var key;
var keyReset = false;
var cnt = 0;

var b_words_l = [
    "FUCK",
    "SACREBLEU",
];

var g_words_l = [
    "PEACE",
    "LOVE",
];

function preload() {
    game.load.bitmapFont('carrier_command',
                         '../assets/fonts/carrier_command.png',
                         '../assets/fonts/carrier_command.xml');
}

function create() {
    game.stage.backgroundColor = 0x95a5a6;

    key = game.input.keyboard;

    g_words = game.add.group();
    add_word(b_words_l[0], 350, 10);
    add_word(g_words_l[0], 350, 400);
    create_player();
}

function update() {
    g_words.forEach(function(word){
        //word.y += 0.5;
    });

    // Get closest word
    var ii = 0;
    var word = g_words.children[0];
    var letter = word.children[cnt].text.charCodeAt(0);

    if (key.isDown(letter + 32) || key.isDown(letter)) {
        // We remove the letter from the word
        word.children[cnt].alpha = 0;
        if(cnt + 1 < word.children.length) {
            cnt += 1;    
        } else {
            console.log('Word killed');
        }
        // If word is completely writted we remove it
    } else if (!key.isDown(letter - 32)){
        keyReset = false;
    }
}

function add_word(word_s, x, y) {
    var word = game.add.group();

    for (var i = 0; i < word_s.length; i++) {
        var letter = word_s[i];
        word.add(game.add.bitmapText(x + (20 * i), y, 'carrier_command', letter, 17));    
    };
    g_words.add(word);
}

function create_player() {
    var player_texture = game.add.bitmapData(64, 64);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,128,128);
    player_texture.ctx.fillStyle = '#0000ff';
    player_texture.ctx.fill();

    player = game.add.sprite(game.world.width / 2,
                             game.world.height - (player_texture.height + 10),
                             player_texture);

    player.enableBody = true;
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.checkWorldBounds = true;
}