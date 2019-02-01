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
        question: "Ciencia: ¿Cuál es el tercer planeta más grande del sistema solar?",
        answer: 'Urano',
        choices: ['Neptuno', 'Saturno', 'Urano', 'Marte'],
      },
      q2: {
        question: "Historia: ¿Quién era conocido como el Gran Emancipador?",
        answer: 'Abraham Lincoln',
        choices: ['William Taft', 'James Garfield', 'George Washington', 'Abraham Lincoln'],
      },
      q3: {
         question: "Deporte: ¿Qué equipo perdió la Super Bowl XL?",
        answer: 'Seattle Seahawks',
        choices: ['Seattle Seahawks', 'New England Patriots', 'Pittsburgh Steelers', 'Arizona Cardinals'],
      },
      q4: {
         question: "Matemáticas: Un triángulo tiene un ángulo recto y otro de 45 grados. ¿Cuántos grados tiene el ángulo restante?",
        answer: '45',
        choices: ['30', '45', '60', '90'],
      },
      q5: {
          question: "Historia: ¿Qué presidente NO está representado en el Monte Rushmore?",
        answer: 'Benjamin Franklin',
        choices: ['George Washington', 'Benjamin Franklin', 'Theodore Roosevelt', 'Thomas Jefferson'],
      },
      q6: {
        question: "Deporte: ¿Cuál es el deporte nacional de Inglaterra?",
        answer: 'Críquet',
        choices: ['Tenis', 'Fútbol', 'Rugby', 'Críquet'],
      },

    };
  }


  // Timer
  var questionTimer = {

    time: 20,
    reset: function(t) {
      questionTimer.time = t;
      $('.timeLeft').html('Tiempo restante: ' + questionTimer.time);
    },
    gameTimeout: function(){
      timeout = setTimeout(questionTimer.timeUp, 1000*16);
    },
    count: function() {
      $('.timeLeft').html('Tiempo restante: ' +questionTimer.time);
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
      $('.answers').html('<h2>¡Incorrecto! La respuesta es ' + activeQuestion.answer + ' .</h2>');
      setTimeout(game, 5000);
    },
  };


  function gameOver() {
    if (Object.keys(questions).length === 0) {
      questionTimer.stopTimer();
      $('.game').hide();
      $('.results').show();
      $('.correct').html('Respuestas correctas: ' + correct);
      $('.wrong').html('Respuestas incorrectas: ' + wrong);
      activeQuestion = false;
    };
  };

  function answerCheck() {
    if (answer == activeQuestion.answer && questionTimer.time > 0) {
      correct++;
      questionTimer.reset(3);
      $('.answers').html('<h2>¡Correcto! La respuesta es ' + activeQuestion.answer + ' .</h2>');
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
