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

	draw()
	{
		this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.drawSortItem(0, 0);
		this.drawSortItem(1, 1);
		this.drawSortItem(2, 2);
		this.drawSortItem(3, 3);
		this.drawSortItem(4, 4);
		this.drawSortItem(5, 5);
		this.drawSortItem(6, 6);
		this.drawSortItem(7, 7);
		this.drawSortItem(8, 8);
		this.drawSortItem(9, 9);

		this.drawSortItem(10, 10);
		this.drawSortItem(11, 11);
		this.drawSortItem(12, 12);
		this.drawSortItem(13, 13);
		this.drawSortItem(14, 14);
		this.drawSortItem(15, 15);
		this.drawSortItem(16, 16);
		this.drawSortItem(17, 17);
		this.drawSortItem(18, 18);
		this.drawSortItem(19, 19);

		this.drawCurrentItem(10);

		return;
	}
	drawCurrentItem(idx)
	{
		let ctx = this.context;
		ctx.fillStyle = '#FF000055';
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
