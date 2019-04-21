// JavaScript Document

define(function (require, exports, module)
{
	var Chrome=require('chrome.js');
	var Common=require('common_pure.js');
	
	module.exports={
	websiteAct:	function ()
	{
		var getByClass=module.exports.getByClass;
		var addEvent=module.exports.addEvent;
		
		var oWebsite=getByClass(document.getElementById('home'), 'fullWebsite')[0];
		
		var oWebsiteList=getByClass(oWebsite, 'websiteList')[0];
		
		oWebsiteList.style.height=oWebsiteList.offsetHeight+'px';
		oWebsiteList.style.marginTop=-oWebsiteList.offsetHeight/2+'px';
		
		var aItem=getByClass(oWebsiteList, 'li');
		
		for(var i=0; i<aItem.length; i++)
		{
			(function (index)
			{
				addEvent(aItem[i], 'mouseover', function ()
				{
					Common.startMove(aItem[index].children[0], { height:aItem[index].offsetHeight, lineHeight: aItem[index].offsetHeight}, {time: 300});
				});
				
				addEvent(aItem[i], 'mouseout', function ()
				{
					Common.startMove(aItem[index].children[0], { height:30, lineHeight: 30}, {time: 300});
				});
				
				//aItem[index].downTime=0;
				addEvent(aItem[i], 'mousedown', function ()
				{
					var oDate=new Date();
					aItem[index].downTime=oDate.getTime();
					
				});
				
				addEvent(aItem[i], 'mouseup', function ()
				{
					var oDate=new Date();
					if((oDate.getTime()-aItem[index].downTime)<100)
					{
						switch(index)
						{
							case 0:
								//document.title=index;
								break;
							case 1:
								//document.title=index;
								break;
							case 2:
								//document.title=index;
								break;
							case 3:
								//document.title=index;
								break;
						}
					}
					
				});
				/*addEvent(aItem[i], 'click', function ()
				{
					switch(index)
					{
						case 0:
							break;
						case 1:
							break;
						case 2:
							break;
						case 3:
							break;
					}
				});*/
			})(i);
			
		}
		
		Chrome.chrome(aItem);
	},
	
	getByClass:	function (obj, sClass)
	{
		if(obj.getElementsByClassName)
		{
			return obj.getElementsByClassName(sClass);
		}
		else
		{
			var aEle=obj.getElementsByTagName('*');
			
			var re=new RegExp('\\b'+sClass+'\\b');
			
			var aResult=[];
			
			for(var i=0; i<aEle.length; i++)
			{
				if(re.test(aEle[i].className))
				{
					aResult.push(aEle[i]);
				}
			}
			
			return aResult;
		}
	},
	
	addEvent:	function (obj, sEv, fn)
	{
		if(obj.attachEvent)
		{
			obj.attachEvent('on'+sEv, fn);
		}
		else
		{
			obj.addEventListener(sEv, fn, false);
		}
	},
	
	}
});