var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var rect;
var initial_point;

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x337799;

    initial_point = new Phaser.Point();
    last_point = new Phaser.Point();

    rect = game.add.graphics(0, 0);
    rect.visible = false;

    game.input.onDown.add(function(){
        initial_point.x = game.input.position.x;
        initial_point.y = game.input.position.y;
        rect.visible = true;
    });

    game.input.onUp.add(function(){
        rect.visible = false;
    });
}

function update() {
    draw_selection();
}

function draw_selection() {
    var pointer = game.input.position;
    var width = game.input.position.x - initial_point.x;
    var height = game.input.position.y - initial_point.y;

    rect.clear();
    rect.lineStyle(1, 0xFFFFFF, 1);
    rect.beginFill(0, 0);

    rect.moveTo(initial_point.x, initial_point.y);
    rect.lineTo(initial_point.x + width, initial_point.y);
    rect.lineTo(pointer.x, pointer.y);
    rect.lineTo(initial_point.x, initial_point.y + height);

    rect.endFill();
}