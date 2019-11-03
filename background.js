// called onload in the popup code
function getPageDetails(callback) {

	// inject the content script into the current page
	chrome.tabs.executeScript(null, { file: 'content.js' });
	// perform the callback when a message is received from the content script
	 chrome.runtime.onMessage.addListener(function(message) {
	 	callback(message);
	 });
};
rightClick = function(word){
    var query = word.selectionText;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});
    });
};

chrome.contextMenus.create({
 title: "wiki-peeks",
 contexts:["selection"],  // ContextType
 onclick: rightClick // A callback function
});
