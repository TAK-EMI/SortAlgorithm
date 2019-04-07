'use strict';

import { Sleep } from '../Utility';

import BaseSort from './BaseSort';
import View from '../View';
import Canvas from '../Canvas';

export default class Merge extends BaseSort
{
	constructor()
	{
		super();
		return;
	}

	init(sData)
	{
		super.init(sData, new Canvas(View.CanvasElementMerge));
		this.data.fixItem(0);

		return;
	}
	draw()
	{
		super.draw();
		View.StepValueMerge = this.stepValue;

		return;
	}
	playStep(interval)
	{
		return new Promise(async (resolve) =>
		{
			if(this.isFinish == false)
			{
				await this.changeCurrent();
				this.draw();
				await Sleep(interval);
		
				await this.sort();
				this.draw();
				await Sleep(interval);
			
				this.stepUp();
			}
	
			resolve(this.isFinish);
		});
	}
	changeCurrent()
	{
		return;
	}
	sort()
	{
		return;
	}
}