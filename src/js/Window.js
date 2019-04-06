'use strict';

import View from './View';
import SortData from './SortData';
import Bubble from './sort/Bubble';
import Selection from "./sort/Selection";

let bubble = new Bubble();
let select = new Selection();

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
	let interval = View.PlayInterval;

	bubble.play(interval);
	select.play(interval);

	View.hidePlayButton();
	View.showStopButton();

	return;
};
window.stop = () =>
{
	bubble.stop();
	select.stop();

	View.showPlayButton();
	View.hideStopButton();

	return;
};
window.reload = () =>
{
	window.init();
	return;
};
