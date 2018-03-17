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

        // Iterate through every storage entry and show badge, if snippet is already saved
        var storageItems = browser.storage.sync.get(function (items) {
            for (var element in items) {
                if (items[element] === snippetText) {

                    // Show a star character (unicode u+2605) on an orange background
                    browser.browserAction.setBadgeText({ text: String.fromCharCode(9733) });
                    browser.browserAction.setBadgeBackgroundColor({color: "#FFA500"});
                    return;
                }
            }

            // Show a plus on a green background
            browser.storage.sync.set({ [snippetHeader]: snippetText });
            browser.browserAction.setBadgeBackgroundColor({color: "#00CC00"});
            browser.browserAction.setBadgeText({ text: '+' });
        });


        setTimeout(function () {
            browser.browserAction.setBadgeText({ text: "" });
        }, 300000);
    }
});
