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
    document.getElementById('attempts').textContent = remainingAttempts;
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
    event.target.disabled = true;
    
    if (secretWord.includes(guessedLetter)) {
        updateDisplayedWord(guessedLetter);
    } else {
        remainingAttempts--;
        document.getElementById('attempts').textContent = remainingAttempts;
        moveRocketDown();
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

function moveRocketDown() {
    const rocketImg = document.getElementById('rocket-img');
    const topPosition = parseInt(window.getComputedStyle(rocketImg).top || 0);
    rocketImg.style.top = `${topPosition + 20}px`;
}

function checkGameStatus() {
    if (displayedWord === secretWord) {
        document.getElementById('message').textContent = 'Congratulations! You saved the rocket!';
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
