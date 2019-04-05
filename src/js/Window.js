'use strict';

import View from './View';
import SortData from './SortData';
import Bubble from './sort/Bubble';

let bubble = new Bubble();

window.init = () =>
{
	let sData = new SortData.createRandom(20, 20);
	bubble.init(sData.copy());

	View.showPlayButton();
	View.hideStopButton();

	return;
};

window.play = () =>
{
	bubble.play(View.PlayInterval);

	View.hidePlayButton();
	View.showStopButton();

	return;
};
window.stop = () =>
{
	bubble.stop();

	View.showPlayButton();
	View.hideStopButton();

	return;
};
window.reload = () =>
{
	window.init();
	return;
};
