'use strict';

import View from '../View';
import Canvas from '../Canvas';

export default class Bubble
{
	init()
	{
		this.canvas = new Canvas(View.CanvasElement_Bubble);
		this.canvas.draw();

		return;
	}
}
