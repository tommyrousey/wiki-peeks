$(document).ready(function () {
    document.getElementById('options-button').addEventListener('click', function () {
        chrome.runtime.openOptionsPage();
    });
});
