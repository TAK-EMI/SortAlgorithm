'use strict';

export default class View
{
	static get PlayInterval()
	{
		return document.getElementById('interval').value;
	}
	static get CanvasElement_Bubble()
	{
		return document.getElementById('canvas_bubble');
	}

	static set StepBubble(step)
	{
		let elDiv = document.getElementById('step_bubble');

		elDiv.innerHTML = `${step}Step`;

		return;
	}
}