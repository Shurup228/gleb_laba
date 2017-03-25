'use strict'

var PILE_AMOUNT = 5;
var ROCK_AMOUNT = 42;
var TURN_AMOUNT = [1, 2, 3];

const pilesDiv = document.getElementById('piles');
const turnsDiv = document.getElementById('turns');

for (let i = 0; i < PILE_AMOUNT; i++) {
  let pile = document.createElement('div');
  let text = document.createElement('p');

  text.innerHTML = `Pile #${i + 1}`;
  pile.dataset.rocks = ROCK_AMOUNT;

  pile.appendChild(text);
  pilesDiv.appendChild(pile);
}

TURN_AMOUNT.forEach((elem, index, arr) => {
  let turn = document.createElement('div');
  let text = document.createElement('p');

  turn.dataset.turn = elem;
  text.innerHTML = 'I\'m a turn';

  turn.appendChild(text);
  turnsDiv.appendChild(turn);
});
