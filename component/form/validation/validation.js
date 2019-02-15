import Bouncer from 'bouncer';

export default new class Validation {
  constructor() {
    this.formForValidationSelector = '._required';
    this.inputSelector = 'form__input-field';
    this.inputErrorSelector = 'form__input-field_error';
    this.hintSelector = 'form__input-hint';
    this.filledFieldSelector = 'form__input-field_fill'; // Class for show correct filled field

    this.handler();
  }

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      this.validate(this.formForValidationSelector);
      this.observer();
    });
  }

  validate(selector = this.formForValidationSelector) {
    const messages = this.returnMessageArray();
    this.validation = new Bouncer(selector, {
      fieldClass: 'form__input-field_error',
      errorClass: 'form__input-error',
      fieldPrefix: 'validation-error-',
      errorPrefix: 'validation-error-',
      messageAfterField: true,
      messageCustom: 'data-bouncer-message',
      messageTarget: 'data-bouncer-target',
      disableSubmit: true,
      messages,
    });
  }

  returnMessageArray() {
    this.message = {
      missingValue: {
        checkbox: 'This field is required.',
        radio: 'Please select a value.',
        select: 'Please select a value.',
        'select-multiple': 'Please select at least one value.',
        default: 'Please fill out this field.',
      },
      patternMismatch: {
        email: 'Please enter a valid email address.',
        url: 'Please enter a URL.',
        number: 'Please enter a number',
        color: 'Please match the following format: #rrggbb',
        date: 'Please use the YYYY-MM-DD format',
        time: 'Please use the 24-hour time format. Ex. 23:00',
        month: 'Please use the YYYY-MM format',
        default: 'Please match the requested format.',
      },
      outOfRange: {
        over: 'Please select a value that is no more than {max}.',
        under: 'Please select a value that is no less than {min}.',
      },
      wrongLength: {
        over: 'Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.',
        under: 'Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.',
      },
    };

    return this.message;
  }

  observer() {
    document.addEventListener('bouncerRemoveError', ({ target }) => {
      target.classList.add(this.filledFieldSelector);
    }, false);

    document.addEventListener('bouncerShowError', ({ target }) => {
      target.classList.remove(this.filledFieldSelector);
    }, false);

    document.addEventListener('focusout', ({ target }) => {
      if (!target.hasAttribute('required')
        || target.matches(`.${this.inputErrorSelector}`)
        || !target.value.trim()) return;

      target.classList.add(this.filledFieldSelector);
    });
  }
}();
