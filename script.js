document.addEventListener('DOMContentLoaded', () => {
  const previousButton = document.getElementById('previousButton');
  const nextButton = document.getElementById('nextButton');
  const sliderContent = document.querySelector('.slider-content');
  const slides = sliderContent.querySelectorAll('img');
  const sliderDots = document.querySelector('.slider-dots');

  const copyOfLastSlide = slides[slides.length - 1].parentElement.cloneNode(true);
  const copyOfFirstSlide = slides[0].parentElement.cloneNode(true);

  sliderContent.prepend(copyOfLastSlide);
  sliderContent.append(copyOfFirstSlide);

  const slideWidthPercent = 100;
  const animationDuration = 500;
  const cloneDuration = 530;

  let currentIndex = 0;
  let dots = [];
  let activeDot;
  let isAnimating = false;

  drawDots();
  goToSlide(0);

  previousButton.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

  function goToSlide(index) {
    if (isAnimating) {
      return;
    }

    isAnimating = true;

    updateSlider((slideWidthPercent + index * slideWidthPercent) * -1);

    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index > slides.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    
    setTimeout(() => {
      if (index === -1) {
        updateSliderNoInterval(slides.length * slideWidthPercent * -1);
      }
      if (index === slides.length) {
        updateSliderNoInterval(-slideWidthPercent);
      }
      isAnimating = false;
      setActiveDot(dots[currentIndex]);
    }, cloneDuration);
  }
  
  function updateSliderNoInterval(value) {
    sliderContent.style.transform = `translateX(${value}%)`;
  }

  function updateSlider(value) {   
    const initialValue = 
    parseFloat(
      sliderContent.style.transform
      .replace('translateX(', '')
      .replace('%)', '')) || 0;
    const targetValue = value;
    const steps = 50;
    const stepValue = (targetValue - initialValue) / steps;
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        const newValue = initialValue + stepValue * currentStep;
        sliderContent.style.transform = `translateX(${newValue}%)`;
        currentStep++;
       } else {
        sliderContent.style.transform = `translateX(${targetValue}%)`;
        clearInterval(interval);
      }
    },animationDuration / steps);

  }

  function setActiveDot(dot) {
    if (activeDot) {
      activeDot.classList.remove('active');
    }

    activeDot = dot;
    activeDot.classList.add('active');
  }

  function drawDots() {
    slides.forEach(() => {
      const element = Object.assign(document.createElement('div'), {        
        className: 'slider-dots-item'
      });
      dots.push(element);
      sliderDots.append(element);
    });
  }
  sliderDots.addEventListener('click', (event) => {
    if (!isAnimating && event.target.classList.contains('slider-dots-item')) {
      const index = dots.indexOf(event.target);
      if (index !== -1) {
        goToSlide(index);
      }
    }
  });
});