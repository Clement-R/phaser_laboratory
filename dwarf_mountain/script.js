var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var copper = 0;
var silver = 0;
var gold = 0;

var money = 0;
var money_per_second = 0;

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    timer = game.time.create(false);
    timer.loop(1000, update_money, this);
    timer.start();

    timer_1 = game.time.create(false);
    timer_1.loop(10000, function(){money_per_second += 10;}, this);
    timer_1.start();

    score_text = game.add.text(10, 80, 'Money : ' + money,
                               { font: '26px Arial', fill: '#fff' });
}

function update() {
    console.log(money);
    score_text.text = 'Money : ' + money;
}

function update_money() {
    money += money_per_second;
}

/*function Personne(nom) {
  this.nom = nom;
}*/
