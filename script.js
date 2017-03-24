'use strict'

var PILE_AMOUNT = 5;
var ROCK_AMOUNT = 42;
var TURN_AMOUNT = [1, 2, 3];

const pilesDiv = document.getElementById('piles');

for (let i = 0; i < PILE_AMOUNT; i++) {
  let pile = document.createElement('div');
  pile.innerHTML = '<p>I\'m a pile';
  pilesDiv.appendChild(pile);
}
