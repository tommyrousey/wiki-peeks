const ids = ["wikipedia", "gamepedia", "fandom"];

class Wiki {
	constructor(name, subName) {
		this.name = name;
		this.subName = subName;
	}

	async query(input) {
		switch (this.name) {
			case ids[0]:
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
			case ids[1]:
				break;
		}

		return "super";
	}
}

var userRankings = [new Wiki('wikipedia', ''), new Wiki('ethanpedia', '')];



// saves options to chrome.storage
function save_options() {
	var toSave = [];
	$('#sortable li').each(() => {
		var textArr = $(this).text().split(/_(.+)/);
		var subName = '';
		// has subpages
		if (textArr.length == 2) {
			subName = textArr[1];
		}
		toSave.push(new Wiki(textArr[0], subName));
	});

	chrome.storage.sync.set({
		rankedList: toSave
	}, function () {
		// update status to let user know options were saved
		var status = document.getElementById('status');
		status.textContent = 'Options saved';
		setTimeout(function () {
			status.textContent = '';
		}, 750);
	}
	);
}

// restores options using the preferences from chrome.storage
function restore_options() {
	// get json stuff and put the values in the list
	chrome.storage.sync.get({
		rankedList: [new Wiki('wikipedia', '')]
	}, function (saved) {
		userRankings = [];
		saved.rankedList.forEach(function (wiki) {
			userRankings.push(new Wiki(wiki.name, wiki.subName));
		});
	});
}

function append_wiki(name) {
	var listElement = '<li class="draggable">' + name + '</li>';
	$("#sortable").append(listElement);
}

function add_wiki() {
	var wiki = $('#wiki_type option:selected').text();
	var subName = $('#sub-wiki').val();

	userRankings.push(new Wiki(wiki, subName));

	append_wiki(wiki + '-' + subName);
}

document.addEventListener('DOMContentLoaded', restore_options);

$(document).ready(async () => {
	var sortList = $("#sortable");

	// Create a sortable list for the user to rearrange
	sortList.sortable();
	sortList.disableSelection();

	// Display the wikis from the user's saved profile
	userRankings.forEach(function (page) {
		append_wiki(page.name);
	});

	var addWiki = $('#wiki_type')
	ids.forEach(function (wiki) {
		var listElement = '<option>' + wiki + '</option>';
		addWiki.append(listElement);
	});

	document.getElementById('save').addEventListener('click', save_options);
	document.getElementById('add').addEventListener('click', add_wiki)
});
