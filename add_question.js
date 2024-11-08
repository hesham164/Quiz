document.getElementById('quizForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var question = document.getElementById('question').value;
    var choice1 = document.getElementById('choice1').value;
    var choice2 = document.getElementById('choice2').value;
    var choice3 = document.getElementById('choice3').value;
    var choice4 = document.getElementById('choice4').value;
    var correctIndex = document.querySelector('input[name="correct"]:checked').value;

    saveQuestion(question, choice1, choice2, choice3, choice4, correctIndex);

    document.getElementById('quizForm').reset();
}

function saveQuestion(question, choice1, choice2, choice3, choice4, correctIndex) {
    var newQuestionRef = window.push(window.ref(window.db, 'questions'));
    window.set(newQuestionRef, {
        question: question,
        choices: [choice1, choice2, choice3, choice4],
        correct: correctIndex
    });
}
