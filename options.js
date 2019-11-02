const var ids = ["wikipedia", "gamepedia", "fandom"];

var userRankings = [new Wikipedia(), new Gamepedia()];

console.log(userRankings[0].query());

class Wiki {
	constructor(name, subId, subType) {
		this.name = name;
		this.subId = subId;
		this.subType = subType;
	}

	function query() {}
}

class Wikipedia extends Wiki {
	constructor() {
		super(ids[0], "", "");
	}

	function query() {
		return "wikipedia :)";
	}
}

class Gamepedia extends Wiki {
	constructor() {
		super(ids[1], "", "");
	}

	function query() {
		return "gamepedia :()";
	}
}

class Fandom extends Wiki {
	constructor() {
		super(ids[2], "", "")
	}

	function query() {

	}
}

// saves options to chrome.storage
function save_options() {

}

// restores options using the preferences from chrome.storage
function restore_options() {
	// get json stuff and put the values in the list
	chrome.storage.sync.get({

	})
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
