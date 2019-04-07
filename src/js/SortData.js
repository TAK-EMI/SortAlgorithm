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
			obj.fixArray[i] = false;

			store.splice(idx, 1);
		}

		return obj;
	}
	static copy(sData)
	{
		let obj = new SortData();
		obj.array = sData.array.slice();
		obj.fixArray = sData.fixArray.slice();
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
	get isFixedWithCurrent()
	{
		return this.isFixed(this.currentIdx);
	}
	get isAllFixed()
	{
		let ret = true;
		let fixed = this.fixArray;
		for (const ite of fixed)
		{
			if(ite == false)
			{
				ret = false;
				break;
			}
		}

		return ret;
	}

	constructor()
	{
		this.array = [];
		this.fixArray = [];
		this.currentIdx = -1;
		this.targetIdx = -1;
		this.pivotIdx = -1;

		return;
	}

	copy()
	{
		return SortData.copy(this);
	}
	isInOfBounds(...idxList)
	{
		let ret = true;
		idxList.forEach(idx =>
		{
			if((0 <= idx && idx < this.Length) == false)
			{
				ret = false;
			}
		});

		return ret;
	}
	isLast(idx)
	{
		return (idx === (this.Length - 1));
	}
	isFirst(idx)
	{
		return (idx === 0);
	}
	clearFixedArray()
	{
		let fixed = this.fixArray;
		for (let i = 0; i < fixed.length; i++)
		{
			fixed[i] = false;
		}
		return;
	}
	isFixed(idx)
	{
		return this.fixArray[idx];
	}
	fixItem(idx)
	{
		this.fixArray[idx] = true;
		return;
	}
	swap(idx1, idx2)
	{
		let ret = false;
		let array = this.array;

		if(this.isInOfBounds(idx1, idx2) == true)
		{
			let w = array[idx1];
			array[idx1] = array[idx2];
			array[idx2] = w;

			ret = true;
		}

		return ret;
	}
	swapFixed(idx1, idx2)
	{
		let ret = false;
		let fixArray = this.fixArray;

		if(this.isInOfBounds(idx1, idx2) == true)
		{
			let w = fixArray[idx1];
			fixArray[idx1] = fixArray[idx2];
			fixArray[idx2] = w;

			ret = true;
		}

		return ret;
	}
	// 昇順
	isASC(idx1, idx2)
	{
		let array = this.array;

		if(this.isInOfBounds(idx1, idx2) == false)
		{
			throw `Index Out Of Bounds. ArrayLength[${this.Length}], idx1[${idx1}], idx2[${idx2}]`;
		}
		return (array[idx1] < array[idx2]);
	}
	// 降順
	isDESC(idx1, idx2)
	{
		let array = this.array;

		if(this.isInOfBounds(idx1, idx2) == false)
		{
			throw `Index Out Of Bounds. ArrayLength[${this.Length}], idx1[${idx1}], idx2[${idx2}]`;
		}
		return (array[idx1] > array[idx2]);
	}
	// 以上
	isOrMore(idx1, idx2)
	{
		let array = this.array;

		if(this.isInOfBounds(idx1, idx2) == false)
		{
			throw `Index Out Of Bounds. ArrayLength[${this.Length}], idx1[${idx1}], idx2[${idx2}]`;
		}
		return (array[idx1] <= array[idx2]);
	}
	// 以下
	isOrLess(idx1, idx2)
	{
		let array = this.array;

		if(this.isInOfBounds(idx1, idx2) == false)
		{
			throw `Index Out Of Bounds. ArrayLength[${this.Length}], idx1[${idx1}], idx2[${idx2}]`;
		}
		return (array[idx1] >= array[idx2]);
	}
}