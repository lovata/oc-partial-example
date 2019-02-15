export default new class Input {
  constructor() {
    this.inputWrapSelector = 'input';
    this.inputFieldSelector = 'input__field';
    this.inputLabelSelector = 'input__label'; 
    this.inputLabelElevatedSelector = 'input__label_elevated';

    this.handler();
  }

  handler() {
    const input = $(`.${this.inputFieldSelector}`);

    if (!input.length) return;

    $(document).on('focus', `.${this.inputFieldSelector}`, ({ target }) => {
      this.labelUp(target);
    });

    $(document).on('blur', `.${this.inputFieldSelector}`, ({ target }) => {
      this.labelDown(target);
      this.checkChange(target);
    });
  }

  static checkInputFillState(input) {
    const value = $(input).val().trim();
    const state = value.length > 0;

    return state;
  }

  findLabel(input) {
    const label = $(input).siblings(`.${this.inputLabelSelector}`);

    return label;
  }

  labelUp(input) {
    this.findLabel(input).addClass(this.inputLabelElevatedSelector);
  }

  labelDown(input) {
    const inputState = this.constructor.checkInputFillState(input);

    if (!inputState) {
      this.findLabel(input).removeClass(this.inputLabelElevatedSelector);
    }
  }
}();
