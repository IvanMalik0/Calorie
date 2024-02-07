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

    const deadline = '2024-02-22';

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
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          currentIndex = document.querySelector('#current'),
          totalIndex = document.querySelector('#total'),
          slideWrapper = document.querySelector('.offer__slider-wrapper'),
          slideField = document.querySelector('.offer__slider-inner'),
          slideWidth = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;

    slideField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => {
      slide.style.width = width;
    });

    // if (slides.length < 10) { 
    //   totalIndex.textContent = `0${slides.length}`;
    // } else {
    //   totalIndex.textContent = slides.length;
    // };

    // showSlide(slideIndex);

    // function showSlide(n) {
    //   if (n > slides.length) {
    //     slideIndex = 1
    //   }

    //   if (n < 1) {
    //     slideIndex = slides.length;
    //   }

    //   slides.forEach(item => item.style.display = 'none');

    //   slides[slideIndex - 1].style.display = 'block';

    //   if (slides.length < 10) { 
    //     currentIndex.textContent = `0${slideIndex}`;
    //   } else {
    //     currentIndex.textContent = slideIndex;
    //   };
    // };

    // function slideCount(n) {
    //   showSlide(slideIndex += n)
    // };

    // prev.addEventListener('click', () => {
    //   slideCount(-1);
    // });

    // next.addEventListener('click', () => {
    //   slideCount(1);
    // });
  });