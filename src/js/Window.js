'use strict';

import View from './View';
import SortData from './SortData';
import Bubble from './sort/Bubble';

let bubble = new Bubble();

window.init = () =>
{
	let sData = new SortData.createRandom(20, 20);

	bubble.init(sData.copy());

	return;
};

window.play = () =>
{
	bubble.play(View.PlayInterval);

	return;
};

window.getBubbleStep = () =>
{
	return;
};
