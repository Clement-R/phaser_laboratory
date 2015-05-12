var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var ship;
var circle;
function preload() {
    game.load.image('ship', '../assets/images/playerShip2_red.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    circle = game.add.graphics(0, 0);
    circle.lineStyle(2, 0xffffff, 1);
    circle.drawCircle(0,
                      0,
                      85);
    
    ship = game.add.sprite(100, 100, 'ship');
    ship.inputEnabled = true;
    ship.events.onInputDown.add(select_unite, this);

    /*circle.x = ship.x + ship.width/2;
    circle.y = ship.y + ship.height/2;*/

    circle.x = ship.width/2;
    circle.y = ship.height/2;
    ship.addChild(circle);
}

function update() {
    //debug();
}

function debug() {
    game.debug.text("Mouse x : " + game.input.mousePointer.x, 32, 10);
    game.debug.text("Mouse y : " + game.input.mousePointer.y, 32, 20);

    game.debug.pixel(100, 100, 'rgba(255,255,255,255)' ) ;
}

function select_unite(selected_unite) 
{
    console.log(selected_unite);

    // TODO /////////////////////////////////
    // Add tweening effect on circle when
    // unit is selected.
    /////////////////////////////////////////

    // selected_unite
}