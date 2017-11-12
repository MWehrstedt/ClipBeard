/* For Jenny, my Queen */

/* variables */
var count = 0;

/* add event listeners */
addBtn.addEventListener('click', addSnippet);
clearBtn.addEventListener('click', clearSnippets);
snippetList.addEventListener('click', function (e) {

    // check if list item is clicked, do nothing otherwise
    if (e.target && e.target.nodeName == 'DIV') {
        // get text to copy
        console.log(e.target);

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
            addSnippetToList(items[element], element);
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
    addSnippetToList(snippetText, snippetHeader);
}

function addSnippetToList(text, nid) {
    // Create new list item and add it to the list
    var list = document.getElementById('snippetList');
    var sNode = document.createElement('li');

    // parent node
    var sItem = document.createElement('div');
    var sItemAttr = document.createAttribute('class');
    sItemAttr.value = 'itemArea';
    sItem.setAttributeNode(sItemAttr);

    // displayed content area
    var sContentArea = document.createElement('div');
    var sContAttr = document.createAttribute('class');
    sContAttr.value = 'itemContentArea';
    sContentArea.setAttributeNode(sContAttr);
    sContentArea.innerText = text;

    // edit button area
    var sEditArea = document.createElement('div');
    var sEditAttr = document.createAttribute('class');
    sEditAttr.value = 'itemEditArea';
    sEditArea.setAttributeNode(sEditAttr);
    
    // create erase button
    var sEditButton = document.createElement('button');
    var sEditButtonAttr = document.createAttribute('class');
    sEditButtonAttr.value = 'itemEditButton';
    sEditButton.setAttributeNode(sEditButtonAttr);
    var sEditButtonIdAttr = document.createAttribute('id');
    sEditButtonIdAttr.value = nid;
    sEditButton.setAttributeNode(sEditButtonIdAttr);
    sEditButton.addEventListener('click', function() {
        browser.storage.sync.remove(nid);

        // redraw list
        var list = document.getElementById('snippetList');
        while (list.firstChild)
            list.removeChild(list.firstChild);

        initialize();
        console.log('Removed entry ' + this.id );
    }, false);

    sEditArea.appendChild(sEditButton);
    
    // add created nodes to parent node
    sItem.appendChild(sContentArea);
    sItem.appendChild(sEditArea);
    sNode.appendChild(sItem);
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
