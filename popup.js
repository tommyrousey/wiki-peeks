function onPageDetailsReceived(details) {
	document.getElementById('output').innerText = details.summary;
}

// when popup html has loaded
window.addEventListener('load', function(evt) {
	// get the event page
	chrome.runtime.getBackgroundPage(function(eventPage) {
		// call the getPageInfo func in the event page, passing in
		// onPageDetailsReceived function as the callback. This injects
		// content.js into the current tab's HTML
		eventPage.getPageDetails(onPageDetailsReceived);
	});
});
