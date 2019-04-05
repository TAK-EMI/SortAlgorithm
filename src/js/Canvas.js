'use strict';

const SORT_ITEM_WIDTH = 15;
const SORT_ITEM_HEIGHT_STEP = SORT_ITEM_WIDTH;

export default class Canvas
{
	constructor(canvas)
	{
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;

		return;
	}

	clear()
	{
		let ctx = this.context;
		ctx.fillStyle = '#000000';

		let cW = this.canvasWidth;
		let cH = this.canvasHeight;

		ctx.fillRect(0, 0, cW, cH);

		ctx.strokeStyle = '#555555';
		let y = 1;
		while ((y * SORT_ITEM_HEIGHT_STEP) < cH)
		{
			this.drawLine(0, y * SORT_ITEM_HEIGHT_STEP, cW, y * SORT_ITEM_HEIGHT_STEP);
			y += 1;
		}

		return;
	}
	draw(sData)
	{
		this.clear();

		let array = sData.array;
		for (let i = 0; i < array.length; i++)
		{
			this.drawSortItem(i, array[i]);
		}

		this.drawCurrentItem(sData.currentIdx);
		this.drawTargetItem(sData.targetIdx);

		return;
	}
	drawCurrentItem(idx)
	{
		let ctx = this.context;
		ctx.fillStyle = '#FF000055';
		this.drawFillRect(SORT_ITEM_WIDTH * idx, 0, SORT_ITEM_WIDTH, this.canvasHeight);

		return;
	}
	drawTargetItem(idx)
	{
		let ctx = this.context;
		ctx.fillStyle = '#0000FF55';
		this.drawFillRect(SORT_ITEM_WIDTH * idx, 0, SORT_ITEM_WIDTH, this.canvasHeight);

		return;
	}
	drawSortItem(idx, height)
	{
		let ctx = this.context;
		ctx.fillStyle = 'white';
		this.drawFillRect(SORT_ITEM_WIDTH * idx, 0, SORT_ITEM_WIDTH, height * SORT_ITEM_HEIGHT_STEP);

		ctx.strokeStyle = 'gray';
		this.drawStrokeRect(SORT_ITEM_WIDTH * idx, 0, SORT_ITEM_WIDTH, height * SORT_ITEM_HEIGHT_STEP);

		return;
	}
	drawLine(x1, y1, x2, y2)
	{
		let ctx = this.context;

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);

		ctx.stroke();

		return;
	}
	drawFillRect(x, y, w, h)
	{
		let ctx = this.context;
		let cH = this.canvasHeight;

		ctx.fillRect(x, cH - h, w, h);

		return;
	}
	drawStrokeRect(x, y, w, h)
	{
		let ctx = this.context;
		let cH = this.canvasHeight;

		ctx.strokeRect(x, cH - h, w, h);

		return;
	}
}
