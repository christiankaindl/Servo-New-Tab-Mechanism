"use strict";


/** Feature that enables you to open a new tab by keyword
* Default search engine will be DuckDuckGo because no search engine APIs are implemented (It is not possible to determine what the current default search engine is...)
*/
browser.omnibox.OnInputEnteredDisposition = "newForegroundTab";
browser.omnibox.setDefaultSuggestion(
{description: "Open New Tab"}
);
browser.omnibox.onInputEntered.addListener(omnibarInput);

function omnibarInput(e) {
        var handleInput = e.split(" ");

        console.group('omnibarInput entered');
        console.info(handleInput);

        switch (handleInput[0]) {
                case "new": {
                        console.info('OMG AGAIN');
                        //browser.contextualIdentities.create({
                          //      name: handleInput[1].toString(),
                            //    icon: "fingerprint",
                              //  color: "blue"
                       // });

                        browser.tabs.create({

                        });
                        break;
                }
        }

        let query = e ? "https://duckduckgo.com/?q="+encodeURI(e) : undefined;
        browser.tabs.create({
                url: query
        });
}


function gotBrowserInfo(info) {
  console.info((info.version).slice(0, info.version.indexOf(".")));
}

var gettingInfo = browser.runtime.getBrowserInfo();
gettingInfo.then(gotBrowserInfo);

// Experimental feature for Nightly
if (gettingInfo >= 57) {

}

/*
Feature that will have an always pinned "New Tab" page (like in the current servo builds) and automatically switch it when a user opens a New Tab page
* NOTE: BLOCKED TILL 'openerTabId' API is implemented

var fancyGobalVar;
var init = new Promise((resolve, reject) => {
        console.log('Initial');
        var test = browser.tabs.create({
                pinned: true,
                index: 1
        });
        test.then((e) => {fancyGobalVar = e.id;});
        // Maybe some more logic to remove all open new tab pages

    resolve();
})
.then(() => {
    browser.omnibox.onInputStarted.addListener(function(e) {console.log("SCREAM!")});

        browser.tabs.onCreated.addListener(fancy);

        function fancy(e) {
                var id = e.id;

                console.log(e);
                if (!e.openerTabId) {
                        console.log("New Tab Page!");
                        browser.tabs.remove(id);
                        browser.tabs.update(fancyGobalVar, {active: true});
                } else {
                        console.log("Link or something else clicked");
                }
        }
});
*/
