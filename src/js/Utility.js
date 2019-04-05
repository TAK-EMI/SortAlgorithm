'use strict';

// 文字列を経由することでオブジェクトのコピーを実現する。
export const CopyObject = (obj) =>
{
	let ret = obj;

	if(typeof obj === 'object')
	{
		ret = JSON.parse(JSON.stringify(obj));
	}

	return ret;
};

export const Sleep = (msec) =>
{
   return new Promise(function(resolve)
   {
      setTimeout(function() {resolve();}, msec);
   });
};


