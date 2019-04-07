'use strict';

import View from './View';
import SortData from './SortData';
import Bubble from './sort/Bubble';
import Selection from './sort/Selection';
import Insertion from './sort/Insertion';
import Heap from './sort/Heap';
import Merge from './sort/Merge';
import Quick from './sort/Quick';

let AlgorithmList = {
	'Bubble': new Bubble(),
	'Selection': new Selection(),
	'Insertion': new Insertion(),
	'Heap': new Heap(),
	'Merge': new Merge(),
	'Quick': new Quick(),
};

let isPlay = false;
let timerID = null;

async function OnPlay()
{
	let interval = View.PlayInterval;
	let finished = false;
	isPlay = true;
	while(isPlay)
	{
		let finishedBubble = AlgorithmList['Bubble'].playStep(interval);
		let finishedSelection = AlgorithmList['Selection'].playStep(interval);
		let finishedInsertion = AlgorithmList['Insertion'].playStep(interval);

		if(((await finishedBubble)
		&& (await finishedSelection)
		&& (await finishedInsertion)
			) == true)
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
	for (const key in AlgorithmList)
	{
		AlgorithmList[key].init(sData.copy());
	}

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
	window.stop();
	window.init();
	return;
};
