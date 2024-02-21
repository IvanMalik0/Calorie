export function modalOpen(modalSelector, modalTimer) {
  
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimer) {
    clearInterval(modalTimer);
  }
}

export function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

export function modal(trigBtnSelector, modalSelector, modalTimer) {

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