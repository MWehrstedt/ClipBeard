/* For Jenny, my Queen */

/* variables */
let count = 0;

/* add event listeners */
addBtn.addEventListener('click', addSnippet);
clearBtn.addEventListener('click', clearSnippets);
snippetList.addEventListener('click', function (e) {

    // check if list item is clicked, do nothing otherwise
    if (e.target && e.target.nodeName == 'DIV') {
        // get text to copy
        var copyBody = e.target.innerHTML;

        // create a temporary textbox to copy text from
        var tempTextbox = document.createElement('textarea');
        tempTextbox.value = copyBody;
        document.body.appendChild(tempTextbox);
        tempTextbox.select();

        // dispatch copy event
        try {
            document.execCommand('copy');
        } catch (err) {
        }

        // remove temporary textbox
        document.body.removeChild(tempTextbox);

        // show successful message
        showAndHideMessagebox(copyBody);
    }
});

initialize();

function initialize() {
    //count = 0;
    // set text for queue empty text
    var emptyLabel = document.getElementById('listEmptyString');
    if (emptyLabel) {
        emptyLabel.style.display = 'block';
        emptyLabel.innerText = browser.i18n.getMessage('canvasEmptyList');
    }

    // set content for version label
    var versionLabel = document.getElementById('versionLabel');
    versionLabel.innerText = 'Version ' + browser.runtime.getManifest().version;

    // load storage items to items list
    var storageItems = browser.storage.sync.get(function (items) {
        for (var element in items) {
            addSnippetToList(items[element], element);
            emptyLabel.style.display = 'none';
        }
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
    var sContTitleAttr = document.createAttribute('title');
    sContTitleAttr.value = text;
    sContentArea.setAttributeNode(sContTitleAttr);
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

    var sEditButtonTitleAttr = document.createAttribute('title');
    sEditButtonTitleAttr.value = browser.i18n.getMessage('canvasRemoveTooltip');
    sEditButton.setAttributeNode(sEditButtonTitleAttr);

    sEditButton.addEventListener('click', function () {
        browser.storage.sync.remove(nid);

        // redraw list
        var list = document.getElementById('snippetList');
        while (list.firstChild)
            list.removeChild(list.firstChild);

        initialize();
        console.log('Removed entry ' + this.id);
    }, false);

    sEditArea.appendChild(sEditButton);

    // add created nodes to parent node
    sItem.appendChild(sContentArea);
    sItem.appendChild(sEditArea);
    sNode.appendChild(sItem);
    list.appendChild(sNode);

    // Clear textbox
    document.getElementById('inputTextbox').value = '';

    // Hide list empty label
    var emptyLabel = document.getElementById('listEmptyString');
    if (emptyLabel) {
        emptyLabel.style.display = 'none';
    }
}

function clearSnippets() {
    browser.storage.sync.clear();
    count = 0;

    var emptyLabel = document.getElementById('listEmptyString');
    if (emptyLabel) {
        emptyLabel.style.display = 'block';
    }


    var list = document.getElementById('snippetList');
    while (list.firstChild)
        list.removeChild(list.firstChild);
}

function showAndHideMessagebox(text) {
    var messageBox = document.getElementById('messagePanelContainer');
    messageBox.style.display = 'block';
    
    var messageBoxContent = document.getElementById('messagePanelContent');
    messageBoxContent.innerText = browser.i18n.getMessage('canvasMessageboxContent');

    var messageBoxSelection = document.getElementById('messagePanelSelection');
    messageBoxSelection.innerText = text;
    
    setTimeout(function () {
        messageBox.style.display = 'none';
    }, 1111);

}
