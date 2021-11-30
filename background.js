SendLinkAndShow = { };

SendLinkAndShow.InitContextMenu = function()
{
	browser.contextMenus.create(
	{
		id: "send-link-and-show-parent",
		type: "normal",
		title: "Send Link and Show",
		contexts: ["link"]
	});

	var storageItem = browser.storage.sync.get("config");
	storageItem.then((res) =>
	{
		var config = res.config || "";
		config = config.split("\n");

		if (config.length === 0 || (config.length === 1 && config[0].length === 0))
		{
			browser.contextMenus.create(
			{
				id: "send-link-and-show-invalid",
				parentId: "send-link-and-show-parent",
				type: "normal",
				title: "Invalid or no config, please check settings"
			});
		}
		else
		{
			config.forEach(function(item)
			{
				var itemTitle = item;
				var itemLink = item;
				if (item.indexOf("|") !== -1)
				{
					var itemParts = item.split("|");
					itemTitle = itemParts[0];
					itemLink = itemParts[1];
				}

				browser.contextMenus.create(
				{
					parentId: "send-link-and-show-parent",
					type: "normal",
					title: itemTitle,
					onclick: (e) => SendLinkAndShow.ExecuteSendLinkAndShow(e.linkUrl, itemLink)
				});
			});
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
