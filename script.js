let slides = document.querySelectorAll(".slide-single"),
  slider = [];

const nextBtn = document.querySelector(".next"),
  prevBtn = document.querySelector(".prev");

let offset = 1,
  offset2 = -1;

let isAnimating = false;

for (let i = 0; i < slides.length; i++) {
  slider[i] = slides[i].src;
  slides[i].remove();
}

let step = 0,
  prevStep = slider.length - 1,
  nextStep = step + 1;

function init() {
  let img = document.createElement("img");
  img.src = slider[step];
  img.classList.add("slide-single");
  document.querySelector(".slider").prepend(img);
  offset = 1;
}

function draw() {
  let imgPrev = document.createElement("img"),
    imgNext = document.createElement("img");

  imgPrev.src = slider[prevStep];
  imgNext.src = slider[nextStep];
  imgPrev.classList.add("slide-single");
  imgNext.classList.add("slide-single");
  imgPrev.style.left = -offset * 650 + "px";
  imgNext.style.left = offset * 650 + "px";
  document.querySelector(".slider").prepend(imgPrev);
  document.querySelector(".slider").append(imgNext);
}

function next() {
  if (isAnimating) {
    return;
  }
  isAnimating = true;

  let slides2 = document.querySelectorAll(".slide-single");
  for (let i = 0; i < slides2.length; i++) {
    slides2[i].style.left = offset2 * 650 - 650 + "px";
    offset2++;
  }
  step++;
  setTimeout(function () {
    slides2[0].remove();
    slides2[1].remove();

    if (step === slider.length) {
      prevStep = slider.length - 1;
      step = 0;
      nextStep = 1;
    } else if (step === 0) {
      prevStep = slider.length - 1;
      nextStep = step + 1;
    } else {
      prevStep = step - 1;
      nextStep = step + 1;
    }
    if (nextStep === slider.length) {
      nextStep = 0;
    }
    draw();
    isAnimating = false;
  }, 500);
  offset2 = -1;
}

function prev() {
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  let slides2 = document.querySelectorAll(".slide-single");
  for (let i = 0; i < slides2.length; i++) {
    slides2[i].style.left = offset2 * 650 + 650 + "px";
    offset2++;
  }
  step--;
  setTimeout(() => {
    slides2[1].remove();
    slides2[2].remove();

    if (step < 0) {
      step = slider.length - 1;
      prevStep = step - 1;
      nextStep = 0;
    } else if (step === slider.length - 1) {
      prevStep = step - 1;
      nextStep = 0;
    } else if (step === 0) {
      prevStep = slider.length - 1;
      nextStep = step + 1;
    } else {
      prevStep = step - 1;
      nextStep = step + 1;
    }
    draw();
    isAnimating = false;
  }, 500);
  offset2 = -1;
}

init();
draw();
prevBtn.addEventListener("click", () => prev());
nextBtn.addEventListener("click", () => next());