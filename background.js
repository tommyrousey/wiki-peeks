rightClick = function(word) {
    var query = word.selectionText;
    alert('sending');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {id: 'msg', msg: query});
    });
};

chrome.contextMenus.create({
 title: "wiki-peeks",
 contexts:["selection"],  // ContextType
 onclick: rightClick // A callback function
});
