function regresar(){
  window.location.replace("index.html");
  localStorage.removeItem("questionsBad")
  localStorage.removeItem("questionsGood")
}

function printResults() {
  let answersBad = localStorage.getItem("questionsBad");
  let answersGood = localStorage.getItem("questionsGood");

  document.getElementById("bad").textContent = answersBad;
  document.getElementById("good").textContent = answersGood;
}


printResults();