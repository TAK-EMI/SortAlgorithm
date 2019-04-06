'use strict';

import { Sleep } from '../Utility';

import BaseSort from './BaseSort';
import View from '../View';
import Canvas from '../Canvas';

export default class Bubble extends BaseSort
{
	constructor()
	{
		super();
	}

	init(sData)
	{
		super.init(sData, new Canvas(View.CanvasElementBubble));

		return;
	}

	draw()
	{
		super.draw();
		View.StepValueBubble = this.stepValue;

		return;
	}

	playStep(interval)
	{
		return new Promise(async(resolve, reject) =>
		{
			try
			{
				if(this.isFinish == false)
				{
					this.changeCurrent();
					this.draw();
					await Sleep(interval);
		
					this.selectTarget();
					this.draw();
					await Sleep(interval);
				
					this.sort();
					this.draw();
					await Sleep(interval);

					this.stepUp();
				}
		
				resolve(this.isFinish);
			} catch (error)
			{
				console.error(error);
				reject(true);
			}
		});
	}

	changeCurrent()
	{
		let data = this.data;

		data.currentIdx += 1;

		if(data.isLastWithCurrent == true)
		{
			if(this.isSorting == true)
			{
				this.finish();
			}else
			{
				data.currentIdx = 0;
				this.sorting();
			}
		}

		data.targetIdx = -1;

		return;
	}
	selectTarget()
	{
		let data = this.data;

		if(data.currentIdx >= 0)
		{
			data.targetIdx = data.currentIdx + 1;
		}

		return;
	}
	sort()
	{
		let data = this.data;
		let array = data.array;
		let curIdx = data.currentIdx;
		let targetIdx = data.targetIdx;

		if(array[curIdx] > array[targetIdx])
		{
			if(data.swap(curIdx, targetIdx) == true)
			{
				this.sorted();
			}
		}

		return;
	}
}
