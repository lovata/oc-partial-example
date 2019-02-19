export default new class Captcha {
  constructor() {
    this.captchaWrapSelector = 'captcha__wrapper';
    this.captchaErrorSelector = 'captcha__error';
    this.captchaHiddenErrorSelector = 'captcha__error_hidden';
    this.captchaKeySelector = 'data-captcha-id';

    this.captchaCallBack = 'captchaCallBack';
    this.clickCallBack = 'imNotRobot';
    this.captchaUrl = `https://www.google.com/recaptcha/api.js?hl=ru&render=explicit&onload=${this.captchaCallBack}`;

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const captchaWrapp = document.querySelector(`.${this.captchaWrapSelector}`);

      if (!captchaWrapp) return;

      const script = document.createElement('script');
      script.setAttribute('src', this.captchaUrl);

      const body = document.querySelector('body');
      body.appendChild(script);

      const sitekey = captchaWrapp.getAttribute(this.captchaKeySelector);

      this.captchaRender(captchaWrapp, sitekey);
    });
  }

  captchaRender(captchaContainer, sitekey) {
    window[this.captchaCallBack] = () => {
      const { grecaptcha } = window;
      this.grecaptcha = grecaptcha;

      grecaptcha.render(captchaContainer, {
        sitekey,
      });

      this.initCallback();
    };
  }

  response() {
    return this.grecaptcha.getResponse();
  }


  findErrorNode() {
    return document.querySelector(`.${this.captchaErrorSelector}`);
  }

  showError() {
    const error = this.findErrorNode();
    error.classList.remove(this.captchaHiddenErrorSelector).setAttribute('aria-hidden', false);
  }

  initCallback() {
    window[this.clickCallBack] = () => {
      const error = this.findErrorNode();

      error.classList.add(this.captchaHiddenErrorSelector).setAttribute('aria-hidden', true);
    };
  }
}();
