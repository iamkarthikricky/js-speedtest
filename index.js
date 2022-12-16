let speedTypingTestEl = document.getElementById("speedTypingTest");

let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");

let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");

let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");

let spinnerEl = document.getElementById("spinner");

let counter = 0;
let counterTimer = function() {
    counter = counter + 1;
    timerEl.classList.add("timer_bold");
    timerEl.textContent = counter + " seconds";
}


let intervalId
function timerStart() {
    intervalId = setInterval(counterTimer, 1000);
}

timerStart();

function randomQuote() {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET",
    }
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                content
            } = jsonData
            spinnerEl.classList.add("d-none");
            quoteDisplayEl.classList.add("quote");
            quoteDisplayEl.textContent = content;
        });
}

randomQuote();

function submit() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        resultEl.textContent = "You typed in " + timerEl.textContent;
        clearInterval(intervalId);
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}

submitBtnEl.addEventListener("click", submit)

resetBtnEl.onclick = function() {
    resetBtnEl.addEventListener("click", randomQuote);
    clearInterval(intervalId);
    timerStart();
    counter=0;
    quoteInputEl.value = "";
    resultEl.value="";
}