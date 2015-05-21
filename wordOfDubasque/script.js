var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var words;
var baddy;
var player;
var key;
var keyReset = false;
var cnt = 0;

var words_l = [
    "FUCK",
];

function preload() {
    game.load.bitmapFont('carrier_command',
                         '../assets/fonts/carrier_command.png',
                         '../assets/fonts/carrier_command.xml');
}

function create() {
    game.stage.backgroundColor = 0x95a5a6;

    key = game.input.keyboard;

    words = game.add.group();
    //bmpText = game.add.bitmapText(350, 10, 'carrier_command', 'Fuck', 17);
    var word = game.add.group();
    word.add(game.add.bitmapText(350, 10, 'carrier_command', 'F', 17));
    word.add(game.add.bitmapText(370, 10, 'carrier_command', 'U', 17));
    word.add(game.add.bitmapText(390, 10, 'carrier_command', 'C', 17));
    word.add(game.add.bitmapText(410, 10, 'carrier_command', 'K', 17));

    //words.add(bmpText);
    words.add(word);

    create_player();
}

function update() {
    /*words.forEach(function(word){
        //word.y += 0.5;
    });*/

    // Get closest word
    var ii = 0;
    var word = words.children[ii];
    var word_value = words_l[cnt];
    var letter = word_value.charCodeAt(cnt);
    /*console.log("a".charCodeAt(0));
    console.log(letter);*/

    if (key.isDown(letter + 32) || key.isDown(letter)) {
        console.log(letter);
        // We remove the letter from the word
        word.children[ii].alpha = 0;
        console.log(word);
        // If word is completely writted we remove it
    } else if (!key.isDown(letter - 32)){
        keyReset = false;
    }
}

function add_word() {
    //word = game.add.sprite();
    //words.add(word);
}

function create_player() {
    var player_texture = game.add.bitmapData(64, 64);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,128,128);
    player_texture.ctx.fillStyle = '#0000ff';
    player_texture.ctx.fill();

    // Create the player and put him in the middle of the screen
    player = game.add.sprite(game.world.width / 2,
                             game.world.height - (player_texture.height + 10),
                             player_texture);

    player.enableBody = true;
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.checkWorldBounds = true;
}