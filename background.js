/* For Jenny, my Queen */

/*  ============================
    Background script file, handles context menu items
    ============================ */
browser.browserAction.setBadgeBackgroundColor({ color: '#007f00' });

// Create context menu items
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
        browser.browserAction.setBadgeText({ text: '+' });

        setTimeout(function () {
            browser.browserAction.setBadgeText({ text: "" });
        }, 600000);
    }
});
