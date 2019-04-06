'use strict';

import BaseSort from './BaseSort';
import View from '../View';
import Canvas from '../Canvas';
import { Sleep } from '../Utility';

export default class Slection extends BaseSort
{
	constructor()
	{
		super();
	}

	init(sData)
	{
		super.init(sData, new Canvas(View.CanvasElementSelection));

		let data = this.data;
		data.currentIdx = -1;
		data.pivotIdx = 0;
		data.targetIdx = 0;

		return;
	}
	draw()
	{
		super.draw();
		View.StepValueSelection = this.stepValue;

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
		
				await this.selectPivot();
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
		let data = this.data;

		if(data.isLastWithCurrent == true)
		{
			if(data.isLastWithTarget == true)
			{
				this.finish();
			}else
			{
				let target = data.targetIdx;
				target += 1;
				data.pivotIdx = target;
				data.currentIdx = target;
				data.targetIdx = target;

				this.sorting();
			}
		}else
		{
			data.currentIdx += 1;
		}

		return;
	}
	selectPivot()
	{
		let data = this.data;
		let pivot = data.pivotIdx;
		let cur = data.currentIdx;

		if(data.isInOfBounds(pivot, cur) == true)
		{
			if(data.isASC(cur, pivot) == true)
			{
				data.pivotIdx = cur;
			}
		}

		return;
	}
	sort()
	{
		let data = this.data;
		let pivot = data.pivotIdx;
		let target = data.targetIdx;

		if(data.isLastWithCurrent == true && target != pivot)
		{
			if(data.isASC(pivot, target) == true)
			{
				if(data.swap(pivot, target) == true)
				{
					this.sorted();
				}
			}
		}

		return;
	}
}
