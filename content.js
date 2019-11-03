console.log('registering');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('receiving');
        if (request.msg == 'hello') {
            console.log(request.msg);
            var selected = window.getSelection();
            var domNode = selected.anchorNode;
            var offset = selected.anchorOffset;
			var end = selected.focusOffset;
            alert(domNode.nodeValue + ' a ' + offset);
			
            var spanTag = document.createElement('span');
			spanTag.className = 'tooltiptext';
			spanTag.innerHTML = selected.toString();
			
			var newNode = document.createElement('div');
			newNode.className = 'tooltip';
			newNode.innerHTML = selected.toString();
			newNode.appendChild(spanTag);

			var e = domNode.parentNode;
			var c = e.childNodes;
			var i = 0;
			var temp = domNode;
			while (temp = temp.previousSibling) {
				if (temp.nodeType != null) { ++i }
			}
			var tempHtml = "";
			for (var j = 0; j < i; j++){
				if (c[j].nodeType == 3)
					tempHtml += c[j].nodeValue;
				else
					tempHtml += c[j].outerHTML;
			}

			tempHtml += c[i].nodeValue.substring(0, offset) + newNode.outerHTML + c[i].nodeValue.substring(end);
			for (j = i+1; j < c.length; j++){
				if (c[j].nodeType == 3)
					tempHtml += c[j].nodeValue;
				else
					tempHtml += c[j].outerHTML;
			}
			e.innerHTML = tempHtml;
			//e.replaceChild(newNode, domNode);
          /*  

            newNode.innerHTML = domNode.nodeValue;

            newNode.appendChild(spanTag);
            domNode = newNode;
            */
        }
    }
);
