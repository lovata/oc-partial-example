export default new class TagTray {
  constructor() {
    this.tagTraySelector = 'tagtray-gallery';

    this.mainLibSrc = 'https://www.tagtray.com/v3/tagtray.js';
    this.carouselSrc = 'https://www.tagtray.com/v3/tagtray-carousel.js';

    /* We have to connect jquery for this library due to the lack
     of the ability to connect it via npm / github */

    this.jquerySrc = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';

    this.init();
  }

  init() {
    const tagTrayContainer = $(`.${this.tagTraySelector}`);

    if (!tagTrayContainer.length) return;

    this.addJquery();
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["addScript"] }] */

  addJquery() {
    const script = this.addScript(this.jquerySrc);

    script.onload = () => {
      [this.mainLibSrc, this.carouselSrc].forEach(el => this.addScript(el));
    };
  }

  addScript(src) {
    const script = document.createElement('script');
    script.setAttribute('src', src);

    document.body.appendChild(script);

    return script;
  }
}();
