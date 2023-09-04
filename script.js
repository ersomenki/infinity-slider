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

function createSlide() {
  let img = document.createElement("img");
  img.src = slider[step];
  img.classList.add("slide-single");
  document.querySelector(".slider").prepend(img);
  offset = 1;
}

function draw() {
  let imgPrev = createImage(slider[prevStep], -offset);
  let imgNext = createImage(slider[nextStep], offset);

  document.querySelector(".slider").prepend(imgPrev);
  document.querySelector(".slider").append(imgNext);
}

function createImage(src, imgOffset) {
  let img = document.createElement("img");
  img.src = src;
  img.classList.add("slide-single");
  img.style.left = imgOffset * 650 + "px";
  return img;
}

let slideWidth = 650;
let animationDuration = 500;
let animationInterval = 10;
let animationStep = slideWidth / (animationDuration / animationInterval);

function animateSlides(currentSlides, direction) {
  let offsetChange = direction === "next" ? -animationStep : animationStep;
  let interval = setInterval(() => {
    for (let i = 0; i < currentSlides.length; i++) {
      currentSlides[i].style.left =
        parseFloat(currentSlides[i].style.left) + offsetChange + "px";
    }
  }, animationInterval);

  return new Promise((resolve) => {
    setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, animationDuration);
  });
}

async function next() {
  if (isAnimating) {
    return;
  }
  isAnimating = true;

  let currentSlides = document.querySelectorAll(".slide-single");
  await animateSlides(currentSlides, "next");

  

  step++;
  if (step >= slider.length) {
    step = 0;
  }

  prevStep = step === 0 ? slider.length - 1 : step - 1;
  nextStep = step === slider.length - 1 ? 0 : step + 1;

  draw();
  isAnimating = false;
}

async function prev() {
  if (isAnimating) {
    return;
  }
  isAnimating = true;

  let currentSlides = document.querySelectorAll(".slide-single");
  await animateSlides(currentSlides, "prev");

  

  step--;
  if (step < 0) {
    step = slider.length - 1;
  }

  prevStep = step === 0 ? slider.length - 1 : step - 1;
  nextStep = step === slider.length - 1 ? 0 : step + 1;

  draw();
  isAnimating = false;
}

createSlide();
draw();



prevBtn.addEventListener("click", () => prev());
nextBtn.addEventListener("click", () => next());