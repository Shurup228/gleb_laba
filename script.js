'use strict'

const PILE_AMOUNT = 5;
const ROCK_AMOUNT = 42;
const TURN_AMOUNT = [1, 2, 3];
const PILES_DIV = document.getElementById('piles');
const TURNS_DIV = document.getElementById('turns');
const BUTTON = document.querySelector('#control div');
const RULES_DIV = document.getElementById('rules');

function remove(elem) {
  elem.style.transform = 'scale(1, 1)';
  elem.style.boxShadow = '';
  elem.style.backgroundColor = 'rgba(211, 211, 211, 0.5)';
}

function select(elem) {
  elem.style.transform = 'scale(1.05, 1.05)';
  elem.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
  elem.style.backgroundColor = 'white';
}

// Example of data: {'pile 1': 30, 'pile 2': 42}
function updateAll(data) {
  const piles = document.querySelectorAll('div[data-rocks]');
  const turns = document.querySelectorAll('div[data-turn]');

  for (let pileNum in data) {
    let pile = PILES_DIV.querySelector(`div[data-num="${pileNum.split(' ')[1]}"]`);
    pile.childNodes[1].innerHTML = data[pileNum];
    pile.dataset.rocks = data[pileNum];
  }

  [PILES_DIV, TURNS_DIV].forEach((div) => {
    const toHide = document.querySelector(`#${div.id} div[data-num="${div.dataset.chosen}"]`);
    remove(toHide);
    div.dataset.chosen = '';
  });
}

function showToolTip() {
  for (let i = 1; i < 27; i++) {
    RULES_DIV.style.bottom = `${-25 + i}%`;
  }
}

function hideToolTip() {
  for (let i = 1; i < 27; i++) {
    RULES_DIV.style.bottom = `${1 - i}%`;
  }
}

{ // Layout things
  for (let i = 0; i < PILE_AMOUNT; i++) {
    let pile = document.createElement('div');
    let text = document.createElement('p');
    let num = document.createElement('p');
    let hr = document.createElement('hr');

    pile.dataset.rocks = ROCK_AMOUNT;
    pile.dataset.num = i + 1; // For differentiating piles
    text.innerHTML = `Pile ${i + 1}`;
    num.innerHTML = `<b>${ROCK_AMOUNT}</b>`;

    pile.appendChild(text);
    pile.appendChild(num);
    PILES_DIV.appendChild(pile);
  }

  TURN_AMOUNT.forEach((elem, index) => {
    let turn = document.createElement('div');
    let text = document.createElement('p');

    turn.dataset.turn = elem;
    turn.dataset.num = index + 1; // Also for differentiating
    text.innerHTML = `Take <b>${elem}</b>`;

    turn.appendChild(text);
    TURNS_DIV.appendChild(turn);
  });
}

{ // Some logic things related to selection of piles and turns
  const piles = document.querySelectorAll('div[data-rocks]');
  const turns = document.querySelectorAll('div[data-turn]');

  function action(elem, divs, parent) {
    elem.addEventListener('click', function (event) {
      divs.forEach((el) => {

        if (el === elem) {
          if (el.style.transform === 'scale(1.05, 1.05)') {
            parent.dataset.chosen = '';
            remove(el);
            return;
          }

          parent.dataset.chosen = el.dataset.num;
          select(el);
        } else {
          remove(el);
        }
      });
    });
  }

  piles.forEach((elem) => {
    action(elem, piles, PILES_DIV);
  });

  turns.forEach((elem) => {
    action(elem, turns, TURNS_DIV);
  });
}

{ // Button things
  BUTTON.addEventListener('mousedown', function (event) {
    BUTTON.style.boxShadow = 'inset 0px 4px 8px 0px rgba(0,0,0,0.5)';
  });

  document.body.addEventListener('mouseup', function (event) {
    BUTTON.style.boxShadow = '';
  });

  BUTTON.addEventListener('click', function (event) {
    if (!PILES_DIV.dataset.chosen || !TURNS_DIV.dataset.chosen) {
      showToolTip();
      setTimeout(hideToolTip, 10000);
      return;
    }

    const piles = document.querySelectorAll('div[data-rocks]');
    const chosenPile = PILES_DIV.querySelector(`div[data-num="${PILES_DIV.dataset.chosen}"]`);
    const rocksTurn = TURNS_DIV.querySelector(`div[data-num="${TURNS_DIV.dataset.chosen}"]`);
    const rocksTaken = rocksTurn.dataset.turn;

    let data = {};
    piles.forEach((elem) => {
      let next = elem.dataset.rocks;

      if (elem == chosenPile) {
        next -= rocksTaken;
      }

      data[`pile ${elem.dataset.num}`] = next;
    });

    updateAll(data);
  });
}
