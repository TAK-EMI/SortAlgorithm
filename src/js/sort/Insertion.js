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
		for (const value of fixArray) {
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
		let prevIdx = data.currentIdx;

		if(this.isSorting == true)
		{
			if(data.isAllFixed == true)
			{
				this.finish();
			}else
			{
				let nextIdx = data.currentIdx = this.FixedMaximumIndex + 1;

				if(data.isInOfBounds(nextIdx) == true)
				{
					if(prevIdx !== nextIdx)
					{
						data.targetIdx = nextIdx -1;
					}else
					{
						let nextTarget = data.targetIdx -= 1;
						if(data.isInOfBounds(nextTarget) == false)
						{
							data.fixItem(data.currentIdx);
						}
					}
				}else
				{
					this.finish();
				}
			}
		}else if(this.isSorted == true)
		{
			let nextIdx = data.currentIdx = data.targetIdx;

			if(data.isFirst(nextIdx) == true)
			{
				data.fixItem(nextIdx);
				nextIdx = data.currentIdx = this.FixedMaximumIndex + 1;
			}
			if(data.isInOfBounds(nextIdx - 1) == true)
			{
				data.targetIdx = nextIdx - 1;
				this.sorting();
			}else
			{
				this.finish();
			}
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