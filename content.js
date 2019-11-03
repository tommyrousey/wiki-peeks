alert('registering');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        alert('receiving');
        if (request.id == 'msg') {
            alert(request.msg);
        }
    }
);
