/* For Jenny, my Queen */

/* variables */
var count = 0;

/* add event listeners */
addBtn.addEventListener('click', addSnippet);
clearBtn.addEventListener('click', clearSnippets);
document.addEventListener('click', function (e) {

    // check if list item is clicked, do nothing otherwise
    if (e.target && e.target.nodeName == 'LI') {
        // get text to copy
        var copyBody = e.target.innerHTML;

        // create a temporary textbox to copy text from
        var tempTextbox = document.createElement('textarea');
        tempTextbox.value = copyBody;
        document.body.appendChild(tempTextbox);
        tempTextbox.select();

        // dispatch copy event
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copied ' + copyBody + ' command was ' + msg);
        } catch (err) {
            console.log('Unable to copy' + copyBody + 'to clipboard');
        }

        // remove temporary textbox
        document.body.removeChild(tempTextbox);
    }
});

initialize();

function initialize() {
    // load storage items to items list
    var storageItems = browser.storage.sync.get(function (items) {
        for (var element in items)
            addSnippetToList(items[element]);
    });
}

function addSnippet() {
    var input = document.getElementById('inputTextbox').value;

    if (input) {
        saveSnippet(input);
    }

}

function saveSnippet(content) {
    // Save content to browser storage
    var snippetText = content;
    var snippetHeader = new Date().toUTCString();
    browser.storage.sync.set({ [snippetHeader]: content });

    // Add snippet to List
    addSnippetToList(snippetText);
}

function addSnippetToList(text) {
    // Create new list item and add it to the list
    var list = document.getElementById('snippetList');
    var sNode = document.createElement('li');
    sNode.innerText = text;
    list.appendChild(sNode);

    // Clear textbox
    document.getElementById('inputTextbox').value = '';
}

function clearSnippets() {
    browser.storage.sync.clear();
    var list = document.getElementById('snippetList');
    while (list.firstChild)
        list.removeChild(list.firstChild);
}
