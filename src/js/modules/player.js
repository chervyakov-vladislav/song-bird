import birdsData from "./birds-data";
import birdsDataEn from "./birds-data-en";
import {langData} from './lang-data'

let gallary = document.querySelector('.gallary');
let game = document.querySelector('.game')
let player = document.querySelector('.player')
let birdTitle = document.querySelector('.player__song-name');
let birdSpecies = document.querySelector('.player__species');
let birdDesc = document.querySelector('.player__desc');
let birdImg = document.querySelector('.player__img');
let birdAudio = document.querySelector('#main-audio');
let playPauseBtn = document.querySelector('.player__play-pause');
let progressBar = document.querySelector('.progress-area__bar');
let volume = document.querySelector('.player__volume');
let storageLang = localStorage.getItem('lang');
let langBtn = document.querySelector('.lang-btn');

let currentLang = storageLang == 'ru' ? true : false;
let totalCurrentData = currentLang ? birdsData.flat() : birdsDataEn.flat();
let currentData = currentLang ? birdsData : birdsDataEn

let layoutList;

if (gallary) {

  if (storageLang != 'ru') {
    birdTitle.innerText = langData.playerSongNameEn;
  }

  langBtn.addEventListener('click', () => {
    if (langBtn.innerText == 'ru') {
      currentData = birdsData;
      createBirdsList(birdsData.flat());
      clearPlayer('ru');
    } else if (langBtn.innerText == 'en'){
      createBirdsList(birdsDataEn.flat());
      clearPlayer('en');
      currentData = birdsDataEn;
    }
  });

  birdAudio.volume = 0.4;
  createBirdsList(totalCurrentData);
  playPauseBtn.addEventListener('click', () => {
    let isPause = player.classList.contains('paused');
    isPause ? playMusic() : pauseMusic();
  })

  birdAudio.addEventListener('timeupdate', event => {
    let currentTime = event.target.currentTime;
    let duration = event.target.duration;
    let progress = (currentTime/duration) * 100;
    progressBar.style.width = `${progress}%`;
    if (progress == 100) {
      pauseMusic();
    }
    updateTime(currentTime);
  })
  
  volume.addEventListener('change', () => {
    let volumeValue = Number(volume.value)
    birdAudio.volume = (volumeValue/100);
  })
}

if (game) {
  birdAudio.volume = 0.4;
  playPauseBtn.addEventListener('click', () => {
    let isPause = player.classList.contains('paused');
    isPause ? playMusic() : pauseMusic();
  })
  layoutList = Array.from(document.querySelectorAll('.answers__item'));
  layoutList.forEach(item => item.addEventListener('click', pickBirdText));

  birdAudio.addEventListener('timeupdate', event => {
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
      birdAudio.volume = (volumeValue/100);
    })
  })
}

function createBirdsList(data) {
  const birdsList = gallary.querySelector('.birds-lib');
  birdsList.innerHTML = '';
  data.forEach(element => {  
    let newElem = document.createElement('li');
    newElem.classList.add('birds-lib__item')
    newElem.innerText = element.name
    newElem.addEventListener('click', event => {
      pickBird(event.target.innerText);
    })
    birdsList.append(newElem);
  });
}

function loadMusic(i, j) {
  birdTitle.innerText = currentData[i][j].name;
  birdSpecies.innerText = currentData[i][j].species;
  birdDesc.innerText = currentData[i][j].description;
  birdImg.setAttribute('src', currentData[i][j].image);
  birdAudio.setAttribute('src', currentData[i][j].audio);
  pauseMusic()
}

import {pauseMusic as pauseQuestion} from "./game.js"
function playMusic() {
  player.classList.remove('paused');
  playPauseBtn.setAttribute('src', './assets/pause-icon.svg');
  birdAudio.play();
  if (game) {
    pauseQuestion();
  }
}

function pauseMusic() {
  player.classList.add('paused');
  playPauseBtn.setAttribute('src', './assets/play-icon.svg');
  birdAudio.pause();
}

function pickBird(name) {
  let searchElem = name;
  for (let i=0; i<currentData.length; i++) {
    for (let j=0; j<currentData[i].length; j++) {
      if (currentData[i][j].name == searchElem) {
        loadMusic(i, j);
      }
    }
  }
}

function updateTime(currentTime) {
    
  birdAudio.addEventListener('loadeddata', () => {
    let totalTime = document.querySelector('.progress-area__tital-time');
    let audioDuration = birdAudio.duration;
    let totalMin = Math.floor(audioDuration/60);
    let totalSec = Math.floor(audioDuration%60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    totalTime.innerText = `${totalMin}:${totalSec}`

  })
  let currentTimeText = document.querySelector('.progress-area__current-time');
  let totalMin = Math.floor(currentTime/60);
  let totalSec = Math.floor(currentTime%60);

  if (totalSec < 10) {
    totalSec = `0${totalSec}`
  }
  currentTimeText.innerText = `${totalMin}:${totalSec}`
  
}

function pickBirdText(event) {
  let text = event.target.closest('.answers__item').innerText;
  if (/[а-яА-ЯЁё]/.test(text)) {
    currentData = birdsData;
  } else {
    currentData = birdsDataEn;
  }
  pickBird(event.target.closest('.answers__item').innerText);
  
}

export {pickBirdText};


function clearPlayer(lang) {
  birdTitle.innerText = lang == 'ru' ? langData.playerSongNameRu: langData.playerSongNameEn;
  birdSpecies.innerText = '';
  birdDesc.innerText = '';
  birdImg.setAttribute('src', './assets/bird-icon.svg');
  birdAudio.setAttribute('src', '');
  pauseMusic();
}
