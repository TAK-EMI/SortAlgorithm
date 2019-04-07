'use strict';

import { Sleep } from '../Utility';

import BaseSort from './BaseSort';
import View from '../View';
import Canvas from '../Canvas';

export default class Insertion extends BaseSort
{
	get FixedMaximumIndex()
	{
		let fixArray = this.data.fixArray;
		let ret = 0;
		for (const value of fixArray)
		{
			if(value == false)
			{
				ret = fixArray.indexOf(value) - 1;
				break;
			}
		}

		return ret;
	}

	constructor()
	{
		super();
		return;
	}

	init(sData)
	{
		super.init(sData, new Canvas(View.CanvasElementInsertion));
		this.data.fixItem(0);

		return;
	}
	draw()
	{
		super.draw();
		View.StepValueInsertion = this.stepValue;

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
		let data = this.data;

		if(data.isAllFixed == true)
		{
			this.finish();
		}else
		{
			if(data.isFirst(data.targetIdx) == true)
			{
				data.fixItem(data.targetIdx);
			}

			let nextIdx = -1;
			if(this.isSorting == true)
			{
				nextIdx = data.currentIdx = this.FixedMaximumIndex + 1;
			}else if(this.isSorted == true)
			{
				nextIdx = data.currentIdx = data.targetIdx;
			}
			data.targetIdx = nextIdx - 1;
			this.sorting();
		}

		return;
	}
	sort()
	{
		let data = this.data;
		let curIdx = data.currentIdx;
		let targetIdx = data.targetIdx;

		if(data.isInOfBounds(curIdx, targetIdx) == true)
		{
			if(data.isASC(curIdx, targetIdx) == true)
			{
				if(data.swap(targetIdx, curIdx) == true)
				{
					data.swapFixed(targetIdx, curIdx);
					this.sorted();
				}
			}else
			{
				data.fixItem(curIdx);
			}
		}

		return;
	}
}