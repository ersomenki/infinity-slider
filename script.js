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

function updateDots() {
  const dots = document.querySelectorAll(".slider-dots__item");
  dots.forEach((dot, index) => {
    if (index === step) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

async function next() {
  if (isAnimating) {
    return;
  }
  isAnimating = true;

  let currentSlides = document.querySelectorAll(".slide-single");
  await animateSlides(currentSlides, "next");

  currentSlides[0].remove();
  currentSlides[1].remove();

  step++;
  if (step >= slider.length) {
    step = 0;
  }

  prevStep = step === 0 ? slider.length - 1 : step - 1;
  nextStep = step === slider.length - 1 ? 0 : step + 1;
  updateDots();
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

  currentSlides[1].remove();
  currentSlides[2].remove();

  step--;
  if (step < 0) {
    step = slider.length - 1;
  }

  prevStep = step === 0 ? slider.length - 1 : step - 1;
  nextStep = step === slider.length - 1 ? 0 : step + 1;
  
  updateDots();
  draw();
  isAnimating = false;
}



function createDots() {
  const dotsContainer = document.querySelector(".slider-dots");

  for (let i = 0; i < slider.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-dots__item");
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      if (i < step) {
        goToSlide(i, "prev");
      } else if (i > step) {
        goToSlide(i, "next");
      }
    });
  }
  dotsContainer.children[0].classList.add("active");
}

createDots();

async function goToSlide(targetStep) {
  if (isAnimating) {
    return;
  }
  isAnimating = true;

  const currentSlides = document.querySelectorAll(".slide-single");

  if (targetStep > step) {

    await animateSlides(currentSlides, "next");
      currentSlides[0].remove();
      currentSlides[1].remove();
      
      step++;

      if (step >= slider.lenght) {
        step = 0;
      }

      prevStep = step === 0 ? slider.length - 1 : step - 1;
      nextStep = step === slider.length - 1 ? 0 : step + 1;
      updateDots();
      draw();

      const dots = document.querySelectorAll(".slider-dots__item");
      dots.forEach((dot, index) => {
        if (index === step) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });

      isAnimating = false;
  }  else {    
    await animateSlides(currentSlides, "prev");

      currentSlides[1].remove();
      currentSlides[2].remove();

      step--;
      if (step < 0) {
        step = slider.length - 1;
      }

      prevStep = step === 0 ? slider.length - 1 : step - 1;
      nextStep = step === slider.length - 1 ? 0 : step + 1;

      updateDots();
      draw();

      const dots = document.querySelectorAll(".slider-dots__item");
      dots.forEach((dot, index) => {
        if (index === step) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });

      isAnimating = false;
    
  }
}

createSlide();
draw();

prevBtn.addEventListener("click", () => prev());
nextBtn.addEventListener("click", () => next());