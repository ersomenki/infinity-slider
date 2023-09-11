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

  const animationDuration = 500;
  const durationForClone = 530;

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

    updateSlider((100 + index * 100) * -1);

    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index > slides.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    
    setTimeout(() => {
      if (index === -1) {
        updateSliderNoInterval(slides.length * 100 * -1);
      }
      if (index === slides.length) {
        updateSliderNoInterval(-100);
      }
      isAnimating = false;
      setActiveDot(dots[currentIndex]);
    }, durationForClone);
  }
  
  function updateSliderNoInterval(value) {
    sliderContent.style.transform = `translateX(${value}%)`;
  }

  function updateSlider(value) {   
    const initialValue = parseFloat(sliderContent.style.transform.replace('translateX(', '').replace('%)', '')) || 0;
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
    slides.forEach((_, index) => {
      const element = Object.assign(document.createElement('div'), {
        onclick: () => goToSlide(index),
        className: 'slider-dots-item'
      });

      dots.push(element);
      sliderDots.append(element);
    });
  }
});
