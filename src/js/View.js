'use strict';

export default class View
{
	static get PlayInterval()
	{
		return document.getElementById('interval').value;
	}
	static get CanvasElementBubble()
	{
		return document.getElementById('canvas_bubble');
	}
	static get CanvasElementSelection()
	{
		return document.getElementById('canvas_selection');
	}
	static get CanvasElementInsertion()
	{
		return document.getElementById('canvas_insertion');
	}
	static get CanvasElementHeap()
	{
		return document.getElementById('canvas_heap');
	}
	static get CanvasElementMerge()
	{
		return document.getElementById('canvas_merge');
	}
	static get CanvasElementQuick()
	{
		return document.getElementById('canvas_quick');
	}

	static set StepValueBubble(step)
	{
		let elDiv = document.getElementById('step_bubble');
		elDiv.innerHTML = `${step}Step`;

		return;
	}
	static set StepValueSelection(step)
	{
		let elDiv = document.getElementById('step_selection');
		elDiv.innerHTML = `${step}Step`;

		return;
	}
	static set StepValueInsertion(step)
	{
		let elDiv = document.getElementById('step_insertion');
		elDiv.innerHTML = `${step}Step`;

		return;
	}
	static set StepValueHeap(step)
	{
		let elDiv = document.getElementById('step_heap');
		elDiv.innerHTML = `${step}Step`;

		return;
	}
	static set StepValueMerge(step)
	{
		let elDiv = document.getElementById('step_merge');
		elDiv.innerHTML = `${step}Step`;

		return;
	}
	static set StepValueQuick(step)
	{
		let elDiv = document.getElementById('step_quick');
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