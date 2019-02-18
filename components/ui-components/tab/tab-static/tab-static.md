# Pagination

### The Rules

1. Add `tablist` role to the `<ul>` to indicate it contains tabs.
2. Add `presentation` role to each `<li>` to bypass its list item state.
3. Add `tab` role to each `<a>` to incidate it is an actual tab.
4. Add `href` and `aria-controls` to each `<a>` to reference its tab panel.
5. Add `id` to each `<a>` as a reference for its tab panel.
6. Add `aria-selected="true"` to the active `<a>` tab.
7. Add `tabpanel` role to each `<section>` to indicate it is a tab panel.
8. Add `id` to each `<section>` as a reference for its tab.
9. Add `aria-labelledby` to each `<section>` to reference its label.
