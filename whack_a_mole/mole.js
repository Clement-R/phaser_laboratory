function Mole(x, y) {
    x = x || 100;
    y = y || 100;

    this.base_x = x;
    this.base_y = y;
    this.default_height = game.cache.getImage("diglett").height;

    this.sprite = game.add.sprite(x, y + 120, "diglett");
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.whack, this);
    this.sprite.visible = false;
    this.sprite.height = 0;

    this.is_moving = false;
}

Mole.prototype.disapear = function() {
    this.sprite.visible = true;
    this.is_moving = true;

    var mole_h = game.add.tween(this.sprite).to({y: this.base_y + 120}, 150);
    var mole_x = game.add.tween(this.sprite).to({height: 0}, 150);
    mole_x.onComplete.add(function(){
        this.is_moving = false;
    }, this);

    mole_x.start();
    mole_h.start();
};

Mole.prototype.appear = function() {
    this.sprite.visible = true;
    this.is_moving = true;
    var mole_h = game.add.tween(this.sprite).to({y: this.base_y}, 250);
    var mole_x = game.add.tween(this.sprite).to({height: this.default_height}, 250);
    mole_x.onComplete.add(function(){
        this.is_moving = false;
    }, this);

    mole_x.start();
    mole_h.start();
};

Mole.prototype.whack = function() {
    this.disapear();
    score += 1;
};
