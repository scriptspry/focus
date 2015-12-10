import React from 'react';
import ReactDOM from 'react-dom';
import url from 'url';
import FocusContainer from './containers/FocusContainer';
import checkShouldBlock from './utils/checkShouldBlock';

let mounted = false;
const checker = checkShouldBlock(url.parse(window.location.href))

chrome.storage.sync.get('state', data => {
	const shouldBlockSite = checker(data.state.websites.items);
	const date = data.state.timer.date;

	if (date && date > Date.now() && shouldBlockSite && !mounted) {
		mountBlocker(data.state);
	}

	chrome.extension.onMessage.addListener(function(msg) {	// Listen for results
		if (msg.type === 'STATE_UPDATE') {
			const date = msg.data.timer.date;
			if (date && date > Date.now() && shouldBlockSite && !mounted) {
				mountBlocker(msg.data);
			}
			if (!date && mounted) {
				dismountBlocker();
			}
		}
	});
});


function mountBlocker(state) {
	// set up mount point
	const body = document.body ? document.body : document.createElement('body');
	const mountPoint = document.createElement('div');
	mountPoint.id = 'mount-point';
	mountPoint.style.cssText = 'color:black;position:fixed;width:100%;height:100%;background-color:green;top:0px;left:0px;z-index:10000;'
	body.appendChild(mountPoint);
	document.getElementsByTagName('html')[0].appendChild(body);

	ReactDOM.render(
		<FocusContainer state={state} />,
	  document.getElementById('mount-point')
	);

	mounted = true;
}

function dismountBlocker() {
	// const body = document.body ? document.body : document.createElement('body');
	const mountPoint = document.getElementById('mount-point');

	mountPoint.parentNode.removeChild(mountPoint);
	mounted = false;
}