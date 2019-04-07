'use strict';

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
	get isSorted()
	{
		return (this.state == EnumStatus.Sorted);
	}

	constructor()
	{
		this.canvas = null;
		this.data = null;

		this.state = EnumStatus.Sorting;
		this.stepValue = 0;

		return;
	}

	init(sData, canvas)
	{
		this.data = sData;
		this.state = EnumStatus.Sorting;
		this.stepValue = 0;

		this.canvas = canvas;

		this.draw();

		return;
	}

	playStep(_interval)
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

		data.clearFixedArray();

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


