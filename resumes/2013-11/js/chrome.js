// JavaScript Document

define(function (require, exports, modules)
{
	modules.exports={
	startMove:	function (obj, json, options)
	{	
						var getStyle=modules.exports.getStyle;	
						clearInterval(obj.timer);
						//obj.timer=null;
						
						options=options||{};
						options.time=options.time||700;
						options.type=options.type||'buffer';
						
						var n=parseInt(options.time/30);
						var count=0;
						
						obj.start={};
						obj.dis={};
						
						for(var name in json)
						{
							if(name=='opacity')
							{
								obj.start[name]=Math.round(parseFloat(getStyle(obj, name)*100));
							}
							else
							{
								
								obj.start[name]=parseInt(getStyle(obj, name));
							}
							
							obj.dis[name]=json[name]-obj.start[name];
						}
						
						//if(!obj.timer)
						{
							obj.timer=setInterval(function ()
							{
								count++;
								
								for(var name in json)
								{
									switch(options.type)
									{
										case 'linear':
											var cur=count*obj.dis[name]/n;
											break;
										case 'buffer':
											var a=1-count/n;
											var scale=1-a*a*a;
											var cur=obj.dis[name]*scale;
											break;
									}
									
									if(name=='opacity')
									{
										obj.style.opacity=(obj.start[name]+cur)/100;
										obj.style.filter='alpha(opacity:'+(obj.start[name]+cur)+')';
									}
									else
									{
										obj.style[name]=obj.start[name]+cur+'px';
									}
								}
								
								if(count==n)
								{
									clearInterval(obj.timer);
							//		obj.timer=null;
									
									options.end && options.end();
								}
							}, 30);
						}
					},
				
	chrome:		function (aLi)
				{
						var aPos=[];
						
						for(var j=0; j<aLi.length; j++)
						{
							aLi[j].style.zIndex=0;
							aPos.push({	left: 	aLi[j].offsetLeft,
										top:	aLi[j].offsetTop	
									});
							aLi[j].index=j;
						}
						
						//console.table(aPos);
						modules.exports.changeStyle2Absolute(aLi);
						
						var zIndex=0;
						
						function getCenDis(obj1, obj2)
						{
							var a=obj1.offsetLeft-aPos[obj2.index].left;
							var b=obj1.offsetTop-aPos[obj2.index].top;
							
							return Math.sqrt(a*a+b*b);
						}
						
						function findNearest(obj)
						{
							var MIN=999999999;
							var minIndex=-1;
					
							for(var i=0; i<aLi.length; i++)
							{
								if(collTest(obj, aLi[i]))
								{
									var dis=getCenDis(obj, aLi[i]);
									
									if(dis<MIN)
									{
										MIN=dis;
										minIndex=i;
									}
								}
								//aDis.push(getCenDis(obj, aLi[i]));
							}
							
							if(minIndex==-1)
							{
								return null;
							}
							else
							{
								return aLi[minIndex];
							}
						}
						
						function collTest(obj1, obj2)
						{
							var getPos=modules.exports.getPos;
							
							var l1=getPos(obj1).left;
							var t1=getPos(obj1).top;
							var r1=getPos(obj1).left+obj1.offsetWidth;
							var b1=getPos(obj1).top+obj1.offsetHeight;
							
							var l2=getPos(obj2).left;
							var t2=getPos(obj2).top;
							var r2=getPos(obj2).left+obj2.offsetWidth;
							var b2=getPos(obj2).top+obj2.offsetHeight;
							
							if(l1>r2||t1>b2||r1<l2||b1<t2)
							{
								return false;
							}
							else
							{
								return true;
							}
						}
						
						function drag(obj)
						{						
							var addEvent=modules.exports.addEvent;
							var remove=modules.exports.removeEvent;
							
							obj.disx=obj.disY=0;
							
							obj.onmousedown=function (ev)
							{
								zIndex++;
								obj.style.zIndex=zIndex;
								
								var oEvent=ev||event;
								
								obj.disX=oEvent.clientX-obj.offsetLeft;
								obj.disY=oEvent.clientY-obj.offsetTop;
								
								if(obj.setCapture)
								{
									if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
									{
										addEvent(document, 'mousemove', mousemove);	
										addEvent(document, 'mouseup', mouseup);
									}
									else
									{
										obj.onmousemove=mousemove;
										obj.onmouseup=mouseup;
										
										obj.setCapture();
									}
								}
								else
								{
									addEvent(document, 'mousemove', mousemove);	
									addEvent(document, 'mouseup', mouseup);
								}
									
								return false;
							}
							
							function mousemove (ev)
							{
								var oEvent=ev||event;
								
								var l=oEvent.clientX-obj.disX;
								var t=oEvent.clientY-obj.disY;
								
								
								var oNear=findNearest(obj);
								
								if(oNear && oNear!=obj)
								{	
									var m=obj.index;
									var n=oNear.index;
									
									if(m<n)
									{
										for(var i=0; i<aLi.length; i++)
										{
											if(aLi[i].index>=m+1&&aLi[i].index<=n)
											{
												aLi[i].index--;
											
												modules.exports.startMove(aLi[i], aPos[aLi[i].index]);
											}
										}
										obj.index=n;
									}
									else
									{
										for(var i=0; i<aLi.length; i++)
										{
											if(aLi[i].index>=n&&aLi[i].index<=m-1)
											{
												aLi[i].index++;
											
												modules.exports.startMove(aLi[i], aPos[aLi[i].index]);
											}
										}
										
										obj.index=n;
									}
									/*
									modules.exports.startMove(oNear, aPos[obj.index]);
									//交换
									var tmp=obj.index;
									obj.index=oNear.index;
									oNear.index=tmp;*/
								}
								if(l<0)
								{
									l=0;
								}
								else if(l>obj.offsetParent.offsetWidth-obj.offsetWidth)
								{
									//l=obj.offsetParent.offsetWidth-obj.offsetWidth;
									//console.log(obj.offsetParent.offsetWidth-obj.offsetWidth);
								}
								
								if(t<0)
								{
									t=0;
								}
								else if(t>obj.offsetParent.offsetHeight-obj.offsetHeight)
								{
									t=obj.offsetParent.offsetHeight-obj.offsetHeight;
								}
								
								obj.style.left=l+'px';
								obj.style.top=t+'px';
							};
							
							function mouseup()
							{
								if(obj.setCapture)
								{
									if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
									{
										remove(document, 'mousemove', mousemove);
										remove(document, 'mouseup', mouseup);
									}
									else
									{
										obj.onmousemove=null;
										obj.onmouseup=null;
										
										obj.releaseCapture();
									}
								}
								else
								{
									remove(document, 'mousemove', mousemove);
									remove(document, 'mouseup', mouseup);
								}
								
								modules.exports.startMove(obj, aPos[obj.index]);
							}
						}
						
						for(var i=0; i<aLi.length; i++)
						{
							drag(aLi[i]);
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
		
	removeEvent:	function (obj, sEv, fn)
	{
		if(obj.detachEvent)
		{
			obj.detachEvent('on'+sEv,fn);
		}
		else
		{
			obj.removeEventListener(sEv,fn,false);
		}
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
		
		changeStyle2Absolute:	function (aLi)
		{
			for(var j=0; j<aLi.length; j++)
			{
				aLi[j].style.left=aLi[j].offsetLeft+'px';
				aLi[j].style.top=aLi[j].offsetTop+'px';
				
			}
			for(var j=0; j<aLi.length; j++)
			{
				aLi[j].style.position='absolute';
				aLi[j].style.margin=0;
			}
		},			
		getStyle:	function (obj, name)
					{
						return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
					},
			
		setStyle3:	function (obj, name, value)
					{
						var bigName=name.charAt(0).toUpperCase()+name.substring(1);
						
						obj.style['Webkit'+bigName]=value;
						obj.style['Moz'+bigName]=value;
						obj.style['ms'+bigName]=value;
						obj.style['O'+bigName]=value;
						obj.style[name]=value;
					},	
		
		
		
		getPos:		function (obj)
					{
						var l=t=0;
						
						while(obj)
						{
							l+=obj.offsetLeft;
							t+=obj.offsetTop;
							
							obj=obj.offsetParent;
						}
						
						return {left: l, top: t};
					},
					
		getRelativeDis:	function (obj1, obj2)
					{
						var l=t=0;
						
						while(obj1!=obj2)
						{
							l+=obj1.offsetLeft;
							t+=obj1.offsetTop;
							
							obj1=obj1.offsetParent;
						}
						
						return {left: l, top: t};
					},
					
		getCenDis:	function (obj1, obj2)
					{
		
						return Math.sqrt(a*a+b*b);
					},
		};
});