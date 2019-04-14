'use strict';

import { Sleep } from '../Utility';

import BaseSort from './BaseSort';
import View from '../View';
import Canvas from '../Canvas';

export default class Heap extends BaseSort
{
	constructor()
	{
		super();
		return;
	}

	init(sData)
	{
		super.init(sData, new Canvas(View.CanvasElementHeap));
		this.currentHeapIdx = 0;
		this.firstHeapIdx = 0;
		this.HeapLength = 20;

		this.HeapIndex = this.makeHeapArray(this.firstHeapIdx, this.HeapLength);
		
		return;
	}
	makeHeapArray(firstIdx, maxIdx)
	{
		let ret = [];
		let childIdx = firstIdx + 1;

		ret.push({parent: null, index: firstIdx, left:childIdx++, right:childIdx++});

		let pIdx = 0;
		for (let i = firstIdx + 1; i < maxIdx; i)
		{
			ret.push({parent: pIdx, index: i++, left: childIdx++, right: childIdx++});
			if(i+1 < maxIdx)
			{
				ret.push({parent: pIdx, index: i++, left: childIdx++, right: childIdx++});
				pIdx += 1;
			}
		}

		return ret.reverse();
	}
	draw()
	{
		super.draw();
		View.StepValueHeap = this.stepValue;

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
	getIndex(idx)
	{
		let ret = idx;
		if(this.data.isInOfBounds(ret) == false)
		{
			ret = -1;
		}

		return ret;
	}
	changeCurrent()
	{
		let data = this.data;
		let nextTarIdx = -1;
		let nextPivIdx = -1;

		let errCount = 0;
		let errCountLimit = 1000;
		do
		{
			let curHeap = this.HeapIndex[this.currentHeapIdx];
			let prevIdx = data.currentIdx;

			if(data.isInOfBounds(prevIdx) == false)
			{
				data.currentIdx = curHeap.index;
				nextTarIdx = data.targetIdx = this.getIndex(curHeap.left);
				nextPivIdx = data.pivotIdx = this.getIndex(curHeap.right);
				if(((nextTarIdx < 0) && (nextPivIdx < 0)) && this.HeapIndex.length == 1)
				{
					this.finish();
				}else
				{
					this.sorting();
				}
			}else
			{
				let nextHeapIdx = this.currentHeapIdx += 1;
	
				if(nextHeapIdx < this.HeapIndex.length)
				{
					let nextHeap = this.HeapIndex[nextHeapIdx];
	
					data.currentIdx = nextHeap.index;
					nextTarIdx = data.targetIdx = this.getIndex(nextHeap.left);
					nextPivIdx = data.pivotIdx = this.getIndex(nextHeap.right);
				}else
				{
					data.fixItem(this.HeapIndex[this.HeapIndex.length - 1].index);

					this.HeapIndex = this.makeHeapArray(this.firstHeapIdx++, this.HeapLength);

					data.currentIdx = -1;
					data.targetIdx = -1;
					data.pivotIdx = -1;
					this.currentHeapIdx = 0;
				}
				this.sorting();
			}

			if(errCount++ > errCountLimit)
			{
				throw '無限ループの可能性があるため、強制終了';
			}

		} while ((nextTarIdx < 0 && nextPivIdx < 0) && (this.isFinish == false));

		return;
	}
	sort()
	{
		let data = this.data;
		let curIdx = data.currentIdx;
		let tarIdx = data.targetIdx;
		let pivIdx = data.pivotIdx;
		let minIdx = Math.min(tarIdx, pivIdx);
		let maxIdx = Math.max(tarIdx, pivIdx);

		if(data.isInOfBounds(minIdx) == true)
		{
			if(data.isASC(minIdx, curIdx) == true)
			{
				if(data.swap(minIdx, curIdx) == true)
				{
					this.sorted();
				}
			}
		}
		if(data.isInOfBounds(maxIdx) == true)
		{
			if(data.isASC(maxIdx, curIdx) == true)
			{
				if(data.swap(maxIdx, curIdx) == true)
				{
					this.sorted();
				}
			}
		}

		return;
	}
}
