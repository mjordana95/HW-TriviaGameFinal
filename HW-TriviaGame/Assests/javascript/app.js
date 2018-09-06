$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})


$(document).on('click', '#reset', function () {
    game.reset();
})

var questions = [{
    question: "In the TV show Martin, what was Tommy's job?",
    answers: ["Tommy ain't got no job!", "Managing the club", "Counselor at Boys & Girls Club", "Businessman"],
    correctAnswer: "Counselor at Boys & Girls Club",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2iAQ8OjP4cT9j1sRwK6Hex41AyTiwmNgPLskYassol2mWD4fKTw",
}, {
    question: "What college was the TV show A Different World based around?",
    answers: ["Hampton", "Hillman", "Howard", "Temple"],
    correctAnswer: "Hillman",
    image: "https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/hwn4d-08N4HQ9HPB6-Full-Image_GalleryBackground-en-US-1501682585524._RI_SX940_.jpg",
}, {
    question: "Who invented peanut butter?",
    answers: ["Skippy", "George Washington", "George Washington Carver", "Peter Pan"],
    correctAnswer: "George Washington Carver",
    image: "https://dhp.org/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/b/c/bc633_2.jpg",
}, {
    question: "Who invented the stop light?",
    answers: ["Garrett Morgan", "Frederick Douglass", "Eli Whitney", "Nikola Tesla"],
    correctAnswer: "Garrett Morgan",
    image: "http://en.lisapoyakama.org/wp-content/uploads/sites/2/2018/01/Garrett-Morgan.jpg",
}, {
    question: "Who has the most grammys?",
    answers: ["Drake", "Michael Jackson", "Quincy Jones", "Jay Z", "Kanye West", "Beyonce"],
    correctAnswer: "Quincy Jones",
    image: "http://musicbiz101wp.com/wp-content/uploads/2014/10/Quincy-Jones.jpg",
}, {
    question: "The Harlem Renaissance, also known as the New Negro Movement took place when?",
    answers: ["1920's", "1930's", "1940's", "1980's", "1990's"],
    correctAnswer: "1920's",
    image: "https://learnodo-newtonic.com/wp-content/uploads/2016/01/Harlem-Renaissance-Famous-People-Featured.jpg",
}, {
    question: "Soul Train was created and hosted by?",
    answers: ["Donnie Simpson", "Shemar Moore", "Downtown Julie Brown", "Don Cornelius"],
    correctAnswer: "Don Cornelius",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSneb5KvSa93SXiADJDVZkUwCbmDYNhq_jBEM1EQyIQ9GiRkKvE",
}, {
    question: "Madam C.J. Walker was an entrtpreneur, philanthropist and social activist and the first female self made ____ in America?",
    answers: ["Millionaire", "Mogul", "Educator", "Author"],
    correctAnswer: "Millionaire",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKTSS5v-GLzCFu0qpl6sUoL6o5jL23PPGLJfF2QL7ulqvSo4H",
}, {
    question: "The first capital of the United States was in what city and state?",
    answers: ["New York, NY", "Philadelphia, PA", "Jamestown, VA", "Washington, D.C."],
    correctAnswer: "New York, NY",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYDHWB8BPp5nUYQiXFuBXWEPB15QUHJPkJ8nDjaAtmt9u2x9lk",
}, {
    question: "The first pizzeria in the United States opened in 1895 in what city?",
    answers: ["Boston", "Philadelphia", "New York City", "Chicago"],
    correctAnswer: "New York City",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEVs5ctuVAbSit8dg9BRP_CmOg4ylpy8hhZv8A_VpFFa2ae7H-",
}];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    //savedAnswered=0,
    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2 TIME REMAINING <span id='counter'>30</span> Seconds</h2>");
        console.log(questions[game.currentQuestion])

        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question,
            +'</h2>');

        for (var i = 0; i < questions[game.currentQuestion].answers.length;
            i++) {

            $('#subwrapper').append('<button class="answer-button" id="button-' + i + '" data-name = "' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
        }
        $('.answer-button').on('click', function (e) {
            console.log($(this).attr("data-name"));
            alert($(this).attr("data-name"))
            clearInterval(timer);
            if ($(this).attr("data-name") == questions[game.currentQuestion].
                correctAnswer) {
                game.answeredCorrectly();
            } else {
                game.answeredIncorrectly();
            }
        })

    },


    nextQuestion: function () {
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.
            currentQuestion].correctAnswer + '</h3>')
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);//
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $('#subwrapper').html("<h2>ALL DONE!</h2>");
        $('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
        $('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $('#subwrapper').append("<button id='reset'>RESET</button>");
    },
    // clicked: function(e){
    //     console.log($(e.target))
    //     alert($(e.target).attr("data-name"))
    //     clearInterval(timer);
    //     if($(e.target).attr("data-name") == questions[game.currentQuestion].
    //         correctAnswer){
    //         game.answeredCorrectly();
    //     } else {
    //         game.answeredIncorrectly();
    //     } 
    // },
    answeredCorrectly: function () {
        console.log("YOU GOT IT!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("WRONG!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.
            currentQuestion].correctAnswer + '</h3>')
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}

//alert("Well done, you got " + game.correct + " out of 10");