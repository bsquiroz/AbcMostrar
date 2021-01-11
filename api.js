let a = 0;
let auxtotalQuestions = 0;
let auxtype = 0;
let auxQuestionsCorr = [];


function getCategories() {
  const url = "https://opentdb.com/api_category.php";
  fetch(url)
    .then((response) => response.json())
    .then((data) => printCategories(data.trivia_categories));
}

function getQuestions() {
  const totalQuestions = document.getElementById("total-questions").value;
  const category = document.getElementById("select-category").value;
  const type = document.getElementById("type-questions").value;
  const difficulty = document.getElementById("questions-difficulty").value;

  auxtotalQuestions=totalQuestions;
  auxtype=type;

  fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
    
    .then((response) => response.json())
    .then((data) => printData(data));
}

function answers(correct, incorret1, incorret2, incorret3) {
  let array = [correct, incorret1, incorret2, incorret3];
  array.sort(function () {
    return Math.random() - 0.5;
  });
  return array;
}

function printCategories(categories) {
  const categoriesContainer = document.getElementById("select-category");
  categories.forEach((category) => {
    categoriesContainer.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}

function printData(data) {
  let container = document.getElementById("questions-container");

  if (auxtype == "multiple") {
    data.results.forEach((element) => {
      let aux = answers(element.correct_answer,element.incorrect_answers[0],element.incorrect_answers[1],element.incorrect_answers[2]);
      auxQuestionsCorr.push(element.correct_answer);
      let b = 1;
      container.innerHTML += `<div class="col-md-6 mt-3">
                                <div class="card h-100 b-round">
                                    <div class="card-body">
                                        ${(a+1)+". "+element.question}
                                    </div>
                                    <div class="card-body">

                                      <input type="radio" id="${b++}questions${a}" name="questions${a}" value="${aux[0]}" requerid>      
                                      <label for="questions1">${aux[0]}</label><br>
                                                                            
                                      <input type="radio" id="${b++}questions${a}" name="questions${a}" value="${aux[1]}" required>   
                                      <label for="questions2">${aux[1]}</label><br>
                                                                           
                                      <input type="radio" id="${b++}questions${a}" name="questions${a}" value="${aux[2]}" required>    
                                      <label for="questions3">${aux[2]}</label><br>
                                                                    
                                      <input type="radio" id="${b++}questions${a}" name="questions${a}" value="${aux[3]}" required>   
                                      <label for="questions4">${aux[3]}</label>
                                          
                                    </div>
                                </div>
                            </div>`;
      a++;
    });
    container.innerHTML += `<button  type="submit" class="btn btn-primary col-md-12 ">send questions</button>`;
        
  } else {
    data.results.forEach((element) => {
      let aux = answers(element.correct_answer,element.incorrect_answers[0]);
      
      auxQuestionsCorr.push(element.correct_answer);
      let b = 1;
      
      container.innerHTML += `<div class="col-md-6 mt-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                          ${element.question}
                                        </div>
                                        <div class="card-body" id="ejemplo">

                                          <input type="radio" id="${b++}questions${a}" name="questions${a}" value="${aux[0]}" requerid>
                                          <label for="questions1">${aux[0]}</label><br>
                                            
                                          <input type="radio" id="${b++}questions${a}" name="questions${a}" value="${aux[1]}" required>
                                          <label for="questions2">${aux[1]}</label><br>
                                                                      
                                        </div>
                                    </div>
                                </div>`;
      a++;
    });
    container.innerHTML += `<button type="submit" class="btn btn-primary col-md-12")>send questions</button>`;

  }
}

function checkingQuestions() {
  let bad = 0;
  let good = 0;
  let auxRecoveringQuestions = recoveringQuestions();

    for (let i = 0; i < auxRecoveringQuestions.length; i++) {
      if (auxRecoveringQuestions[i] == auxQuestionsCorr[i]) {
        good++;
      } else {
        bad++;
      }
    }

    localStorage.setItem("questionsBad",bad)
    localStorage.setItem("questionsGood",good)

    window.location.replace("results.html");
}

function recoveringQuestions() {
  let arrayQuestions = [];

  if (auxtype == "multiple") {
    arrayQuestions = [];
    for (let i = 0; i < auxtotalQuestions; i++) {
      for (let x = 1; x <= 4; x++) {
        if (document.getElementById([x] + "questions" + [i]).checked == true) {
          let all = document.getElementById([x] + "questions" + [i]).value;
          arrayQuestions.push(all);
        }
      }
    }
  } else {
    for (let i = 0; i < auxtotalQuestions; i++) {
      for (let x = 1; x <= 2; x++) {
        if (document.getElementById([x] + "questions" + [i]).checked == true) {
          let all = document.getElementById([x] + "questions" + [i]).value;
          arrayQuestions.push(all);
        }
      }
    }
  }

  return arrayQuestions;
}


getCategories();

