document.addEventListener('DOMContentLoaded', function() {
    var questions = [];
    var currentQuestionIndex = 0;
    var correctCount = 0;
    var incorrectCount = 0;

    window.onValue(window.ref(window.db, 'questions'), (snapshot) => {
        questions = [];
        snapshot.forEach(function(childSnapshot) {
            questions.push(childSnapshot.val());
        });
        displayQuestion();
    });

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            var question = questions[currentQuestionIndex];
            document.getElementById('flashcard-question').innerText = question.question;
            var choicesList = document.getElementById('flashcard-choices');
            choicesList.innerHTML = "";

            var shuffledChoices = shuffleArrayWithCorrectIndex(question.choices, question.correct);

            shuffledChoices.forEach(function(choice, index) {
                var button = document.createElement('button');
                button.innerText = choice.text;
                button.classList.add('choice-btn');
                button.addEventListener('click', function() {
                    if (choice.isCorrect) {
                        button.style.backgroundColor = '#4CAF50'; // Green for correct
                        correctCount++;
                        updateCounters();
                    } else {
                        button.style.backgroundColor = '#f44336'; // Red for incorrect
                        highlightCorrectChoice(shuffledChoices);
                        incorrectCount++;
                        updateCounters();
                    }
                    disableAllButtons();
                });
                choicesList.appendChild(button);
            });
        } else {
            displayScoreboard();
        }
    }

    function highlightCorrectChoice(shuffledChoices) {
        const buttons = document.querySelectorAll('.choice-btn');
        shuffledChoices.forEach((choice, index) => {
            if (choice.isCorrect) {
                buttons[index].style.backgroundColor = '#4CAF50'; // Green for correct
            }
        });
    }

    function disableAllButtons() {
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function shuffleArrayWithCorrectIndex(array, correctIndex) {
        var arrayWithIndex = array.map((choice, index) => {
            return { text: choice, isCorrect: index == correctIndex };
        });

        for (let i = arrayWithIndex.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayWithIndex[i], arrayWithIndex[j]] = [arrayWithIndex[j], arrayWithIndex[i]];
        }

        return arrayWithIndex;
    }

    function updateCounters() {
        document.getElementById('correct-count').innerText = correctCount;
        document.getElementById('incorrect-count').innerText = incorrectCount;
    }

    function displayScoreboard() {
        document.getElementById('flashcard').classList.add('hidden');
        document.getElementById('scoreboard').classList.remove('hidden');
        document.getElementById('final-correct-count').innerText = correctCount;
        document.getElementById('final-incorrect-count').innerText = incorrectCount;
    }

    document.getElementById('next-btn').addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            displayScoreboard();
        } else {
            displayQuestion();
        }
    });

    document.getElementById('restart-btn').addEventListener('click', function() {
        correctCount = 0;
        incorrectCount = 0;
        updateCounters();
        document.getElementById('flashcard').classList.remove('hidden');
        document.getElementById('scoreboard').classList.add('hidden');
        currentQuestionIndex = 0;
        displayQuestion();
    });
});
