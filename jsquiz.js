var mail1 =username1();
var name1=username();
var dt = new Date();
var time1 = dt.toUTCString();
var cc ='praveen.nr@brickworkindia.com;vivekv465@gmail.com';
var timeInSecs;
var ticker;
var s = "";
var dhours;  // displayed
var dmins;
var dsecs;

function startTimer(secs){
timeInSecs = parseInt(secs);
ticker = setInterval("tick()",1000); 
tick(); // to start counter display right away
}

function tick() {
var secs = timeInSecs;
if (secs>0) {
timeInSecs--;
}
else {
clearInterval(ticker); // stop counting at zero
document.getElementById("countdown").innerHTML = "TIME EXPIRED";
 
document.myform.submit();
return false;
}

var hours= Math.floor(secs/3600);
secs %= 3600;
var mins = Math.floor(secs/60);
secs %= 60;

if (hours<10) {dhours = "0" + hours + ":"}
else {dhours = hours +":"}
if (dhours == "00:") {dhours = ""}
if ((mins<10) && (dhours !="")) {dmins = "0" + mins + ":"}
else {dmins = mins+ ":"}
if ((dhours == "") && (dmins == "00:")) {mins = ""}
if ((dhours == "") && (dmins == "")) {s = " seconds"}
if ((secs<10) && (dmins !="")) {dsecs = "0" + secs}
else {dsecs = secs}

var result =  dhours + dmins + dsecs + s;

document.getElementById("countdown").innerHTML = result;

}


var answer = 0;
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

(function() {
  var questions = [{
    question: "What is 2*5?",
    choices: ([2, 5, 10, 15, 20]),
    correctAnswer: 2
  }, {
    question: "What is 3*6?",
    choices: ([3, 6, 9, 12, 18]),
    correctAnswer: 4
  }, {
    question: "What is 8*9?",
    choices: ([72, 99, 108, 134]),
    correctAnswer: 0
  }, {
    question: "What is 1*7?",
    choices: ([4, 5, 6, 7, 8]),
    correctAnswer: 3
  }, {
    question: "What is 8*8?",
    choices: ([20, 30, 40, 50, 64]),
    correctAnswer: 4
  }];
  questions = shuffle(questions);

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
 
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    $('#user').hide();
	$('#name').hide();
	$('#score').hide();
	$('#123').hide();
	$('#124').hide();
	$('#125').hide();
	$('#126').hide();
	$('#mail').hide();
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
	numCorrect = 0;
	document.getElementById('demo').innerHTML = numCorrect;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();

  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
		document.myform.submit();
		SendMail('vivekv465@gmail.com', '', '', 'test result', 'vivek is cool')
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
	answer++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
	$('#user').show();
	$('#name').show();
	$('#score').show();
	$('#123').show();
	$('#124').show();
	$('#125').show();
	$('#126').show();
	$('#mail').show();
document.getElementById('score').value = numCorrect;



    return score;
  }
})();