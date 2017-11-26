/* For Jenny, my Queen */

browser.contextMenus.create({
    id: 'clipbeardSelectionMenuItem',
    title: browser.i18n.getMessage('contextMenuLabel'),
    contexts: ["selection"],
}, function () {
    // onCreated function. 
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    // Check for contextmenu item click
    if (info.menuItemId === 'clipbeardSelectionMenuItem') {
        var snippetText = info.selectionText;
        var snippetHeader = new Date().toUTCString();
        browser.storage.sync.set({ [snippetHeader]: snippetText });
        addSnippetToContextMenu(info.selectionText);
    }
});