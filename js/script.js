window.onload = function() {

    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea = document.getElementsByClassName('answers')[0],
        checker = document.getElementsByClassName('checker')[0],
        current = 0,

        // An object that holds all the questions + possible answers.
        // In the array --> last digit gives the right answer position
        allQuestions = {
            "I'm gonna make him an offer he can't refuse.": ["The God Father", "Star Wars", "Jerry MaGuire", "Dirty Harry", "The Shining", 0],

            "May the Force be with you.": ["Gone With the Wind", "Taxi Driver", "Love Story", "Star Wars", "White Heat", 3],

            "Show me the money!": ["Coming to America", "Jerry MaGuire", "Lion King", "Lottery Ticket", "Jailbait", 1],

            "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?": ["Dirty Harry", "Harry Potter", "Aladdin", "Casablanca", "Forest Gump", 0],

            "Here's Johnny!": ["Grand Hotel", "Hardball", "Jack and Jill", "The Shining", "Jack Reacher", 3]
        };

    function loadQuestion(curr) {
        // This function loads all the question into the questionArea
        // It grabs the current question based on the 'current'-variable

        var question = Object.keys(allQuestions)[curr];

        questionArea.innerHTML = '';
        questionArea.innerHTML = question;
    }

    function loadAnswers(curr) {
        // This function loads all the possible answers of the given question
        // It grabs the needed answer-array with the help of the current-variable
        // Every answer is added with an 'onclick'-function

        var answers = allQuestions[Object.keys(allQuestions)[curr]];

        answerArea.innerHTML = '';

        for (var i = 0; i < answers.length - 1; i += 1) {
            var createDiv = document.createElement('div'),
                text = document.createTextNode(answers[i]);

            createDiv.appendChild(text);
            createDiv.addEventListener("click", checkAnswer(i, answers));


            answerArea.appendChild(createDiv);
        }
    }

    function checkAnswer(i, arr) {
        // This is the function that will run, when clicked on one of the answers
        // Check if givenAnswer is sams as the correct one
        // After this, check if it's the last question:
        // If it is: empty the answerArea and let them know it's done.

        return function() {
            var givenAnswer = i,
                correctAnswer = arr[arr.length - 1];

            if (givenAnswer === correctAnswer) {
                addChecker(true);
            } else {
                addChecker(false);
            }

            if (current < Object.keys(allQuestions).length - 1) {
                current += 1;

                loadQuestion(current);
                loadAnswers(current);
            } else {
                questionArea.innerHTML = 'Done';
                answerArea.innerHTML = '';
            }

        };
    }

    function addChecker(bool) {
        // This function adds a div element to the page
        // Used to see if it was correct or false

        var createDiv = document.createElement('div'),
            txt = document.createTextNode(current + 1);

        createDiv.appendChild(txt);

        if (bool) {

            createDiv.className += 'correct';
            checker.appendChild(createDiv);
        } else {
            createDiv.className += 'false';
            checker.appendChild(createDiv);
        }
    }


    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);

};
