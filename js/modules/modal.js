function modal() {
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

};

module.exports = modal;