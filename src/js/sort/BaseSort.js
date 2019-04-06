'use strict';

import { Sleep } from '../Utility';

export const EnumStatus = {
	Sorting: 0,
	Sorted: 1,
	Finish: 2,
};

export default class BaseSort
{
	get Step()
	{
		return this.stepValue;
	}
	get isFinish()
	{
		return (this.state === EnumStatus.Finish);
	}
	get isSorting()
	{
		return (this.state === EnumStatus.Sorting);
	}

	constructor()
	{
		this.canvas = null;
		this.data = null;

		this.state = EnumStatus.Sorting;
		this.isPlay = false;
		this.stepValue = 0;

		return;
	}

	init(sData, canvas)
	{
		this.data = sData;
		this.state = EnumStatus.Sorting;
		this.isPlay = false;
		this.stepValue = 0;

		this.canvas = canvas;

		this.draw();

		return;
	}

	stop()
	{
		this.isPlay = false;
		return;
	}
	async play(interval)
	{
		this.isPlay = true;

		setTimeout(async() => {
			while(this.isPlay)
			{
				await this.playStep(interval);
				await Sleep(interval);
				if(this.state == EnumStatus.Finish)
				{
					this.isPlay = false;
				}
			}
		}, 0);

		return;
	}
	async playStep(_interval)
	{
		return;
	}
	stepUp()
	{
		this.stepValue += 1;
		return;
	}
	sorting()
	{
		this.state = EnumStatus.Sorting;
		return;
	}
	sorted()
	{
		this.state = EnumStatus.Sorted;
		return;
	}
	finish()
	{
		this.state = EnumStatus.Finish;

		let data = this.data;
		data.currentIdx = -1;
		data.targetIdx = -1;
		data.pivotIdx = -1;

		return;
	}

	draw()
	{
		this.canvas.draw(this.data);
		return;
	}

	changeCurrent()
	{
		return;
	}
	selectTarget()
	{
		return;
	}
	selectPivot()
	{
		return;
	}
	sort()
	{
		return;
	}
}

