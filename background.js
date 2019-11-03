rightClick = function(word) {
    console.log('sending');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {msg: 'hello'});
    });
};

chrome.contextMenus.create({
 title: "wiki-peeks",
 contexts:["selection"],  // ContextType
 onclick: rightClick // A callback function
});
