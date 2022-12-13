let score = localStorage.getItem('result');
export const langData = {
  navEn: ['Home', 'Game', 'Gallery', 'Result'],
  navRu: ['Главная', 'Игра', 'Галерея', 'Результат'],
  welcomeTextEn: 'Songbird - quiz app for recognizing birds by their voices. Goal: answer all the questions in the minimum number of clicks',
  welcomeTextRu: 'Songbird - приложение-викторина для распознавания птиц по их голосам. Цель: ответить на все вопросы за минимальное количество нажатий',
  welcomeBtnEn: 'Start',
  welcomeBtnRu: 'Начать игру',
  questionProgressEn: ['Warm up', 'Passerine', 'Forest birds', 'Songbirds', 'Predators', 'Sea birds'],
  questionProgressRu: ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'],
  scoreTextEn: 'Score: ',
  scoreTextRu: 'Счет: ',
  playerSongNameEn: 'Select bird',
  playerSongNameRu: 'Выберите птицу',
  nextBtnEn: 'Next',
  nextBtnRu: 'Далее',
  resultsTitleEn: 'Result',
  resultsTitleRu: 'Результат',
  resultsNullTextEn: 'You didn\'t play yet',
  resultsNullTextRu: 'Вы еще не сыграли',
  resultsLoseTextEn: `You scored ${score} points out of 30. Try again?`,
  resultsLoseTextRu: `Вы набрали ${score} из 30 баллов. Начать заного?`,
  resultsWinTextEn: 'You scored 30 points out of 30',
  resultsWinTextRu: 'Вы набрали 30 из 30 баллов',
}

let langBtn = document.querySelector('.lang-btn');
let navText = Array.from(document.querySelectorAll('.nav__link'));
let burgerLinks = Array.from(document.querySelectorAll('.burger-menu__link'))
let storageLang;
let welcome = document.querySelector('.is-welcome');

storageLang = localStorage.getItem('lang');
if (storageLang != 'ru') {
  switchLang('en');
  langBtn.innerText = 'en';
}

langBtn.addEventListener('click', () => {
  if (langBtn.innerText == 'ru') {
    langBtn.innerText = 'en';
    localStorage.setItem('lang', 'en');
    switchLang('en');
  } else if (langBtn.innerText == 'en'){
    langBtn.innerText = 'ru';
    localStorage.setItem('lang', 'ru');
    switchLang('ru');
  }
})

function switchLang(lang) {
  let navArray = lang == 'en' ? langData.navEn : langData.navRu
  navText.forEach((item, index) => {
    item.innerText = navArray[index];
    burgerLinks[index].innerText = navArray[index];
  })

  if (welcome) {
    let welcomeText = document.querySelector('.welcome__desc');
    welcomeText.innerText = lang == 'en' ? langData.welcomeTextEn : langData.welcomeTextRu;
    let welcomeBtn = document.querySelector('.welcome__btn');
    welcomeBtn.innerText = lang == 'en' ? langData.welcomeBtnEn : langData.welcomeBtnRu;
  }
}