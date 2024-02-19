import { modalOpen, modalClose } from "./modal";
import { postData } from "../services/services";

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
      modalOpen('.modal', modalTimer);

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
        modalClose('.modal');
      }, 4000);
    }

};

export default forms;