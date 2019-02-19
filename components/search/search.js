import Popup from '../ui-components/popup/popup';

export default new class Search {
  constructor() {
    this.searchContainerSelector = 'search';
    this.openSearchBtnSelector = 'search__btn';
    this.popupSelector = 'search__wrapper';
    this.popupOpenSelector = 'search_open';
    this.popupWithResultSelector = 'search__wrapper_with-result';
    this.popupCloseBtnSelector = 'search__close-btn';
    this.searchInputSelector = 'search__input-field';
    this.resultWrapperSelector = 'search__result-wrapper';
    this.resultContainerSelector = 'search__result';
    this.overlaySelector = 'search__overlay';
    this.visiblePreloaderSelector = 'search__preloader_visible';
    this.preloaderSelector = 'search__preloader';

    this.isOpen = false;
    this.delay = 300;
    this.mqString = '(max-width: 768px)';

    this.init();
  }

  init() {
    const searchContainer = document.querySelector(`.${this.searchContainerSelector}`);

    if (!searchContainer) return;

    this.handler(searchContainer);
  }

  handler(container) {
    const openSearchBtn = container.querySelector(`.${this.openSearchBtnSelector}`);
    const closeSearchBtn = container.querySelector(`.${this.popupCloseBtnSelector}`);
    const input = container.querySelector(`.${this.searchInputSelector}`);
    const overlay = container.querySelector(`.${this.overlaySelector}`);

    openSearchBtn.addEventListener('click', () => {
      this.togglePopup(container);
    });

    closeSearchBtn.addEventListener('click', () => {
      this.togglePopup(container);
    });

    input.addEventListener('input', () => {
      clearTimeout(this.inputTimer);

      this.inputTimer = setTimeout(() => {
        if (input.value.trim().length < 3) return;
        this.showResult(container);
      }, this.delay);

    });

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);

      setTimeout(() => {
        this.toggleBodyState(container);
      }, this.delay);
    });

    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hideDesktopResult(container, input);
    });
  }

  hideDesktopResult(container, input) {
    const popup = container.querySelector(`.${this.popupSelector}`);

    popup.classList.remove(this.popupWithResultSelector);
    input.value = null; // eslint-disable-line no-param-reassign
    this.clearResultList(container);
  }

  showResult(container) {
    /* TODO: set correct ajax request and correct path to search-result node */

    const preloader = container.querySelector(`.${this.preloaderSelector}`);

    if (preloader) {
      preloader.classList.add(this.visiblePreloaderSelector);
    }

    const popup = container.querySelector(`.${this.popupSelector}`);

    popup.classList.add(this.popupWithResultSelector);

    $.request('onAjax', {
      update: {
        'search/search-result': `.${this.resultWrapperSelector}`,
      },
      complete: () => {
        if (preloader) {
          preloader.classList.remove(this.visiblePreloaderSelector);
        }
      },
    });
  }

  togglePopup(container) {
    if (!window.matchMedia(this.mqString).matches) return;

    container.classList.toggle(this.popupOpenSelector);

    if (this.isOpen === false) {
      Popup.setBodyScrollState(false);
      this.isOpen = true;
    } else {
      Popup.setBodyScrollState(true);
      this.clearResultList(container);
      this.isOpen = false;
    }
  }

  clearResultList(container) {
    const resultNode = container.querySelector(`.${this.resultContainerSelector}`);
    const searchField = container.querySelector(`.${this.searchInputSelector}`);

    searchField.value = null;

    if (!resultNode) return;

    resultNode.remove();
  }

  toggleBodyState(container) {
    if (this.isOpen === false) return;

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      if (window.matchMedia(this.mqString).matches) {
        Popup.setBodyScrollState(false);
        container.classList.add(this.popupOpenSelector);
      } else {
        Popup.setBodyScrollState(true);
        container.classList.remove(this.popupOpenSelector);
      }
    }, this.delay);
  }
}();
