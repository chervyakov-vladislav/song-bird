import birdsData from "./birds-data";
import birdsDataEn from "./birds-data-en";
import {pickBirdText} from "./player"
import {langData} from './lang-data'

let player = document.querySelector('.question-player')
let answers = document.querySelector('.answers');
let audioFile = document.querySelector('#question-audio');
let birdAudio = document.querySelector('#main-audio');
let playPauseBtn = document.querySelector('.question-player__play-pause');
let progressBar = document.querySelector('.question-progress-area__bar');
let volume = document.querySelector('.question-player__volume');
let nextBtn = document.querySelector('.game__btn');
let birdImg = document.querySelector('.question-player__img');
let birdName = document.querySelector('.question-player__song-name');
let progressBarItems = Array.from(document.querySelectorAll('.progress-bar__item'));
let rightAnswer;
let answersList;
let successSound = new Audio();
// 'https://assets.mixkit.co/sfx/preview/mixkit-retro-game-notification-212.mp3'
let negativeSound = new Audio();
// 'https://assets.mixkit.co/sfx/preview/mixkit-arrow-whoosh-1491.mp3'
let currentQuestion = 0;
let hasAnswer = false;
let score = 5;
let totalScore = 0;
let scoreText = document.querySelector('.game__score-text');
let storageLang = localStorage.getItem('lang');
let langBtn = document.querySelector('.lang-btn');

let currentLang = document.querySelector('.lang-btn').innerText == 'ru' ? true : false
let currentData = currentLang ? birdsData : birdsDataEn

successSound.volume = 0.5;
negativeSound.volume = 0.5;

if (answers) {
  localStorage.removeItem('result');
  createAnswersList(currentQuestion);
  pickRandomBird(currentQuestion);
  audioFile.volume = 0.4;
  playPauseBtn.addEventListener('click', () => {
    let isPause = player.classList.contains('paused');
    isPause ? playMusic() : pauseMusic();
  })
  answersList.forEach(element => {
    element.addEventListener('click', (event) => {
      clickOnAnswer(event);
      pickBirdText(event)
    });
  });

  audioFile.addEventListener('timeupdate', event => {
    let currentTime = event.target.currentTime;
    let duration = event.target.duration;
    let progress = (currentTime/duration) * 100;
    progressBar.style.width = `${progress}%`;
    if (progress == 100) {
      pauseMusic();
    }
    updateTime(currentTime);

    volume.addEventListener('change', () => {
      let volumeValue = Number(volume.value)
      audioFile.volume = (volumeValue/100);
    })
  })

  nextBtn.addEventListener('click', nextQuestions);

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
}

function createAnswersList(index) {
  answers.innerHTML = '';
  for (let i=0; i<currentData[index].length; i++) {
    let item = document.createElement('li');
    item.classList.add('answers__item')
    let indicator = document.createElement('div');
    indicator.classList.add('answers__indicator');
    let title = document.createElement('div');
    title.classList.add('answers__title');
    title.innerText = `${currentData[index][i].name}`;
    item.setAttribute('data-id', `${currentData[index][i].id}`);
    item.append(indicator);
    item.append(title);
    answers.append(item);
  }
  answersList = Array.from(document.querySelectorAll('.answers__item'));
}

function getRand() {
  return Math.floor(Math.random()*6);
}

function loadMusic(i, j) {
  audioFile.setAttribute('src', currentData[i][j].audio);
  pauseMusic();
}

function pickRandomBird(index) {
  rightAnswer = getRand();
  loadMusic(index, rightAnswer);
}


function playMusic() {
  player.classList.remove('paused');
  playPauseBtn.setAttribute('src', './assets/pause-icon.svg');
  birdAudio.pause();
  audioFile.play();
}

function pauseMusic() {
  player.classList.add('paused');
  playPauseBtn.setAttribute('src', './assets/play-icon.svg');
  audioFile.pause();
}

export {pauseMusic}

function updateTime(currentTime) {
    
  audioFile.addEventListener('loadeddata', () => {
    let totalTime = document.querySelector('.question-progress-area__tital-time');
    let audioDuration = audioFile.duration;
    let totalMin = Math.floor(audioDuration/60);
    let totalSec = Math.floor(audioDuration%60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    totalTime.innerText = `${totalMin}:${totalSec}`

  })
  let currentTimeText = document.querySelector('.question-progress-area__current-time');
  let totalMin = Math.floor(currentTime/60);
  let totalSec = Math.floor(currentTime%60);

  if (totalSec < 10) {
    totalSec = `0${totalSec}`
  }
  currentTimeText.innerText = `${totalMin}:${totalSec}`
}

function clickOnAnswer(event) {
  let element = event.target.closest('.answers__item');
  let pressed = element.classList.contains('pressed')
  let itemId = event.target.closest('.answers__item').dataset.id - 1;
  let itemIndicator = element.querySelector('.answers__indicator');
  if (itemId == rightAnswer && !pressed) {
    itemIndicator.style.background = '#1C361C';
    negativeSound.src = '';
    successSound.src = '';
    successSound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-retro-game-notification-212.mp3';
    successSound.play();
    element.classList.add('pressed');
    nextStep();
    hasAnswer = true;
    loadInfo();
    totalScore += score;
    scoreText.innerText = localStorage.getItem('lang') == 'ru' ? `Счет: ${totalScore}` : `Score: ${totalScore}`;
    pauseMusic()
  } else if (itemId != rightAnswer && !pressed && !hasAnswer) {
    itemIndicator.style.background = 'red';
    negativeSound.src = '';
    successSound.src = '';
    negativeSound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-arrow-whoosh-1491.mp3';
    negativeSound.play();
    element.classList.add('pressed');
    score--;
  }
}

function nextStep() {
  if (currentQuestion < currentData.length-1) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = false;
    nextBtn.innerText = localStorage.getItem('lang') == 'ru' ? 'Результат' : 'Result';
    localStorage.setItem('result', totalScore);
    nextBtn.addEventListener('click', () => {
      window.open('./results.html', '_self')
    })
  }
}

function nextQuestions() {
  currentQuestion++;
  birdName.innerText = '******';
  progressBar.style.width = '1%';
  birdImg.setAttribute('src', './assets/bird-icon.svg');
  createAnswersList(currentQuestion);
  pickRandomBird(currentQuestion);
  hasAnswer = false;
  answersList.forEach(element => {
    element.addEventListener('click', (event) => {
      clickOnAnswer(event);
      pickBirdText(event)
    });
  });
  nextBtn.disabled = true;
  progressBarItems.forEach(elem => elem.classList.remove('progress-bar__item--active'));
  progressBarItems[currentQuestion].classList.add('progress-bar__item--active');
  score = 5;
}

function loadInfo() {
  birdImg.setAttribute('src', currentData[currentQuestion][rightAnswer].image);
  birdName.innerText = currentData[currentQuestion][rightAnswer].name;
}

function switchLang(lang) {
  currentData = lang == 'en' ? birdsDataEn : birdsData;
  let scoreText = document.querySelector('.game__score-text');
  scoreText.innerText = lang == 'en'? langData.scoreTextEn + totalScore : langData.scoreTextRu + totalScore;
  if (currentQuestion < currentData.length-1) {
    nextBtn.innerText = lang == 'en' ? langData.nextBtnEn : langData.nextBtnRu;
  } else {
    nextBtn.innerText = lang == 'en' ? langData.resultsTitleEn : langData.resultsTitleRu;
  }

  let answersTitle = Array.from(document.querySelectorAll('.answers__title'));
  answersTitle.forEach((elem, index) => {
    elem.innerText = currentData[currentQuestion][index].name;
  })

  answersList.forEach(element => {
    element.addEventListener('click', (event) => {
      pickBirdText(event)
    });
  });
  if (hasAnswer) {
    birdName.innerText = currentData[currentQuestion][rightAnswer].name;
  }
  progressBar.style.width = '1%';
  pauseMusic();
  clearPlayer(lang);

  progressBarItems.forEach((item, index) => {
    item.innerText = lang == 'ru' ? langData.questionProgressRu[index] : langData.questionProgressEn[index]
  })
}

function clearPlayer(lang) {
  let player = document.querySelector('.player')
  let birdTitle = player.querySelector('.player__song-name');
  let birdSpecies = player.querySelector('.player__species');
  let birdDesc = player.querySelector('.player__desc');
  let birdImg = player.querySelector('.player__img');
  let birdAudio = player.querySelector('#main-audio');
  let playPauseBtn = document.querySelector('.player__play-pause');
  birdTitle.innerText = lang == 'ru' ? langData.playerSongNameRu: langData.playerSongNameEn;
  birdSpecies.innerText = '';
  birdDesc.innerText = '';
  birdImg.setAttribute('src', './assets/bird-icon.svg');
  birdAudio.setAttribute('src', '');
  pauseMusic();
}