// JavaScript Document

define(function (require, exports, module)
{
	var Chrome=require('chrome.js');
	var Common=require('common_pure.js');
	
	module.exports={
		
		actions:	function (oBox)
		{		
			var aWorkItem=Common.getByClass(oBox, 'workItem');
			Chrome.chrome(aWorkItem);
		},
		};
});