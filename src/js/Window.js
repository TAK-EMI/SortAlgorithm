'use strict';

import View from './View';
import SortData from './SortData';
import Bubble from './sort/Bubble';
import Selection from "./sort/Selection";

let bubble = new Bubble();
let select = new Selection();

let isPlay = false;
let timerID = null;

window.init = () =>
{
	let sData = new SortData.createRandom(20, 20);
	bubble.init(sData.copy());
	select.init(sData.copy());

	View.showPlayButton();
	View.hideStopButton();

	return;
};

window.play = () =>
{
	View.hidePlayButton();
	View.showStopButton();

	timerID = setTimeout(async () => {
		let interval = View.PlayInterval;
		isPlay = true;
		while(isPlay)
		{
			let finishedBubble = bubble.playStep(interval);
			let finishedSelection = select.playStep(interval);

			if(((await finishedBubble) && (await finishedSelection)) == true)
			{
				isPlay = false;
			}
		}
		window.stop();
	}, 0);

	return;
};
window.stop = () =>
{
	isPlay = false;
	if(timerID !== null)
	{
		clearTimeout(timerID);
		timerID = null;
	}

	View.showPlayButton();
	View.hideStopButton();

	return;
};
window.reload = () =>
{
	window.init();
	return;
};
