SendLinkAndShow = { };

function onCreated() {
  if (browser.runtime.lastError) {
    console.log("SendLinkAndShow Error: " + browser.runtime.lastError);
  } else {
    //console.log("SendLinkAndShow OK");
  }
}

SendLinkAndShow.InitContextMenu = function()
{
	var storageItem = browser.storage.sync.get("config");
	
	storageItem.then((res) =>
	{
        var created_menu = 0;
		var config = res.config || "";
		config = config.split("\n");

		if (config.length === 0 || (config.length === 1 && config[0].length === 0))
		{
		    // no valid config
		    created_menu = 0;
            //console.log("SendLinkAndShow config empty");
		}
		else if (config.length === 1)
		{
            // one entry: don't make a submenu but add it directly		
			var itemTitle = config[0];
			var itemLink = config[0];

			if (config[0].indexOf("|") !== -1)
			{
                var itemParts = config[0].split("|");
                itemTitle = itemParts[0];
                itemLink = itemParts[1];

	            browser.contextMenus.create(
	            {
                    id: "send-link-and-show-parent",
                    type: "normal",
                    contexts: ["link"],
                    title: "Send Link and Show: " + itemTitle,
                    onclick: (e) => SendLinkAndShow.ExecuteSendLinkAndShow(e.linkUrl, itemLink)
	            }, onCreated);
	            created_menu = 1;
	        }
		}
		else
		{
			config.forEach(function(item)
			{
				var itemTitle = item;
				var itemLink = item;

				if (item.indexOf("|") !== -1)
				{
				    // probably a valid entry, add it
					var itemParts = item.split("|");
					itemTitle = itemParts[0];
					itemLink = itemParts[1];

                    if (created_menu === 0)
                    {
                        // first time we add a menu!
	                    browser.contextMenus.create(
	                    {
		                    id: "send-link-and-show-parent",
		                    type: "normal",
		                    title: "Send Link and Show",
		                    contexts: ["link"]
	                    }, onCreated);
        	            created_menu = 1;
                    }
                    
				    browser.contextMenus.create(
				    {
					    parentId: "send-link-and-show-parent",
					    type: "normal",
					    title: itemTitle,
					    onclick: (e) => SendLinkAndShow.ExecuteSendLinkAndShow(e.linkUrl, itemLink)
				    }, onCreated);
				}
			});
		}
		
        if( created_menu === 0)
        {	
	        browser.contextMenus.create(
	        {
		        id: "send-link-and-show-parent",
		        type: "normal",
		        title: "Send Link and Show",
		        contexts: ["link"]
	        }, onCreated);
		    browser.contextMenus.create(
		    {
			    id: "send-link-and-show-invalid",
			    parentId: "send-link-and-show-parent",
			    type: "normal",
			    title: "Invalid or no config, please check settings"
		    }, onCreated);
        }	
	});
}

SendLinkAndShow.ExecuteSendLinkAndShow = function(link, destinationUrl)
{
    var url = destinationUrl.replace("%%u", encodeURIComponent(link));
    
    browser.tabs.create({
        "url": url
    });
}

SendLinkAndShow.InitContextMenu();
