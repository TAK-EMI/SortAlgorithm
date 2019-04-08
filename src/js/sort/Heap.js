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

		this.HeapIndex = [
			{ parent:null, index:0, left:1, right:2 },
			{ parent:0, index:1, left:3, right:4 },
			{ parent:0, index:2, left:5, right:6 },
			{ parent:1, index:3, left:7, right:8 },
			{ parent:1, index:4, left:9, right:10 },
			{ parent:2, index:5, left:11, right:12 },
			{ parent:2, index:6, left:13, right:14 },
			{ parent:3, index:7, left:15, right:16 },
			{ parent:3, index:8, left:17, right:18 },
			{ parent:4, index:9, left:19, right: null },
			{ parent:4, index:10, left:null, right: null },
			{ parent:5, index:11, left:null, right: null },
			{ parent:5, index:12, left:null, right: null },
			{ parent:6, index:13, left:null, right: null },
			{ parent:6, index:14, left:null, right: null },
			{ parent:7, index:15, left:null, right: null },
			{ parent:7, index:16, left:null, right: null },
			{ parent:8, index:17, left:null, right: null },
			{ parent:8, index:18, left:null, right: null },
			{ parent:9, index:19, left:null, right: null },
		];
		
		return;
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
		let ret = -1;
		if(idx != null && (0 <= idx && idx < this.HeapIndex.length))
		{
			ret = this.HeapIndex[idx].index;
			if(this.data.isInOfBounds(ret) == false)
			{
				ret = -1;
			}
		}

		return ret;
	}
	changeCurrent()
	{
		let data = this.data;
		let nextTarIdx = -1;
		let nextPivIdx = -1;

		do
		{
			if(data.isAllFixed == true)
			{
				this.finish();
			}else
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
				}else if(this.isSorted && curHeap.parent != null)
				{
					let nextHeapIdx = this.currentHeapIdx = curHeap.parent;
					let nextHeap = this.HeapIndex[nextHeapIdx];
		
					data.currentIdx = nextHeap.index;
					nextTarIdx = data.targetIdx = this.getIndex(nextHeap.left);
					nextPivIdx = data.pivotIdx = this.getIndex(nextHeap.right);
		
					this.sorting();
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
						data.fixItem(this.HeapIndex[0].index);
						this.HeapIndex.pop();
						if(this.HeapIndex.length == 0)
						{
							this.finish();
						}else
						{
							for (const node of this.HeapIndex)
							{
								node.index += 1;
							}
							data.currentIdx = -1;
							data.targetIdx = -1;
							data.pivotIdx = -1;
							this.currentHeapIdx = 0;
						}
					}
					this.sorting();
				}
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
