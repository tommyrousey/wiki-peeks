function lookup(selection) {
    chrome.storage.sync.get('wikis', function(result) {
        console.log('[API] got list from storage: ', result);
    });
}

function onPageDetailsReceived(details) {
	document.getElementById('output').innerHTML = details.summary;
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
