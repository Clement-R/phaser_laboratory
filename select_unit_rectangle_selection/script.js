var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var selection;
var initial_point;
var player_units;

function preload() {
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('phaser', 'sprites/phaser-dude.png');
    game.load.image('atari', 'sprites/atari800.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    // Create units
    var g = game.add.group();

    var sprite = game.add.sprite(200, 200, 'phaser');
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(select_unit, this);

    var circle = game.add.graphics(0, 0);
    circle.lineStyle(2, 0xffffff, 1);
    circle.drawCircle(sprite.x + sprite.width/2, sprite.y + sprite.height/2, sprite.height);
    circle.alpha = 0;

    g.add(circle);
    g.add(sprite);

    var y = game.add.group();

    var sprite = game.add.sprite(500, 200, 'atari');
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(select_unit, this);
    
    var circle = game.add.graphics(0, 0);
    circle.lineStyle(2, 0xffffff, 1);
    circle.drawCircle(sprite.x + sprite.width/2, sprite.y + sprite.height/2, sprite.width);
    circle.alpha = 0;
    
    y.add(circle);
    y.add(sprite);

    // Create group that contains all player units
    player_units = game.add.group();
    player_units.add(g);
    player_units.add(y);

    // Rectangle selection
    initial_point = new Phaser.Point();
    last_point = new Phaser.Point();

    selection = game.add.graphics(0, 0);
    selection.visible = false;

    game.input.onDown.add(function(){
        player_units.forEach(function(unit){
            var sprite = unit.children[1];
            deselect_unit(sprite);
        });
        initial_point.x = game.input.position.x;
        initial_point.y = game.input.position.y;
        selection.visible = true;
    });

    game.input.onUp.add(function(){
        selection.visible = false;
    });
}

function update() {
    draw_selection();
    check_units_selection();

    // TODO /////////////////////////////////////////////////
    /*
        1.
        Rectangle selection is working but now click selection
        is broken due to execute check_units_selection every tick.

          // NOT WORKING
        - The method should be called when the pointer is hold.
          Maybe a boolean would do the job. (Not working cause
          game.input.onDown override the onInputDown of the sprite)

          // WORKING !
        - Check if the pointer position is different from initial_point ?
          That would select sprite on click and if the selection is dragged
          others sprites must be selected.

        2.
        Change selection method because actually you can select a sprite only
        on its precise position. Modify to accept all the body of the
        sprite maybe ?
        Take y position (cause it's not the case actually), and the length
        of the sprite.

        And take -x ....
    */
    /////////////////////////////////////////////////////////
}

function select_unit(sprite) {
    circle = sprite.parent.children[0];
    console.log(circle.alpha);
    if(circle.alpha == 0) {
        circle.alpha = 1;
    }
}

function deselect_unit(sprite) {
    circle = sprite.parent.children[0];
    if(circle.alpha == 1) {
        circle.alpha = 0;
    }
}

function check_units_selection() {
    var pointer = game.input.position;

    player_units.forEach(function(unit){
        var sprite = unit.children[1];
        if(selection.visible == true && pointer.x != initial_point.x) {
            if(sprite.x <= pointer.x && sprite.x >= initial_point.x){
                select_unit(sprite);
            } else {
                deselect_unit(sprite);
            }
        }
    });
}

function draw_selection() {
    var pointer = game.input.position;
    var width = game.input.position.x - initial_point.x;
    var height = game.input.position.y - initial_point.y;

    selection.clear();
    selection.lineStyle(1, 0xFFFFFF, 1);
    selection.beginFill(0, 0);

    selection.moveTo(initial_point.x, initial_point.y);
    selection.lineTo(initial_point.x + width, initial_point.y);
    selection.lineTo(pointer.x, pointer.y);
    selection.lineTo(initial_point.x, initial_point.y + height);

    selection.endFill();
}