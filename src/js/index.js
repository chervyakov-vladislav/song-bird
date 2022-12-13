import '../styles/index.scss'

import { defaultStyles } from './modules/_addBaseStyles'

defaultStyles();

let menuButton = document.querySelector('.burger-button');
let burgerMenu = document.querySelector('.burger-menu__nav')

menuButton.addEventListener('click', burgerMenuToggle);

function burgerMenuToggle() {
  if (menuButton.classList.contains('burger-button--toggled')) {

    menuButton.classList.remove('burger-button--toggled');
    menuButton.classList.add('burger-button--unToggled');
    burgerMenu.style.transform = 'translateX(100%)';

  } else if (menuButton.classList.contains('burger-button--unToggled')) {

    menuButton.classList.remove('burger-button--unToggled');
    menuButton.classList.add('burger-button--toggled');
    burgerMenu.style.transform = 'translateX(0)';

  } else {
    menuButton.classList.add('burger-button--toggled');
    burgerMenu.style.transform = 'translateX(0)';
  }

}