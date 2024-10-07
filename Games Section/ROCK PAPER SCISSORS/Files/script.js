let userScore = 0;

// all doc
const choices = document.querySelectorAll('.choice');
const resultDisplay = document.getElementById('result-display');
const gameChoices = document.getElementById('game-choices');
const yourChoiceElem = document.getElementById('your-choice');
const houseChoiceElem = document.getElementById('house-choice');
const resultText = document.getElementById('result-text');
const scoreElem = document.getElementById('score');
const playAgainBtn = document.getElementById('play-again');
const resetScoreBtn = document.getElementById('reset-score');

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('data-choice');
        const houseChoice = getHouseChoice();
        const result = determineWinner(userChoice, houseChoice);  // el-if winner function
        updateUI(userChoice, houseChoice, result);    // to change our ui and let game resylt page ui appear
    });
});

// playagain button script
playAgainBtn.addEventListener('click', () => {
    resultDisplay.classList.add('hidden');
    gameChoices.classList.remove('hidden');
});

// resetbutton script
resetScoreBtn.addEventListener('click', () => {
    userScore = 0;
    updateScore();
});

// AI MOVE ALGO
function getHouseChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

// WINNER DETERMINATION BY else-if
function determineWinner(userChoice, houseChoice) {
    if (userChoice === houseChoice) {
        return 'draw';
    } else if (
        (userChoice === 'rock' && houseChoice === 'scissors') ||
        (userChoice === 'paper' && houseChoice === 'rock') ||
        (userChoice === 'scissors' && houseChoice === 'paper')
    ) {
        userScore++;
        updateScore();
        return 'win';
    } else {
        return 'lose';
    }
}

// img , class add-remove on ui interface
function updateUI(userChoice, houseChoice, result) {
    yourChoiceElem.querySelector('img').src = `${userChoice}.png`;
    houseChoiceElem.querySelector('img').src = `${houseChoice}.png`;

    resultText.textContent = result.toUpperCase();

    gameChoices.classList.add('hidden');
    resultDisplay.classList.remove('hidden');
}

// new score updation
function updateScore() {
    scoreElem.textContent = userScore;
}
