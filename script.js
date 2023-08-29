let slides = document.querySelectorAll(".slide-single");
const slider = document.querySelector(".slider");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let isAnimating = false;

let step = 0;

function init() {
    slides.forEach((slide, index) => {
        slide.style.left = `${index * 650}px`; // Position the slides initially
    });
}

function move(direction) {
    if (isAnimating) {
        return;
    }
    
    isAnimating = true;
    let offset = direction === 'next' ? -650 : 650;

    slides.forEach((slide, index) => {
        let pos = parseFloat(slide.style.left);
        let newPos = pos + offset;
        let id = setInterval(frame, 1);

        function frame() {
            if ((offset > 0 && pos >= newPos) || (offset < 0 && pos <= newPos)) {
                clearInterval(id);
                slide.style.left = `${newPos}px`;
                isAnimating = false;

                if (step === slides.length - 1 && direction === 'next') {
                    resetSlides();
                } else if (step === 0 && direction === 'prev') {
                    resetSlides(true);
                }
            } else {
                pos += offset / 10;
                slide.style.left = `${pos}px`;
            }
        }
    });

    step += (direction === 'next' ? 1 : -1);
    if (step >= slides.length) {
        step = 0;
    } else if (step < 0) {
        step = slides.length - 1;
    }
}

function resetSlides(toEnd = false) {
    slides.forEach((slide, index) => {
        slide.style.left = `${(index - (toEnd ? slides.length : -1)) * 650}px`;
    });
    step = toEnd ? slides.length - 1 : 0;
}

init();
prevBtn.addEventListener("click", () => move('prev'));
nextBtn.addEventListener("click", () => move('next'));
