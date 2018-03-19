# ClipBeard

A small Browser Extension to save frequently used texts ready to use for your pasting pleasure.

Tested in 
* Microsoft Edge Version 41.16922 (Fall Creators Update), should work on earlier versions
* Firefox - Version 56+
* Chrome and Vivaldi with minor modifications (see below)

-----
## Sideload in Edge

To sideload an extension in Edge, follow [the instructions in this link](https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/adding-and-removing-extensions#adding-an-extension)

## Sideload in Firefox

Download the *.xpi* File in */packages* and simply Drag and Drop it onto Firefox. Confirm. Thats it.

[More details for temporary extension installation can be found here](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)

## Sideload in Vivaldi and Chrome

First, you need to replace every instance of the **browser** namespace with **chrome**. 

Access the extensions website for your browser (*vivaldi://extensions* or *chrome://extensions*) and activate **Developer Mode**. Click **Load unpacked extension…** and select the directory where you saved your extension code.

A zipped version for Vivaldi / Chrome to sideload is located in the */packages* directory.

## Use in Safari

Nope, sorry.

