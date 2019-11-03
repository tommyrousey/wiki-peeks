function get_rankings() {
	return new Promise((resolve) => {
		rankings = [];

		chrome.storage.sync.get({
			rankedList: [{ name: 'wikipedia', subname: '' }]
		}, function (saved) {
			saved.rankedList.forEach(function (wiki) {
				rankings.push({ name: wiki.name, subname: wiki.subName });
			});

			resolve(rankings);
		});
	});
}

async function query(wiki, subwiki, input) {
	console.log(wiki, subwiki, input);
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
				.catch(error => {
					console.log(error);
					return '';
				});


			// Parse the span tags for search terms out of the result
			data.snippet = data.snippet.replace(/<span class=\"searchmatch\">/g, '');
			data.snippet = data.snippet.replace(/<\/span>/g, '');

			return data.snippet;
		case 'gamepedia':
			break;
		default:
			return '';
	}

	return '';
}

async function query_all(input) {
	var rankings = await get_rankings();

	var data = '';
	for (i = 0; i < rankings.length; i++) {
		data = await query(rankings[i].name, rankings[i].subname, input);

		if (data != '') {
			break;
		}
	}

	return data;
}

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

			spanTag.innerHTML = await query_all(selected.toString());

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
