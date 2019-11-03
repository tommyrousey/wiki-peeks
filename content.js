console.log('registering');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('receiving');
        if (request.msg == 'hello') {
            console.log(request.msg);
            var selected = window.getSelection();
            var domNode = selected.anchorNode;
            var offset = selected.anchorOffset;
            alert(domNode.nodeValue + ' a ' + offset);

            domNode.nodeValue = '<strong>hellloooo</strong>';
            /*
            var spanTag = document.createElement('span');
            spanTag.className = 'tooltiptext';

            var newNode = document.createElement('div');
            newNode.innerHTML = domNode.nodeValue;

            newNode.appendChild(spanTag);
            domNode = newNode;
            */
        }
    }
);
