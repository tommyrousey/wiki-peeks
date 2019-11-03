function get_rankings() {
	userRankings = [];
	chrome.storage.sync.get({
		rankedList: [new Wiki('wikipedia', '')]
	}, function (saved) {
		saved.rankedList.forEach(function (wiki) {
			userRankings.push(new Wiki(wiki.name, wiki.subName));
		});
	});

	return userRankings;
}

async function query(wiki, input) {
	switch (wiki) {
		case 'wikipedia':
			var url = 'https://en.wikipedia.org/w/api.php';

			var params = {
				action: 'query',
				list: 'search',
				srsearch: input,
				format: 'json'
			};

			url = url + '?origin=*';
			Object.keys(params).forEach(function (key) {
				url += '&' + key +
					'=' + params[key];
			});

			var data = await fetch(url)
				.then(response => response.json())
				.then(json => json.query.search[0])
				.then(search => ({ name: search.name, snippet: search.snippet }))
				.catch(error => console.log(error));


			// Parse the span tags for search terms out of the result
			data.snippet = data.snippet.replace(/<span class=\"searchmatch\">/g, '');
			data.snippet = data.snippet.replace(/<\/span>/g, '');

			return data.snippet;
		case 'gamepedia':
			break;
	}

	return "super";
}

// function query_all(wiki, input) {
// 	rankings = get_rankings();


// }

console.log('registering');
chrome.runtime.onMessage.addListener(
	async function (request, sender, sendResponse) {
		console.log('receiving');
		if (request.msg == 'hello') {
			console.log(request.msg);
			var selected = window.getSelection();
			var domNode = selected.anchorNode;
			var offset = selected.anchorOffset;
			var end = selected.focusOffset;
			//alert(domNode.nodeValue + ' a ' + offset);

			//domNode.nodeValue = domNode.nodeValue.replace(/\s/g, '\xa0');

			var spanTag = document.createElement('span');
			spanTag.className = 'tooltiptext';

			spanTag.innerHTML = await query('wikipedia', selected.toString());

			var newNode = document.createElement('div');
			newNode.className = 'tooltip';
			newNode.innerHTML = selected.toString().replace(/\s/g, '\xa0');
			newNode.appendChild(spanTag);

			var e = domNode.parentNode;
			var c = e.childNodes;
			var i = 0;
			var temp = domNode;
			while (temp = temp.previousSibling) {
				if (temp.nodeType != null) { ++i }
			}
			var tempHtml = "";
			for (var j = 0; j < i; j++) {
				if (c[j].nodeType == 3)
					tempHtml += c[j].nodeValue;
				else
					tempHtml += c[j].outerHTML;
			}

			tempHtml += c[i].nodeValue.substring(0, offset) + newNode.outerHTML + c[i].nodeValue.substring(end);
			for (j = i + 1; j < c.length; j++) {
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
