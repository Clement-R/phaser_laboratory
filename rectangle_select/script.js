var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var rect;
var initial_point;

// TODO ////////////////////////////////
/* 
   Graphics is not good, changing height
   and width change the scale factor.

   Maybe BitmapData worth a try.
*/
////////////////////////////////////////

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x337799;

    initial_point = new Phaser.Point();
    last_point = new Phaser.Point();

    rect = game.add.graphics(0, 0);
    rect.lineStyle(1, 0xFFFFFF, 1);
    rect.drawRect(0, 0, 10, 10);
    rect.visible = false;

    game.input.onDown.add(function(){
        console.log('Down');
        //console.log(game.input.position.x + " " + game.input.position.y);
        initial_point.x = game.input.position.x;
        initial_point.y = game.input.position.y;
        rect.position = initial_point;
        rect.visible = true;
    });

    game.input.onUp.add(function(){
        console.log('Up');
        rect.visible = false;
    });
}

function update() {
    game.debug.text("x : " + game.input.position.x, 20, 20);
    game.debug.text("y : " + game.input.position.y, 20, 40);
    game.debug.text("x : " + initial_point.x, 20, 80);
    game.debug.text("y : " + initial_point.y, 20, 100);

    game.debug.text("Rect x : " + rect.x, 150, 20);
    game.debug.text("Rect y : " + rect.y, 150, 40);
    game.debug.text("Rect height : " + rect.height, 150, 60);
    game.debug.text("Rect width : " + rect.width, 150, 80);

    rect.width = game.input.position.x - initial_point.x;
    rect.height = game.input.position.y - initial_point.y;
}

function doSomething() {
}