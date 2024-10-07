let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimer, 10);
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  startTime = 0;
  display.textContent = '00:00:00';
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapList.innerHTML = '';
}

function updateTimer() {
  let currentTime = Date.now() - startTime;
  let minutes = Math.floor((currentTime / 1000 / 60) % 60);
  let seconds = Math.floor((currentTime / 1000) % 60);
  let milliseconds = Math.floor(currentTime % 1000);

  // Format the time as "00:00:00"
  display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function recordLap() {
  if (isRunning) {
    let lapTime = display.textContent;
    const listItem = document.createElement('li');
    listItem.textContent = lapTime;
    lapList.appendChild(listItem);
  }
}

function pad(num) {
  return ('0' + num).slice(-2);
}