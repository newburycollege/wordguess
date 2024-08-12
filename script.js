let secretWord = '';
let displayedWord = '';
let remainingAttempts = 6;

document.getElementById('start-game').addEventListener('click', function() {
    secretWord = document.getElementById('secret-word').value.toLowerCase();
    if (secretWord.length > 0) {
        startGame();
    }
});

function startGame() {
    displayedWord = '_'.repeat(secretWord.length);
    remainingAttempts = 6;

    document.getElementById('word-display').textContent = displayedWord;
    document.getElementById('progress-bar').style.width = '100%';
    document.getElementById('progress-bar').style.backgroundColor = 'green';
    document.getElementById('game-section').style.display = 'block';
    document.getElementById('message').textContent = '';

    createLetterButtons();
}

function createLetterButtons() {
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = '';  // Clear previous buttons

    for (let i = 97; i <= 122; i++) {
        const letterBtn = document.createElement('button');
        letterBtn.textContent = String.fromCharCode(i);
        letterBtn.classList.add('letter-btn');
        letterBtn.addEventListener('click', handleGuess);
        lettersDiv.appendChild(letterBtn);
    }
}

function handleGuess(event) {
    const guessedLetter = event.target.textContent;
    
    if (secretWord.includes(guessedLetter)) {
        updateDisplayedWord(guessedLetter);
    } else {
        remainingAttempts--;
        event.target.disabled = true; // Disable incorrect guessed letter
        updateProgressBar();
    }

    checkGameStatus();
}

function updateDisplayedWord(letter) {
    let newDisplayedWord = '';
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
            newDisplayedWord += letter;
        } else {
            newDisplayedWord += displayedWord[i];
        }
    }
    displayedWord = newDisplayedWord;
    document.getElementById('word-display').textContent = displayedWord;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = (remainingAttempts / 6) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (remainingAttempts === 5) {
        progressBar.style.backgroundColor = '#66cc00'; // Light Green
    } else if (remainingAttempts === 4) {
        progressBar.style.backgroundColor = '#ffcc00'; // Yellow
    } else if (remainingAttempts === 3) {
        progressBar.style.backgroundColor = '#ff9900'; // Orange
    } else if (remainingAttempts === 2) {
        progressBar.style.backgroundColor = '#ff6600'; // Dark Orange
    } else if (remainingAttempts === 1) {
        progressBar.style.backgroundColor = '#ff3300'; // Red Orange
    } else if (remainingAttempts === 0) {
        progressBar.style.backgroundColor = 'red'; // Red
    }
}

function checkGameStatus() {
    if (displayedWord === secretWord) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
        disableAllButtons();
    } else if (remainingAttempts === 0) {
        document.getElementById('message').textContent = `Game Over! The word was "${secretWord}".`;
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll('.letter-btn');
    buttons.forEach(button => button.disabled = true);
}
