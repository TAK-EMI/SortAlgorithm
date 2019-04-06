'use strict';

import BaseSort from "./BaseSort";
import View from '../View';
import Canvas from '../Canvas';

export default class Slection extends BaseSort
{
	constructor()
	{
		super();
	}

	init(sData)
	{
		super.init(sData, new Canvas(View.CanvasElementSelection));

		return;
	}
}
