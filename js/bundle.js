/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
  
     const result = document.querySelector('.calculating__result span');
     let sex, height, weight, age, ratio;
 
     if (localStorage.getItem('sex')) {
       sex = localStorage.getItem('sex');
     } else {
       sex = 'female';
       localStorage.setItem('sex', 'female');
     };
 
     if (localStorage.getItem('ratio')) {
       ratio = localStorage.getItem('ratio');
     } else {
       ratio = 1.375;
       localStorage.setItem('ratio', 1.375);
     };
 
     function initLocalSettings (selector, activeClass) {
       const elements = document.querySelectorAll(selector);
 
       elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
           elem.classList.add(activeClass);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
           elem.classList.add(activeClass);
         }
       });
     };
 
     initLocalSettings('#gender div', 'calculating__choose-item_active');
     initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
     
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
 
     function getStaticInformation (selector, activeClass) {
       const elements = document.querySelectorAll(selector);
 
       elements.forEach(elem => {
         elem.addEventListener('click', (e) => {
           if (e.target.getAttribute('data-ratio')) {
             ratio = +e.target.getAttribute('data-ratio');
             localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
           } else {
             sex = e.target.getAttribute('id');
             localStorage.setItem('sex', e.target.getAttribute('id'));
           }
   
           elements.forEach(elem => {
             elem.classList.remove(activeClass);
           });
   
           e.target.classList.add(activeClass);
 
           calTotal();
         });
       });
     };
 
     getStaticInformation('#gender div', 'calculating__choose-item_active');
     getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
 
     function getDynamicInformation(selector) {
       const input = document.querySelector(selector);
 
       input.addEventListener('input', () => {
 
         if (input.value.match(/\D/g)) {
           input.style.border = '1px solid red';
         } else {
           input.style.border = 'none';
         };
 
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
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards () {

    class MenuCard {
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.subtitle = subtitle;
          this.descr = descr;
          this.price = price;
          this.parent = document.querySelector(parentSelector);
          this.classes = classes;
          this.exchange = 87;
          this.exchangeToRUB();
        }
  
        exchangeToRUB() {
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
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
              </div>
          `;
          this.parent.append(element);
        }
      }
  
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:3000/menu')
      .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        })
      })
  
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimer) {
  
    const forms = document.querySelectorAll(formSelector);

    const message = {
      loading: 'img/form/spinner.svg',
      success: 'Успех',
      failure: 'Ошибка'
    };

    forms.forEach(item => {
      bindPostData(item);
    });

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

        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', modalTimer);

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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
      }, 4000);
    }

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modalClose: () => (/* binding */ modalClose),
/* harmony export */   modalOpen: () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen(modalSelector, modalTimer) {
  
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimer) {
    clearInterval(modalTimer);
  }
}

function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

function modal(trigBtnSelector, modalSelector, modalTimer) {

    const modalTrigBtn = document.querySelectorAll(trigBtnSelector),
          modal = document.querySelector(modalSelector);

    modalTrigBtn.forEach(btn => {
      btn.addEventListener('click',() => modalOpen(modalSelector, modalTimer));
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
        modalClose(modalSelector);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('show')) {
        modalClose(modalSelector);
      }
    });

    function modalScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= scrollableHeight) {
        modalOpen(modalSelector, modalTimer);
        window.removeEventListener('scroll', modalScroll);
      }
    }

    window.addEventListener('scroll', modalScroll);

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, prevBtn, nextBtn, totalCounter, currentCounter, wrapper, field}) {
  
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevBtn),
          next = document.querySelector(nextBtn),
          total = document.querySelector(totalCounter),
          currentIndex = document.querySelector(currentCounter),
          slideWrapper = document.querySelector(wrapper),
          slideField = document.querySelector(field),
          slideWidth = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let offset = 0;
 
    if (slides.length < 10) { 
      total.textContent = `0${slides.length}`;
      currentIndex.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
  
    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      });
  
      tabs.forEach((item) => {
        item.classList.remove(activeClass);
      });
    }
  
    function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
    }
  
    hideTabContent();
    showTabContent();
  
    tabsParent.addEventListener('click', (event) => {
      const target = event.target;
  
      if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

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

    setClock(id, deadline);

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: () => (/* binding */ getResources),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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

 const getResources = async url => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}}`);
    }

    return await res.json();
 };

 
 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");









window.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalOpen)('.modal', modalTimer), 30000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2024-03-08');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimer);
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimer);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevBtn: '.offer__slider-prev',
    nextBtn: '.offer__slider-next',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map