function cards () {
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
  
    getResources('http://localhost:3000/menu')
      .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        })
      })
  
};

module.exports = cards;