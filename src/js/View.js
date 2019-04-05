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

	static showPlayButton()
	{
		this.showElementInline('btn_play');
		return;
	}
	static hidePlayButton()
	{
		this.hideElement('btn_play');
		return;
	}
	static showStopButton()
	{
		this.showElementInline('btn_stop');
		return;
	}
	static hideStopButton()
	{
		this.hideElement('btn_stop');
		return;
	}

	static showElementInline(id)
	{
		let el = document.getElementById(id);
		if(el)
		{
			el.style.display = 'inline';
		}

		return;
	}
	static hideElement(id)
	{
		let el = document.getElementById(id);
		if(el)
		{
			el.style.display = 'none';
		}
		return;
	}
}