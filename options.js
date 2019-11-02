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
