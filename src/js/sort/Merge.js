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

		this.currentSplitLength = 1;

		this.data.currentIdx = 0;
		this.splitArray = this.makeSplitArray(this.currentSplitLength);
		this.mergedArray = [];

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
	makeSplitArray(splitLength)
	{
		let data = this.data;
		let length = data.Length;
		let ret = [];

		let idx = 0;
		let split = null;
		while (idx < length)
		{
			split = [];
			for (let i = 0; i < splitLength; ++i)
			{
				split.push(idx++);
				if(idx >= length)
					break;
			}
			ret.push(split);
		}

		this.currentSplitLength = splitLength;

		return ret;
	}
	changeCurrent()
	{
		let data = this.data;
		let split = this.splitArray;

		if((split[0].length == 0) && (split[1].length == 0))
		{
			this.updateArray();

			split.shift();
			split.shift();

			if(split.length < 2)
			{
				let byLength = this.currentSplitLength * 2;
				if(byLength >= data.Length)
				{
					this.finish();
					return;
				}
				split = this.splitArray = this.makeSplitArray(byLength);
			}

			data.currentIdx = split[0][0];
		}else
		{
			data.targetIdx = split[0][0];
			data.pivotIdx = split[1][0];
		}

		return;
	}
	updateArray()
	{
		let data = this.data;
		let curIdx = data.currentIdx;
		let array = data.array;
		let merged = this.mergedArray;
		let idx = -1;
		for (const i in merged)
		{
			idx = Number(i);
			array[curIdx + idx] = merged[idx];
		}
		this.mergedArray = [];
		return;
	}
	sort()
	{
		if(this.isFinish)
		{
			return;
		}

		let split = this.splitArray;
		let split1 = split[0];
		let split2 = split[1];
		
		let array = this.data.array;
		if(split1.length > 0 && split2.length > 0)
		{
			if(array[split1[0]] < array[split2[0]])
			{
				this.mergedArray.push(array[split1[0]]);
				split1.shift();
			}else
			{
				this.mergedArray.push(array[split2[0]]);
				split2.shift();
			}
		}else
		{
			if(split1[0] != null)
			{
				this.mergedArray.push(array[split1[0]]);
				split1.shift();
			}else
			{
				this.mergedArray.push(array[split2[0]]);
				split2.shift();
			}
		}

		return;
	}
}