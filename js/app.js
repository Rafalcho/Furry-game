document.addEventListener('DOMContentLoaded', function() {

  function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
  }

  function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
  }

  function Game() {

    this.board = document.querySelectorAll('#board > div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x, y) {
      return x + (y * 10);
    };

    this.showFurry = function() {

      if (document.querySelector('.furry')) {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
      } else {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
      }

    };

    this.showCoin = function() {
      this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    var self = this;
    this.moveFurry = function() {

      if (this.furry.direction === 'right') {
        this.furry.x = this.furry.x + 1;
      } else if (this.furry.direction === 'left') {
        this.furry.x = this.furry.x - 1;
      } else if (this.furry.direction === 'up') {
        this.furry.y = this.furry.y - 1;
      } else if (this.furry.direction === 'down') {
        this.furry.y = this.furry.y + 1;
      }

      this.gameOver();
      this.showFurry();

      document.getElementById('move').play();
      document.getElementById('move').currentTime = 0;

      this.checkCoinCollision();
    };

    this.hideVisibleFurry = function() {
      document.querySelector('.furry').classList.remove('furry');
    };

    this.startGame = function() {
      this.idSetInterval = setInterval(function() {
        self.moveFurry();
      }, 300);
    };

    this.turnFurry = function(event) {

      switch (event.which) {

        case 37:
          this.furry.direction = 'left';
        break;

        case 38:
          this.furry.direction = 'up';
        break;

        case 39:
          this.furry.direction = 'right';
        break;

        case 40:
          this.furry.direction = 'down';
        break;

      }
    };

    this.checkCoinCollision = function() {

      if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {

        document.getElementById('coin').currentTime = 0;
        document.getElementById('coin').play();
        document.querySelector('.coin').classList.remove('coin');

        this.score += 1;
        document.querySelector('#score strong').textContent = this.score;
        this.coin = new Coin();
        this.showCoin();
      }
    };

    this.gameOver = function() {
      if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {

        this.hideVisibleFurry();
        clearInterval(this.idSetInterval);
        this.showFurry = function() {};

        document.getElementById('game_over').currentTime = 0;
        document.getElementById('game_over').play();

        document.querySelector('#over span').textContent = this.score;
        document.querySelector('#over').classList.remove('invisible');
      }
    };
  }

  var playGame = document.querySelector('.play');

  playGame.addEventListener('click', function() {

    document.getElementById('start').currentTime = 0;
    document.getElementById('start').play();

    document.querySelector('#welcome').classList.add('invisible');

    var newGame = new Game();
    newGame.showFurry();
    newGame.showCoin();
    newGame.startGame();

    document.addEventListener('keydown', function(event) {
      newGame.turnFurry(event);
    });
  });

  var playAgain = document.querySelector('.playAgain');

  playAgain.addEventListener('click', function() {

    document.getElementById('start').currentTime = 0;
    document.getElementById('start').play();

    document.querySelector('#over').classList.add('invisible');
    document.querySelector('#score strong').textContent = '0';
    document.querySelector('.coin').classList.remove('coin');

    newGame = new Game();
    newGame.showFurry();
    newGame.showCoin();
    newGame.startGame();

    document.addEventListener('keydown', function(event) {
      newGame.turnFurry(event);
    });
  });

});
