/* For Jenny, my Queen */

/*  ============================
    Main script file, handles canvas features and list management
    ============================ */

/*  ----------------------------
    Initialization
    ---------------------------- */
initialize();

function initialize() {
    // remove badge
    browser.browserAction.setBadgeText({ text: "" });

    // bind return key to insert snippet
    var input = document.getElementById('inputTextbox');
    input.onkeydown = function (event) {

        if (event.keyCode == 13 || event.which == 13) {
            addSnippet();
        }
    }

    // set placeholder text for input box
    input.setAttribute('placeholder', browser.i18n.getMessage('canvasInputPlaceholder'));

    // display version number
    var versionLabel = document.getElementById('versionLabel');
    versionLabel.innerText = "Version " + browser.runtime.getManifest().version;

    // set text for queue empty text
    var emptyLabel = document.getElementById('listEmptyString');
    if (emptyLabel) {
        emptyLabel.style.display = 'block';
        emptyLabel.innerText = browser.i18n.getMessage('canvasEmptyList');
    }

    // load storage items to items list
    var storageItems = browser.storage.sync.get(function (items) {
        for (var element in items) {
            addSnippetToList(items[element], element);
            emptyLabel.style.display = 'none';
        }
    });

}

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

        var success = false;

        // dispatch copy event
        try {
            document.execCommand('copy');
            success = true;
        } catch (err) {

        }

        // remove temporary textbox
        document.body.removeChild(tempTextbox);

        // highlight list item in green when successful
        highlightListEntry(e.target.parentElement, success, removeHighlightClass);
    }
});

/*  ----------------------------
    List management
    ---------------------------- */
function addSnippet() {
    var input = document.getElementById('inputTextbox').value;

    if (input) {
        saveSnippet(input);
    }
}

function clearSnippets() {
    browser.storage.sync.clear();

    var emptyLabel = document.getElementById('listEmptyString');
    if (emptyLabel) {
        emptyLabel.style.display = 'block';
    }

    var list = document.getElementById('snippetList');
    while (list.firstChild)
        list.removeChild(list.firstChild);
}

function saveSnippet(content) {
    // Save content to browser storage
    var snippetText = content;
    var snippetHeader = new Date().toUTCString();

    if (content.length < 300) {
        browser.storage.sync.set({ [snippetHeader]: content });

        // Add snippet to List
        addSnippetToList(snippetText, snippetHeader);
    } else {
         browser.browserAction.setBadgeText({ text: "X" });
         browser.browserAction.setBadgeBackgroundColor({color: "#DC2901"});

        setTimeout(function () {
            browser.browserAction.setBadgeText({ text: "" });
        }, 300000);
    }
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

function highlightListEntry(item, success, callback) {
    // set background color to given item
    if (success) {
        item.classList.add('highlightSuccessClass');
    } else {
        item.classList.add('highlightFailureClass');
    }

    setTimeout(function () {
        callback(item, success);
    }, 1000);

}

function removeHighlightClass(item, success) {
    // Remove class from element
    if (success) {
        item.classList.remove('highlightSuccessClass');
    } else {
        item.classList.remove('highlightFailureClass');
    }
}
