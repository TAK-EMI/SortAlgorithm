'use strict';

import { Sleep } from '../Utility';

import BaseSort, {EnumStatus} from './BaseSort';
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

	async playStep(interval)
	{
		this.changeCurrent();
		this.draw();
	
		await Sleep(interval);
	
		this.selectTarget();
		this.draw();
	
		await Sleep(interval);
	
		this.sort();
		this.draw();

		this.stepUp();

		return;
	}

	changeCurrent()
	{
		let data = this.data;

		data.currentIdx += 1;

		if(data.currentIdx == data.array.length - 1)
		{
			if(this.state == EnumStatus.Sorting)
			{
				data.currentIdx = -1;
				this.state = EnumStatus.Finish;
			}else
			{
				data.currentIdx = 0;
				this.state = EnumStatus.Sorting;
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
		let aLength = array.length;
		let curIdx = data.currentIdx;
		let targetIdx = data.targetIdx;

		if((0 <= curIdx && aLength > curIdx) && (0 <= targetIdx && aLength > targetIdx))
		{
			if(array[curIdx] > array[targetIdx])
			{
				let w = array[curIdx];
				array[curIdx] = array[targetIdx];
				array[targetIdx] = w;

				this.state = EnumStatus.Sorted;
			}
		}

		return;
	}
}
