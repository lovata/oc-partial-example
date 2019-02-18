export default new class staticTab {
  constructor() {
    this.tabContainerSelector = 'tab';
    this.linkTabSelector = 'tab__link';
    this.activeLinkTabSelector = 'tab__link_active';
    this.contentSelector = 'tab__content';
    this.invisibleContentSelector = 'tab__content_visually-hidden';

    this.init();
  }

  init() {
    $(document).on('click', `.${this.linkTabSelector}`, (e) => {
      e.preventDefault();
      const { target } = e;
      const parent = $(target).parents(`.${this.tabContainerSelector}`);

      if ($(target).hasClass(this.activeLinkTabSelector)) return;

      this.showTab(target, parent);
    });
  }

  hideTab(parent) {
    const tabCollection = parent.find(`.${this.linkTabSelector}`);
    const tabContentCollection = parent.find(`.${this.contentSelector}`);

    [...tabCollection].forEach(tab => $(tab).removeClass(this.activeLinkTabSelector));
    [...tabContentCollection].forEach(el => $(el).addClass(this.invisibleContentSelector));
  }

  removeActiveLabels(tab) {
    $(tab).removeClass(this.activeLinkTabSelector);
    $(tab).removeAttr('aria-selected');
  }

  showTab(target, parent) {
    const id = $(target).attr('href');
    const tabContent = $(id);

    this.hideTab(parent);

    $(target).addClass(this.activeLinkTabSelector);
    $(target).attr('aria-selected', true);

    tabContent.removeClass(this.invisibleContentSelector);
  }
}();
