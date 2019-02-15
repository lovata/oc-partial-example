# Radio/checkbox partial

This is simple example of js-free radio button implementation considering accessibility and semantic. 

1. You dont need `display:none` to hide an <input type="radio"> or <input type="checkbox">. You should to use visually-hidden pattern it help you save focus ability for input and styling  every state variants without JS.
2. More often people are using <label> to emulate radio button state changing. It`s not very good way. More semantic and a11y-friendly variant is using pseudo-element or <span role="presentation"> for it inside the <label>. Pls use label according to it role.

```css
.radio__label {
  position: relative;

  &::before {
    content: '';
    border: 2px solid #000;
    background-color: transparent;
  }
}

.radio__field:checked + .radio__label {

  &::before {
    background-color: #333;
  }
}
```
