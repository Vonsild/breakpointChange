jQuery(function ($) {
	var sheets = document.styleSheets;
	
	//For storing the found breakpoints
	var breakpoints = {};

	//Locate all media queries in all attached stylesheets
	//This will consider (min-width:1200px) and (max-width:1199px) to be the same breakpoint
	for (var i = 0; i < sheets.length; i += 1) {
		var rules = sheets[i].cssRules;

		if (rules) for (var j = 0; j < rules.length; j += 1) {
			if (rules[j].constructor === CSSMediaRule) {
				var mql = window.matchMedia(rules[j].media.mediaText);
				//Ignore print settings
				if (mql.media.startsWith('print')) continue;
				
				//If it's a min-width query (recommended)
				if (res = mql.media.match(/min-width\s?:\s(\d+)(..)/)) {
					//If this breakpoint is not already registered, and there's no max-width breakpoint that's 1 pixel smaller
					if (!breakpoints[res[1]+res[2]] && !breakpoints[(parseInt(res[1])-1)+res[2]]) breakpoints[res[1]+res[2]] = 'min-width';
				}
				
				//If it's a max-width query (not recommended)
				if (res = mql.media.match(/max-width\s?:\s(\d+)(..)/)) {
					//If this breakpoint is not already registered, and there's no min-width breakpoint that's 1 pixel bigger
					if (!breakpoints[res[1]+res[2]] && !breakpoints[(parseInt(res[1])+1)+res[2]]) breakpoints[res[1]+res[2]] = 'max-width';
				}
			}
		}
	}
	
	var breakpointList = []; //A list of all found breakpoints. Added to the event, to let the eventlistener see all known breakpoints
	
	//Add a MediaQueryListener for each found breakpoint
	for (var point in breakpoints) {
		var bp = '(' + breakpoints[point] + ': ' + point + ')';
		breakpointList.push(bp);
		var mql = window.matchMedia(bp);
		mql.addListener(function(media_query) {
			//When this mediaQueryListener is triggered, use jQuery to trigger a breakPointChange event on window
			var e = $.Event('breakpointChange', {
				'breakpoint' : {
					'media' : media_query.media,
					'matches' : media_query.matches
				},
				'breakpointList' : breakpointList
			});
			$(window).trigger(e);
		});
	}
});
