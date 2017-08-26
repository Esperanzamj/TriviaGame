$(document).ready(function() {


  $('.game').hide();
  $('.results').hide();

  
  var correct;
  var wrong;
  var answer;
  var counter;
  var count;
  var timeout;
  var i = 0;
  var activeQuestion = {
    question: "",
    answer: '',
    choices: [],
  }

  var questions = {};

  function setQuestions() {
    questions = {
      q1: {
        question: "Science: What is the third largest planet in the solar system?",
        answer: 'Uranus',
        choices: ['Neptune', 'Saturn', 'Uranus', 'Mars'],
      },
      q2: {
        question: "History: Who was known as the Great Emancipator?",
        answer: 'Abraham Lincoln',
        choices: ['William Taft', 'James Garfield', 'George Washington', 'Abraham Lincoln'],
      },
      q3: {
         question: "Sports: Who lost Super Bowl XL?",
        answer: 'Seattle Seahawks',
        choices: ['Seattle Seahawks', 'New England Patriots', 'Pittsburgh Steelers', 'Arizona Cardinals'],
      },
      q4: {
         question: "Math: A Triangle has one right angle and a 45 degree angle. What is the degree of the remaining angle?",
        answer: '45',
        choices: ['30', '45', '60', '90'],
      },
      q5: {
          question: "History: Who is NOT on Mount Rushmore?",
        answer: 'Benjamin Franklin',
        choices: ['George Washington', 'Benjamin Franklin', 'Theodore Roosevelt', 'Thomas Jefferson'],
      },
      q6: {
        question: "Sports: What is England's National Sport?",
        answer: 'Cricket',
        choices: ['Tennis', 'Soccer', 'Rugby', 'Cricket'],
      },

    };
  }


  // Timer
  var questionTimer = {

    time: 20,
    reset: function(t) {
      questionTimer.time = t;
      $('.timeLeft').html('Time Left: ' + questionTimer.time);
    },
    gameTimeout: function(){
      timeout = setTimeout(questionTimer.timeUp, 1000*16);
    },
    count: function() {
      $('.timeLeft').html('Time Left: ' +questionTimer.time);
      questionTimer.time--;
    },
    countDown: function(){
      counter = setInterval(questionTimer.count,1000);
    },
    stopTimer: function(){
      clearInterval(counter);
    },
    timeUp: function(){
      wrong++;
      questionTimer.reset(5)
      $('.answers').html('<h2>Incorrect! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);
    },
  };


  function gameOver() {
    if (Object.keys(questions).length === 0) {
      questionTimer.stopTimer();
      $('.game').hide();
      $('.results').show();
      $('.correct').html('Number Correct: ' + correct);
      $('.wrong').html('Number Incorrect: ' + wrong);
      activeQuestion = false;
    };
  };

  function answerCheck() {
    if (answer == activeQuestion.answer && questionTimer.time > 0) {
      correct++;
      questionTimer.reset(3);
      $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);   
    }
      
    if (answer != activeQuestion.answer){
      questionTimer.timeUp();
    }
  }


  function randomQuestions() {
    activeQuestion.choices.sort(function() { 
      return 0.5 - Math.random(); 
    });
  };


  function game(){


    gameOver();




    if (Object.keys(questions).length > 0) {


      var keys = Object.keys(questions);
      var objIndex = keys[ keys.length * Math.random() << 0];
      activeQuestion = questions[objIndex];


      randomQuestions();


      delete questions[objIndex];


      $('.answers').empty();

      questionTimer.stopTimer();
      questionTimer.reset(15);
      questionTimer.gameTimeout()


      questionTimer.countDown();


      $('.question').html(activeQuestion.question);
           i=0;


      $(activeQuestion.choices).each(function() {
      $('.answers').append('<button class="btn btn-lg option text-center">'  + activeQuestion.choices[i] + '</button>');
      i++;

      });
    }; 


    $('.option').on('click', function(){
        answer = $(this).html();
        answerCheck();
        clearTimeout(timeout);
      });
  };

  function newGame() {
    $('.results').hide();

    correct = 0;
    wrong = 0;
    $('.game').show();
  }

 
  $('.home').on('click','.start',function(){
    setQuestions();
    newGame();
    
    game();
  });
    

});










