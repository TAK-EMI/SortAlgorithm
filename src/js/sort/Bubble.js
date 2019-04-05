'use strict';

import { Sleep } from '../Utility';

import View from '../View';
import Canvas from '../Canvas';

const EnumStatus = {
	Sorting: 0,
	Sorted: 1,
	Finish: 2,
};

export default class Bubble
{
	get Step()
	{
		return this.stepValue;
	}

	init(sData)
	{
		this.canvas = new Canvas(View.CanvasElement_Bubble);

		this.data = sData;
		this.state = EnumStatus.Sorting;
		this.isPlay = false;
		this.stepValue = 0;

		this.draw();

		return;
	}

	async play(interval)
	{
		this.isPlay = true;

		setTimeout(async() => {
			while(this.isPlay)
			{
				await this.step(interval);
				await Sleep(interval);
				if(this.state == EnumStatus.Finish)
				{
					this.isPlay = false;
				}
			}
		}, 0);

		return;
	}
	async step(interval)
	{
		this.changeCurrent();
		this.draw();
	
		await Sleep(interval);
	
		this.selectTarget();
		this.draw();
	
		await Sleep(interval);
	
		this.sort();
		this.draw();

		this.stepValue += 1;

		return;
	}

	draw()
	{
		this.canvas.draw(this.data);
		View.StepBubble = this.stepValue;
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
	isFinish()
	{
		return (this.state === EnumStatus.Finish);
	}
}
