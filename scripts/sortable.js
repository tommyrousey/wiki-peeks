$(document).ready(function () {
    $(function () {
        var sortList = $("#sortable")

        // Create a sortable list for the user to rearrange
        sortList.sortable();
        sortList.disableSelection();

        // Display the wikis from the user's saved profile
        userRankings.forEach(function (page) {
            var listElement = '<li>' + page.name + '</li>';
            sortList.append(listElement);
        });
    });
});
