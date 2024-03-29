const ids = ["wikipedia", "gamepedia", "fandom"];

class Wiki {
	constructor(name, subName) {
		this.name = name;
		this.subName = subName;
	}
}

var userRankings = [new Wiki('wikipedia', '')];

// saves options to chrome.storage
function save_options() {
	var toSave = [];
	$('#sortable li').each(function () {
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
	sortList.sortable({
        forcePlaceholderSize: true,
        tolerance: 'pointer',
        cursor: 'pointer',
        over: function () {
            removeIntent = false;
        },
        out: function () {
            removeIntent = true;
        },
        beforeStop: function (event, ui) {
            if(removeIntent === true) {
                ui.item.hide();
                if (confirm('Are you sure want to remove this Wiki?')) {
                    ui.item.remove();
                } else {
                    ui.item.show();
                }
            }
        }
    });
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
