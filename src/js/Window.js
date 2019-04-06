'use strict';

import View from './View';
import SortData from './SortData';
import Bubble from './sort/Bubble';
import Selection from "./sort/Selection";

let bubble = new Bubble();
let select = new Selection();

let isPlay = false;
let timerID = null;

async function OnPlay()
{
	let interval = View.PlayInterval;
	let finished = false;
	isPlay = true;
	while(isPlay)
	{
		let finishedBubble = bubble.playStep(interval);
		let finishedSelection = select.playStep(interval);

		if(((await finishedBubble) && (await finishedSelection)) == true)
		{
			finished = true;
			isPlay = false;
		}
	}
	window.stop();
	if(finished == true)
	{
		View.hidePlayButton();
		View.hideStopButton();
	}
	return;
}

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
		OnPlay();
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
