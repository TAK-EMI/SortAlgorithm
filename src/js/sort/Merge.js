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
		this.currentSplit1 = 0;
		this.currentSplit2 = 1;

		this.data.currentIdx = 0;
		this.splitArray = this.makeSplitArray(this.currentSplitLength);

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

		return ret;
	}
	changeCurrent()
	{
		let data = this.data;
		// data.currentIdx++;

		let split1 = this.currentSplit1;
		let split2 = this.currentSplit2;
		let split = this.splitArray;

		console.log(`current[${data.currentIdx}], split01[${split1}], split02[${split2}], length[${this.currentSplitLength}], split:${JSON.stringify(split)}`);

		if((split1 < 0 || split[split1].length == 0) && (split2 < 0 || !split[split2] || split[split2].length == 0))
		{
			split.shift();
			split.shift();

			if(split.length < 2)
			{
				if(this.currentSplitLength >= data.Length)
				{
					this.finish();
					return;
				}
				split = this.splitArray = this.makeSplitArray(this.currentSplitLength *= 2);
			}

			split1 = this.currentSplit1 = 0;
			split2 = this.currentSplit2 = 1;

			data.currentIdx = data.targetIdx = split[split1][0];
			if(split[split2])
			{
				data.pivotIdx = split[split2][0];
			}else
			{
				data.pivotIdx = -1;
			}
			console.log(`001: ${split1}, ${split2}`);
			
		}else if((split1 >= 0 && split[split1].length != 0) || (split2 >= 0 && split[split2].length != 0))
		{
			data.targetIdx = -1;
			data.pivotIdx = -1;

			if(split[split1] && split[split1].length != 0)
			{
				data.targetIdx = split[split1][0];
			}else
			{
				split1 = this.currentSplit1 = -1;
			}

			if(split[split2] && split[split2].length != 0)
			{
				data.pivotIdx = split[split2][0];
			}else
			{
				split2 = this.currentSplit2 = -1;
			}
			console.log(`002: ${split1}, ${split2}`);
		}else
		{
			data.targetIdx = split[split1][0];
			if(split[split2])
			{
				data.pivotIdx = split[split2][0];
			}
			console.log(`003: ${split1}, ${split2}`);
		}

		return;
	}
	sort()
	{
		if(this.isFinish)
		{
			return;
		}

		let data = this.data;
		let array = data.array;
		let curIdx = data.currentIdx;
		let split = this.splitArray;

		let sArray = this.sortPart(split[this.currentSplit1], split[this.currentSplit2]);

		let idx = -1;
		for (const i in sArray)
		{
			idx = Number(i);
			array[curIdx + idx] = sArray[idx];
		}

		return;
	}
	sortPart(split1, split2)
	{
		let array = this.data.array;
		let ret = [];
		while(split1.length > 0 || split2.length > 0)
		{

			if(split1.length > 0 && split2.length > 0)
			{
				if(array[split1[0]] < array[split2[0]])
				{
					ret.push(array[split1[0]]);
					split1.shift();
				}else
				{
					ret.push(array[split2[0]]);
					split2.shift();
				}
			}else
			{
				if(split1[0])
				{
					ret.push(array[split1[0]]);
					split1.shift();
				}else
				{
					ret.push(array[split2[0]]);
					split2.shift();
				}
			}
		}

		return ret;
	}
}