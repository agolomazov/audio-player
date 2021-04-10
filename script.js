// UI элементы
const musicContaner = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");


// Названия песен
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of songs
let songIndex = 2;

// Загрузить песню после загрузки страницы
loadSong(songs[songIndex]);

// Обновить UI после загрузки песни
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Запустить песню
function playSong() {
  musicContaner.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.play();
}

// Поставить песню на паузу
function pauseSong() {
  musicContaner.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.pause();
}

// Запустить предыдущую песню
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Запустить следующую песню
function nextSong() {
  songIndex++;

  if (songIndex === songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Перерисовать прогресс-бар
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent.toFixed(0)}%`;
}

// Перемотать песню
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Обработчик для управления плеером с клавиатуры
function keyPressHandler(event) {
  const { keyCode } = event;

  switch (keyCode) {
    case 32:
      togglePlaySong();
      break;
    case 37:
      prevSong();
      break;
    case 39:
      nextSong();
      break;
    default:
      break;
  }
}

function togglePlaySong() {
  const isPlaying = musicContaner.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// Event listeners
playBtn.addEventListener('click', () => {
  togglePlaySong();
});

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgress);

window.addEventListener('keydown', keyPressHandler);
