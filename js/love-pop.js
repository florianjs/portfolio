const loveBox = document.getElementById("love-box");
const noThanks = document.getElementById("no-thanks");
const loveBtn = document.getElementById("love");
const loveCounter = document.getElementById("love-counter");

const firesbase = "https://love-send-js.firebaseio.com/onlinecounter.json";

let counter;

function appear() {
  loveBox.style.visibility = "visible";
  loveBox.style.animation = "1s fadeIn";
}

function disapear() {
  loveBox.style.transition = "visibility 0s ease 2s, opacity 2s";

  loveBox.style.opacity = "0";

  loveBox.style.visibility = "hidden";
}

function get() {
  axios
    .get(firesbase)
    .then((response) => {
      counter = response.data.counter;
      updateCounter();
    })
    .catch((err) => console.log(err));
}

function updateCounter() {
  loveCounter.innerHTML = `${counter} visitors ❤️ this website`;
}

loveBtn.addEventListener("click", () => {
  loveBtn.disabled = true;
  axios
    .put(firesbase, {
      counter: counter + 1
    })
    .then(() => {
      get();
    })
    .catch((error) => console.log(error));

  loveBtn.innerHTML = "Thank you!";
  disapear();
});

noThanks.addEventListener("click", () => {
  disapear();
});

get();

setTimeout(() => {
  appear();
}, 3000);
