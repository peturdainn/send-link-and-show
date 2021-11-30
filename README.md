# Send Link and Show
A Firefox extension to send links via customizable context-menu-entries as GET requests and show the response in a new tab.

## Why?
I was working on a self-hosted reader mode tool (text scraper) and needed a simple way to send links to my tool and show the output in a new tab

## Installation
Install directly from AMO: https://addons.mozilla.org/de/firefox/addon/send-link-and-show

## Usage
It will add a context menu entry for each service you configure in the context menu of links - clicking such an entry will execute a GET request to the configured URL while replacing `%%u` with the clicked URL, and open a new tab to display the response.

## Configuration
Pairs of labels and URLs, separated by a "|", each pair on a new line. Minimum one pair. "%%u" (without the quotes) will be replaced by the URL that was clicked. Everything before the "|" will be used as the context menu label.

Example:

Entry1|https://example.com?url=%%u<br>
Entry2|https://example.com?url=%%u

## License
The MIT License (MIT)

## Icon
The icon was hand-picked by @bagder from https://pixabay.com/vectors/monster-cute-beast-animal-funny-4271569/

