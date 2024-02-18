function slider() {
     //Slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          currentIndex = document.querySelector('#current'),
          totalIndex = document.querySelector('#total'),
          slideWrapper = document.querySelector('.offer__slider-wrapper'),
          slideField = document.querySelector('.offer__slider-inner'),
          slideWidth = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let offset = 0;
 
    if (slides.length < 10) { 
      totalIndex.textContent = `0${slides.length}`;
      currentIndex.textContent = `0${slideIndex}`;
    } else {
      totalIndex.textContent = slides.length;
      currentIndex.textContent = slideIndex;
    };

    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slideWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
      slide.style.width = slideWidth;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.setAttribute('data-slide-to', i + 1);
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    };

    function activeDot(a) {
      a.forEach(dot => dot.style.opacity = 0.5);
      a[slideIndex - 1].style.opacity = 1;
    };

    function index(a) {
      if (a.length < 10) {
        currentIndex.textContent = `0${slideIndex}`;
      } else {
        currentIndex.textContent = slideIndex;
      }
    };

    function removeNotDigits (string) {
      return +string.replace(/\D/g, '');
    };

    next.addEventListener('click', () => { 
      if (offset == removeNotDigits(slideWidth) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += removeNotDigits(slideWidth);
      }

      slideField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }

      index(slides);

      activeDot(dots);
    });

    prev.addEventListener('click', () => { 
      if (offset == 0) {
        offset = removeNotDigits(slideWidth) * (slides.length - 1);
      } else {
        offset -= removeNotDigits(slideWidth);
      }

      slideField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }

      index(slides);

      activeDot(dots);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;

        offset = removeNotDigits(slideWidth) * (slideTo- 1);

        slideField.style.transform = `translateX(-${offset}px)`;

        index(slides);

        activeDot(dots);
      })
    })

};

module.exports = slider;