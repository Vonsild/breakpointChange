# breakpointChange
Trigger a breakpointChange event via jQuery, when CSS media queries trigger

Usage:
```js
$(window).on('breakpointChange', function(event) {
	//Do some stuff, when the breakpoint changes
	console.log(event.breakpoint);
	console.log('Known breakpoints:', event.breakpointList);
});
```

Heavily inspired by https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
