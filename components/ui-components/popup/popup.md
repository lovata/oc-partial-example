# Popups

This component make work with popup more comfortable and help you resolve some problem with modal on iOS.

Most important methods:

## setBodyScrollState(boolean) 

If `boolean is false`,  method  save scroll position, adds `overflow: hidden` to <body> and sets `padding-left` on <body>  equal to the width of the scrollbar for stop content shifting, else if `boolean is true` it removes all changes and returns document`s scroll on previous position

## overlayHandler(isInit(boolean), closeBtnNode(node), modalNode(node));

If `isInit is true`,  method creates overlay node and set handlers ('click', keyPress(esc)) on it.
`CloseBtn` is node of button for close modal
`modalNode` is popup`s container

**All arguments is require**

## A11y (focus trap)

If you need to add focus trap in your project recommending [Focus trap](https://github.com/davidtheclark/focus-trap)
