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

    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index > slides.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    console.log(currentIndex)

    updateSlider((100 + index * 100) * -1);

    setTimeout(() => {
      

      if (index === -1) {
        updateSlider(slides.length * 100 * -1);
      }

      if (index === slides.length) {
        updateSlider(-100);
      }

      isAnimating = false;
      console.log(index);
      setActiveDot(dots[currentIndex]);
    }, animationDuration);
  }
  
  function updateSlider(value) {   
    const initialValue = parseFloat(sliderContent.style.transform.replace('translateX(', '').replace('%)', ''));
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
