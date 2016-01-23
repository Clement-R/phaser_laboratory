var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;
}

function update() {
}

// gameboy palette :
// 9CBD0F
// 8CAD0F
// 306230
// 0F380F
// http://www.colourlovers.com/palette/1459399/Game_Boy_DMG-01

// http://www.colourlovers.com/palette/2928242/DMG_COLOR_COLORS_P3