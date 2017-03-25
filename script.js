'use strict'

const PILE_AMOUNT = 5;
const ROCK_AMOUNT = 42;
const TURN_AMOUNT = [1, 2, 3];
const pilesDiv = document.getElementById('piles');
const turnsDiv = document.getElementById('turns');

{ // Layout things
  for (let i = 0; i < PILE_AMOUNT; i++) {
    let pile = document.createElement('div');
    let text = document.createElement('p');

    pile.dataset.rocks = ROCK_AMOUNT;
    pile.dataset.num = i + 1; // For differentiating piles
    text.innerHTML = `Pile #${i + 1}`;

    pile.appendChild(text);
    pilesDiv.appendChild(pile);
  }

  TURN_AMOUNT.forEach((elem, index) => {
    let turn = document.createElement('div');
    let text = document.createElement('p');

    turn.dataset.turn = elem;
    turn.dataset.num = index + 1; // Also for differentiating
    text.innerHTML = 'I\'m a turn';

    turn.appendChild(text);
    turnsDiv.appendChild(turn);
  });
}

{ // Some logic things related to selection of piles and turns
  const piles = document.querySelectorAll('div[data-rocks]');
  const turns = document.querySelectorAll('div[data-turn]');

  function hide(elem) {
    elem.style.transform = 'scale(1, 1)';
  }

  function show(elem) {
    elem.style.transform = 'scale(1.05, 1.05)';
  }

  function action(elem, divs, parent) {
    elem.addEventListener('click', function (event) {
      divs.forEach((el) => {

        if (el === elem) {
          if (el.style.transform === 'scale(1.05, 1.05)') {
            parent.dataset.chosen = '';
            hide(el);
            return;
          }

          parent.dataset.chosen = el.dataset.num;
          show(el);
        } else {
          hide(el);
        }
      });
    });
  }

  piles.forEach((elem) => {
    action(elem, piles, pilesDiv);
  });

  turns.forEach((elem) => {
    action(elem, turns, turnsDiv);
  });
}
