import Swiper from 'swiper';

export default new class productSlider {
  constructor() {
    this.sliderContainerSelector = 'product-slider__container';
    this.slideSelector = 'product-slider__slide';
    this.paginationSelector = 'product-slider__pagination';
    this.bulletSelector = 'product-slider__bullet';
    this.activeBulletSelector = 'product-slider__bullet_active';

    this.navSliderContainerSelector = 'product-nav-slider';
    this.navSlidesSelector = 'product-nav-slider__slide';
    this.activeNavSlidesSelector = 'product-nav-slider__slide_active';
    this.navSliderContainerHiddenSelector = 'product-nav-slider_visually-hidden';

    this.navInit = false;
    this.mqString = '(min-width: 769px)';
    this.delay = 200;

    this.handler();
  }

  handler() {
    const slider = $(`.${this.sliderContainerSelector}`);

    if (!slider.length) return;

    $(document).ready(() => {
      this.changeNavVisibility();
      this.init();
    });

    $(window).on('resize', () => {
      this.changeNavVisibility();
    });
  }

  init() {
    const el = `.${this.paginationSelector}`;
    this.initNavSlider();

    this.productSlider = new Swiper(`.${this.sliderContainerSelector}`, {
      slidesPerView: 1,
      watchOverflow: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      observer: true,
      pagination: {
        el,
        type: 'bullets',
        bulletClass: this.bulletSelector,
        bulletActiveClass: this.activeBulletSelector,
      },
      loop: false,
      thumbs: {
        swiper: this.productNavSlider,
      },
      controller: {
        control: this.productNavSlider,
      },
      preloadImages: false,
      lazy: {
        preloaderClass: 'product-slider__slide-preloader',
      },
    });
  }

  /* This method is relevant if the navigation carousel
   is hidden at a specific screen resolution. */

  changeNavVisibility() {
    const isDesktop = this.getViewportSize();

    if (isDesktop) {
      $(`.${this.navSliderContainerSelector}`).removeClass(this.navSliderContainerHiddenSelector);
    } else {
      $(`.${this.navSliderContainerSelector}`).addClass(this.navSliderContainerHiddenSelector);
    }
  }

  initNavSlider() {
    this.productNavSlider = new Swiper(`.${this.navSliderContainerSelector}`, {
      slidesPerView: 4,
      spaceBetween: 10,
      watchOverflow: true,
      observer: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      direction: 'vertical',
      controller: {
        control: this.productSlider,
      },
    });
  }

  getViewportSize() {
    return window.matchMedia(this.mqString).matches;
  }
}();
