window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
  
    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      });
  
      tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active');
      });
    }
  
    function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
    }
  
    hideTabContent();
    showTabContent();
  
    tabsParent.addEventListener('click', (event) => {
      const target = event.target;
  
      if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });

    // Timer

    const deadline = '2024-03-08';

    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());

      if (t <= 0) {
        days = 0,
        hours = 0, 
        minutes = 0,
        seconds = 0;
      } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
      }
        return { 'total': t, days, hours, minutes, seconds};
    }

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function setClock(selector, endtime) { 
      const time = document.querySelector(selector),
            days = time.querySelector('#days'),
            hours = time.querySelector('#hours'),
            minutes = time.querySelector('#minutes'),
            seconds = time.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days),
        hours.innerHTML = getZero(t.hours),
        minutes.innerHTML = t.minutes,
        seconds.innerHTML = t.seconds;

        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
      }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function modalOpen() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimer);
    }
    
    function modalClose() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    };

    modalTrigBtn.forEach(btn => {
      btn.addEventListener('click', modalOpen);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
        modalClose();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('show')) {
        modalClose();
      }
    });

    const modalTimer = setTimeout(modalOpen, 30000);

    function modalScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= scrollableHeight) {
        modalOpen();
        window.removeEventListener('scroll', modalScroll);
      }
    }

    window.addEventListener('scroll', modalScroll);

    // Class card constructor

    class MenuCard {
      constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.subtitle = subtitle;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.exchange = 36;
        this.exchangeToUAH();
      }

      exchangeToUAH () {
        this.price *= this.exchange;
      }

      render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
          this.element = "menu__item";
          element.classList.add(this.element);
        } else {
          this.classes.forEach(className => element.classList.add(className));

        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
      }
    }

    const getResources = async url => {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}}`);
      }

      return await res.json();
   };

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      })
    })

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
      loading: 'img/form/spinner.svg',
      success: 'Успех',
      failure: 'Ошибка'
    };

    forms.forEach(item => {
      bindPostData(item);
    });

    const postData = async (url, data) => {
       const res = await fetch(url, {
        method: "POST",
          headers: {
            'Content-type' : 'application/json'
          },
          body: data
       })

       return await res.json();
    };

    function bindPostData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThankingModal(message.success);
            statusMessage.remove();
        }).catch(() => {
          showThankingModal(message.failure);
        }).finally(() => {
          form.reset();
        });
      })
    }

    function showThankingModal (message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      modalOpen();

      const thankModal = document.createElement('div');
      thankModal.classList.add('modal__dialog');
      thankModal.innerHTML = `
        <div class="modal__content">
          <div class="modal__close" data-close >&times;</div>
          <div class="modal__title">${message}</div>
        </div>
      `;

      document.querySelector('.modal').append(thankModal);
      setTimeout(() => {
        thankModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        modalClose();
      }, 4000);
    }

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

    // Calculator

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    function calTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
      }

      if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); 
      } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); 
      }
    };

    calTotal();

    function getStaticInformation (parentSelector, activeClass) {
      const elements = document.querySelectorAll(`${parentSelector} div`);

      elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
          if (e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
          } else {
            sex = e.target.getAttribute('id');
          }
  
          elements.forEach(elem => {
            elem.classList.remove(activeClass);
          });
  
          e.target.classList.add(activeClass);

          calTotal();
        });
      });
    };

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {
        switch(input.getAttribute('id')) {
          case 'height':
                height = +input.value;
                break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break; 
        };

        calTotal();
      });
    };

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
  });