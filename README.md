# breakpointChange
Trigger a breakpointChange event via jQuery, when CSS media query breakpoints change

Usage:
```js
$(window).on('breakpointChange', function(event) {
	//Do some stuff, when the breakpoint changes
	console.log(event.breakpoint);
	console.log('Known breakpoints:', event.breakpointList);
});
```

The code generates a normalized list of breakpoints, found in the stylesheets, which are included in the page.

Example:
```CSS
@media(min-width: 1200px) {
	//whatever
}
@media(max-width: 1199px) {
	//whatever
}
@media(min-width: 768px) {
	//whatever
}
@media(max-width: 767px) {
	//whatever
}
@media(max-width: 40em) {
	//whatever
}
@media(max-width: 320px) {
	//take a guess
}
```

will be turned into these recognized breakpoints:
```
(min-width: 1200px)
(min-width: 768px)
(max-width: 40em)
(max-width: 320px)
```

Heavily inspired by https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
