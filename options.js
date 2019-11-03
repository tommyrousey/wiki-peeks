const ids = ["wikipedia", "gamepedia", "fandom"];

class Wiki {
	constructor(name, subId, subType) {
		this.name = name;
		this.subId = subId;
		this.subType = subType;
	}

	query() {
		return "super";
	}
}

class Wikipedia extends Wiki {
	constructor() {
		super(ids[0], "", "");
	}

	query() {
		return "wikipedia :)";
	}
}

class Gamepedia extends Wiki {
	constructor() {
		super(ids[1], "", "");
	}

	query() {
		return "gamepedia :()";
	}
}

class Fandom extends Wiki {
	constructor() {
		super(ids[2], "", "")
	}

	query() {

	}
}

var userRankings = [new Wikipedia(), new Gamepedia()];

console.log(userRankings[0].query());
console.log(userRankings[1].query());


// saves options to chrome.storage
function save_options() {
	var toSave = $('#sortable').sortable('serialize');
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

// // restores options using the preferences from chrome.storage
// function restore_options() {
// 	// get json stuff and put the values in the list
// 	chrome.storage.sync.get({

// 	});
// }

// document.addEventListener('DOMContentLoaded', restore_options);


$(document).ready(function () {
	var sortList = $("#sortable")

	// Create a sortable list for the user to rearrange
	sortList.sortable();
	sortList.disableSelection();

	// Display the wikis from the user's saved profile
	userRankings.forEach(function (page) {
		var listElement = '<li>' + page.name + '</li>';
		sortList.append(listElement);
	});

	var addWiki = $('#add_wiki')
	ids.forEach(function (wiki) {
		console.log(wiki);
		var listElement = '<option>' + wiki + '</option>';
		addWiki.append(listElement);
	});
	document.getElementById('save').addEventListener('click', save_options);
});
