document.addEventListener("DOMContentLoaded", () => {
  // Configuration settings for the slider
  const sliderConfig = {
    slideWidthPercent: 100,
    transitionDuration: 500,
    cloneDuration: 550,
    currentIndex: 0
  };
  // Slider body and variables
  const slider = {
    previousButton: document.getElementById("previousButton"),
    nextButton: document.getElementById("nextButton"),
    sliderContent: document.querySelector(".slider-content"),
    slides: document.querySelectorAll(".slider-content img"),
    sliderDots: document.querySelector(".slider-dots"),
    dots: [],
    activeDot: null,
    copyOfLastSlide: null,
    copyOfFirstSlide: null,
    isAnimating: false
  };

  
  // Function to initialize the slider
  function initSlider() {   
    slider.sliderContent.style.transform = `translateX(-100%)`; // Initialize first slide without animation
    drawDots();
    goToSlide(sliderConfig.currentIndex);

     // Set event listeners for nav buttons
    slider.previousButton.addEventListener("click", () =>
      goToSlide(sliderConfig.currentIndex - 1)
    );
    slider.nextButton.addEventListener("click", () =>
      goToSlide(sliderConfig.currentIndex + 1)
    );

    // Clone the last and first slides for the illusion of infinity
    slider.copyOfLastSlide = slider.slides[slider.slides.length - 1].parentElement.cloneNode(true);
    slider.copyOfFirstSlide = slider.slides[0].parentElement.cloneNode(true);
    slider.sliderContent.prepend(slider.copyOfLastSlide);
    slider.sliderContent.append(slider.copyOfFirstSlide);
  }

  function goToSlide(index) {
    if (slider.isAnimating) {
      return;
    }

    slider.isAnimating = true;

    // Slides of value and steps
    updateSlider(
      (sliderConfig.slideWidthPercent + index * sliderConfig.slideWidthPercent) *
        -1
    );
    // If end of slides
    if (index < 0) {
      sliderConfig.currentIndex = slider.slides.length - 1;
    } else if (index > slider.slides.length - 1) {
      sliderConfig.currentIndex = 0;
    } else {
      sliderConfig.currentIndex = index;
    }


    // Pos for the last slides without animation
    setTimeout(() => {
      if (index === -1 && slider.isAnimating === true) {
        updateSliderNoInterval(
          slider.slides.length * sliderConfig.slideWidthPercent * -1
        );
      }
      if (index === slider.slides.length && slider.isAnimating === true) {
        updateSliderNoInterval(-sliderConfig.slideWidthPercent);
      }
      slider.isAnimating = false;
      setActiveDot(slider.dots[sliderConfig.currentIndex]);
    }, sliderConfig.cloneDuration);
  }

  // Function to update the slider's position without interval animation
  function updateSliderNoInterval(value) {
    slider.sliderContent.style.transform = `translateX(${value}%)`;
  }
  // Update slides with setInterval
  function updateSlider(value) {   
    const initialValue = 
    parseFloat(
      slider.sliderContent.style.transform
      .replace('translateX(', '')
      .replace('%)', '')) || 0;
    const targetValue = value;
    const steps = 50;
    const stepValue = (targetValue - initialValue) / steps;
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        const newValue = initialValue + stepValue * currentStep;
        slider.sliderContent.style.transform = `translateX(${newValue}%)`;
        currentStep++;
       } else {
        slider.sliderContent.style.transform = `translateX(${targetValue}%)`;
        clearInterval(interval);
      }
    },sliderConfig.transitionDuration / steps);

  }
  // Function to set the active dot in the slider navigation
  function setActiveDot(dot) {
    if (slider.activeDot) {
      slider.activeDot.classList.remove("active");
    }
    slider.activeDot = dot;
    slider.activeDot.classList.add("active");
  }

  // Function to create and display slider navigation dots
  function drawDots() {
    slider.slides.forEach(() => {
      const element = document.createElement("div");
      element.classList.add("slider-dots-item");
      slider.dots.push(element);
      slider.sliderDots.append(element);
    });
  }
  
  // Add a click event listener to the slider navigation dots
  slider.sliderDots.addEventListener("click", (event) => {
    if (!slider.isAnimating && event.target.classList.contains("slider-dots-item")) {
      const index = slider.dots.indexOf(event.target);
      if (index !== -1) {
        goToSlide(index);
      }
    }
  });

  // Initialize the slider when the DOM content is loaded
  initSlider();
});