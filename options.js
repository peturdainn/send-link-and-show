SendLinkAndShowOptions = { };


SendLinkAndShowOptions.OnOptionsPageSave = function(e)
{
	e.preventDefault();

	browser.storage.sync.set({
		config: document.querySelector("#config").value
	});

	browser.runtime.reload();
}

SendLinkAndShowOptions.OnOptionsPageLoaded = function()
{
	var storageItem = browser.storage.sync.get("config");
	storageItem.then((res) =>
	{
		document.querySelector("#config").value = res.config || "";
	});
}

document.addEventListener("DOMContentLoaded", SendLinkAndShowOptions.OnOptionsPageLoaded);
document.querySelector("form").addEventListener("submit", SendLinkAndShowOptions.OnOptionsPageSave);
