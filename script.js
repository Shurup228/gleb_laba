'use strict'

var PILE_AMOUNT = 5;
var ROCK_AMOUNT = 42;
var TURN_AMOUNT = [1, 2, 3];

{
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

  TURN_AMOUNT.forEach((elem) => {
    let turn = document.createElement('div');
    let text = document.createElement('p');

    turn.dataset.turn = elem;
    text.innerHTML = 'I\'m a turn';

    turn.appendChild(text);
    turnsDiv.appendChild(turn);
  });
}

{
  const piles = document.querySelectorAll('div[data-rocks]');
  const turns = document.querySelectorAll('div[data-turn]');

  function hide(elem) {
    elem.style.transform = 'scale(1, 1)';
  }

  function show(elem) {
    elem.style.transform = 'scale(1.05, 1.05)';
  }

  function action(elem, divs) {
    elem.addEventListener('click', function (event) {
      divs.forEach((el) => {

        if (el.style.transform === 'scale(1.05, 1.05)') {
          hide(el);
          return;
        }

        if (el === elem) {
          show(el);
        } else {
          hide(el);
        }
      });
    });
  }

  piles.forEach((elem) => {
    action(elem, piles);
  });

  turns.forEach((elem) => {
    action(elem, turns);
  });
}
