var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var rS;

function preload() {
}

function create() {
    rS = new rStats({values: {
        fps: { caption: 'FPS', below: 30 }
        },
    });
}

function update() {
    rS( 'FPS' ).frame();
    rS( 'update' ).start();

    // Code here

    rS().update();
    rS( 'update' ).end();
}