import {langData} from './lang-data'

let result = document.querySelector('.results');
let btn = document.querySelector('.welcome__btn');
let text = document.querySelector('.welcome__desc');
let storageLang = localStorage.getItem('lang');
let langBtn = document.querySelector('.lang-btn');



let resultLang = storageLang == 'ru' ? true : false;

if (result) {
  let score = localStorage.getItem('result');

  if (score == 30) {
    text.innerText = resultLang ? langData.resultsWinTextRu : langData.resultsWinTextEn;
    btn.style.display = 'none';
  } else if (score == null){
    text.innerText = resultLang ? langData.resultsNullTextRu : langData.resultsNullTextEn
  } else if (score >= 0){
    text.innerText = resultLang ? langData.resultsLoseTextRu : langData.resultsLoseTextEn;
  } 

  langBtn.addEventListener('click', () => {
    if (langBtn.innerText == 'ru') {
      switchLang('ru');
    } else if (langBtn.innerText == 'en') {
      switchLang('en');
    }
  })

  if (storageLang != 'ru') {
    switchLang('en');
  }
  
  function switchLang(lang) {
    if (score == 30) {
      text.innerText = lang == 'ru' ? langData.resultsWinTextRu : langData.resultsWinTextEn;
      btn.style.display = 'none';
    } else if (score == null){
      text.innerText = lang == 'ru' ? langData.resultsNullTextRu : langData.resultsNullTextEn
    } else if (score >= 0){
      text.innerText = lang == 'ru' ? langData.resultsLoseTextRu : langData.resultsLoseTextEn;
    }
    let title = result.querySelector('.welcome__title');
    title.innerText = lang == 'ru' ? langData.resultsTitleRu : langData.resultsTitleEn;
    let btn = result.querySelector('.welcome__btn');
    btn.innerText = lang == 'ru' ? langData.welcomeBtnRu : langData.welcomeBtnEn;
  }
}