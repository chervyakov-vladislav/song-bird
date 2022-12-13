let player = require('./player');
let game = require('./game');
let nextBtn = document.querySelector('.game__btn');
let result = require('./result');
let lang = require('./lang-data');

let defaultStyles = () => {
  if (document.querySelectorAll('.progress-bar__item')[0]) {
    document.querySelectorAll('.progress-bar__item')[0].classList.add('progress-bar__item--active')
  }

  let welcomeBtn = document.querySelector('.welcome__btn');
  if (welcomeBtn) {
    welcomeBtn.addEventListener('click', () => {
      window.open('./game.html', '_self')})
  }

  if (nextBtn) {
    nextBtn.disabled = true;
  }
}

export {defaultStyles}