'use strict';

export default class SortData
{
	static createRandom(arrayLength, valueLength)
	{
		let obj = new SortData();

		let store = [];
		for (let i = 0; i < valueLength; i++)
		{
			store.push(i);
		}

		for (let i = 0; i < arrayLength; i++)
		{
			let idx = Math.floor(Math.random() * store.length);

			obj.array[i] = store[idx];

			store.splice(idx, 1);
		}

		return obj;
	}
	static copy(sData)
	{
		let obj = new SortData();
		obj.array = sData.array.slice();
		obj.currentIdx = sData.currentIdx;
		obj.targetIdx = sData.targetIdx;
		obj.pivotIdx = sData.pivotIdx;

		return obj;
	}

	get Length()
	{
		return this.array.length;
	}
	// targetIdxが最後のアイテムを指しているかどうか
	get isLastWithTarget()
	{
		return this.isLast(this.targetIdx);
	}
	// currentIdxが最後のアイテムを指しているかどうか
	get isLastWithCurrent()
	{
		return this.isLast(this.currentIdx);
	}

	constructor()
	{
		this.array = [];
		this.currentIdx = -1;
		this.targetIdx = -1;
		this.pivotIdx = -1;

		return;
	}

	copy()
	{
		return SortData.copy(this);
	}
	isInOfBounds(idx)
	{
		return (0 <= idx && idx < this.Length);
	}
	isLast(idx)
	{
		return (idx == (this.Length - 1));
	}
}