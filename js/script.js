import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calculator from './modules/calculator';
import { modalOpen } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setTimeout(() => modalOpen('.modal', modalTimer), 30000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2024-03-08');
  modal('[data-modal]', '.modal', modalTimer);
  forms('form', modalTimer);
  cards();
  calculator();
  slider({
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