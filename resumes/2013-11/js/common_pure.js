// JavaScript Document

define(function (require, exports, modules)
{
	
	modules.exports={
		
		domReady:	function (fn)
		{
			if(document.addEventListener)
			{
				document.addEventListener('DOMContentLoaded',function()
				{
					fn && fn();
				},false);
			}
			else
			{
				document.onreadystatechange=function()
				{
					if(document.readyState=='complete')
					{
						fn && fn();
					}
				};
			}
		},
		
		loadImg:	function (url, callBack)
		{
			var oImg=new Image();
			
			oImg.src=url;
			
			if(oImg.complete)
			{
				callBack&&callBack.call(oImg);
				
				return;
			}
			
			oImg.onload=function ()
			{
				oImg.onload=null;
				callBack&&callBack.call(oImg);
			};
			
			return;
		},
		
		
		bomb:	function (obj)
		{
			obj.style.background='white';
			
			var num=5;
			var aSpan=[];
			var aDisY=[];
			var aDisX=[];
			var oldLeft=obj.offsetLeft;
			var oldTop=obj.offsetTop;
			
			for(var i=0; i<num; i++)
			{
				var oSpan=document.createElement('span');
				oSpan.className='bomb';
				
				aSpan.push(oSpan);
				oSpan.style.left=obj.offsetLeft+'px';
				oSpan.style.top=obj.offsetTop+'px';
				oSpan.style.background='rgb('+modules.exports.rand_one(0, 255)+','+modules.exports.rand_one(0, 255)+','+modules.exports.rand_one(0, 255)+')';
				
				obj.offsetParent.appendChild(oSpan);
				
				aDisY.push(modules.exports.rand_one(-30, 10));
				aDisX.push(modules.exports.rand_one(0, 10));
			}
			for(var i=0; i<num; i++)
			{
				(function (index)
				{
					var speed_y=0;
					var speed_x=1;
					aSpan[index].bombTimer=setInterval(function ()
					{
						aSpan[index].style.left=aSpan[index].offsetLeft+aDisX[index]+speed_x+'px';
						aSpan[index].style.top=aSpan[index].offsetTop+aDisY[index]+speed_y+'px';
						speed_y+=2;
						
						if(aSpan[index].offsetTop>=document.documentElement.clientHeight-aSpan[index].offsetHeight)
						{
							clearInterval(aSpan[index].bombTimer);
							aSpan[index].parentNode.removeChild(aSpan[index]);
						}
					}, 30);
				})(i);
				
			}
		},
		
		crashed:	function (obj, speedX, speedY)//, up)
		{
			clearInterval(obj.timer);
			clearInterval(obj.crash_timer);
			
			obj.crash_timer=setInterval(function ()
			{
				obj.style.top=obj.offsetTop+(speedY+=4)+'px';
				obj.style.left=obj.offsetLeft+15+'px';//(speedX)+'px';
				
				if(modules.exports.getPos(obj).top>=document.documentElement.clientHeight-obj.offsetHeight||
				modules.exports.getPos(obj).left>=document.documentElement.clientWidth-obj.offsetWidth||modules.exports.getPos(obj).left<0)//modules.exports.getPos(obj).top<0||
				{
					clearInterval(obj.crash_timer);
					obj.parentNode.removeChild(obj);
				}
			}, 30);
		},
		
		scrollBar:	function (oBar, oWindow, oHigher)
		{
			oBar.offsetParent.style.height=oWindow.offsetHeight+'px';
			oBar.style.height=oWindow.offsetHeight*oWindow.offsetHeight/oHigher.offsetHeight+'px';
			
			if(window.navigator.userAgent.indexOf('Firefox')!=-1)
			{
				oWindow.addEventListener('DOMMouseScroll', function (ev)
				{
					var oEvent=ev||event;
					
					
					if(oEvent.detail<0)//上
					{
						var t=oBar.offsetTop-10;
						
					}
					else
					{
						var t=oBar.offsetTop+10;
					}
					t<0&&(t=0);
					
					(t>oWindow.offsetHeight-oBar.offsetHeight)&&(t=oWindow.offsetHeight-oBar.offsetHeight);
					
					oBar.style.top=t+'px';
					oHigher.style.bottom=-oHigher.offsetHeight*(oWindow.offsetHeight-oBar.offsetTop-oBar.offsetHeight)/oWindow.offsetHeight+'px';
					
				}, false);
			}
			else
			{
				oWindow.onmousewheel=function (ev)
				{
					
					var oEvent=ev||event;
					
					
					if(oEvent.wheelDelta>0)//上
					{
						var t=oBar.offsetTop-10;
					}
					else
					{
						var t=oBar.offsetTop+10;
					}
					t<0&&(t=0);
					(t>oWindow.offsetHeight-oBar.offsetHeight)&&(t=oWindow.offsetHeight-oBar.offsetHeight);
					
					oBar.style.top=t+'px';
					oHigher.style.bottom=-oHigher.offsetHeight*(oWindow.offsetHeight-oBar.offsetTop-oBar.offsetHeight)/oWindow.offsetHeight+'px';
					
				};
			}
			
			oBar.onmousedown=function (ev)
			{
				var oEvent=ev||event;
				
				var disY=oEvent.clientY-oBar.offsetTop;
				
				document.onmousemove=function (ev)
				{
					var oEvent=ev||event;
					
					var t=oEvent.clientY-disY;
					
					t<0&&(t=0);
					(t>oWindow.offsetHeight-oBar.offsetHeight)&&(t=oWindow.offsetHeight-oBar.offsetHeight);
					
					oBar.style.top=t+'px';
					
					oHigher.style.bottom=-oHigher.offsetHeight*(oWindow.offsetHeight-oBar.offsetTop-oBar.offsetHeight)/oWindow.offsetHeight+'px';
				};
				
				document.onmouseup=function ()
				{
					document.onmousemove=null;
					document.onmouseup=null;
				};
				
				
				
				return false;
			};
		},
		
		getByTag:	function (obj, sTag)
		{
			return obj.getElementsByTagName(sTag);
		},
		
		getById:	function (obj, sId)
		{
			return obj.getElementById(sId);
		},
		
		collTest:	function (obj1, obj2)
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
		},
		
		startMove:	function (obj, json, options)
					{	
						var getStyle=modules.exports.getStyle;	
						clearInterval(obj.timer);
						obj.timer=null;
						
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
								
								/*IE浏览器下getStyle(obj, name)结果为'auto'，而非'0px'*/
								/*if(obj.className=='navLine'&&(/MSIE/).test(window.navigator.userAgent.toUpperCase()))
								{
									obj.start[name]=0;
								}*/
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
										if(name=='zIndex')
										{
											obj.style[name]=obj.start[name]+cur;
										}
										else
										{
											obj.style[name]=obj.start[name]+cur+'px';
										}
									}
								}
								
								if(count==n)
								{
									clearInterval(obj.timer);
									obj.timer=null;
									options.end && options.end();
								}
							}, 30);
						}
					},
					
		drag:		function (obj)
		{
			var addEvent=modules.exports.addEvent;
			var remove=modules.exports.removeEvent;
			
			obj.disx=obj.disY=0;
			
			//var _this=this;
			obj.onmousedown=function (ev)
			{
				//modules.exports.drag.prototype.zIndex++;
				//obj.style.zIndex=modules.exports.drag.prototype.zIndex;
				
				var oEvent=ev||event;
				
				obj.disX=oEvent.clientX-obj.offsetLeft;
				obj.disY=oEvent.clientY-obj.offsetTop;
				addEvent(document, 'mousemove', mousemove);
				
				addEvent(document, 'mouseup', mouseup);
				return false;
			}
			
			function mousemove (ev)
			{
				var oEvent=ev||event;
				obj.style.left=oEvent.clientX-obj.disX+'px';
				obj.style.top=oEvent.clientY-obj.disY+'px';
			}
			
			function mouseup()
			{
				remove(document, 'mousemove', mousemove);
				remove(document, 'mouseup', mouseup);
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
								
								addEvent(document, 'mousemove', mousemove);	
								addEvent(document, 'mouseup', mouseup);
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
								remove(document, 'mousemove', mousemove);
								remove(document, 'mouseup', mouseup);
								
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
					
		niceShow:	function (json)
		{
			var aLi=json.oUl.children;
			var oUl=json.oUl;
			var oCen=json.oCen;
			var r=json.r;
			var n=json.n;
			var width=json.wholeWidth;
			
			modules.exports.changeStyle2Absolute(aLi);
			var oldWidth=aLi[0].offsetWidth;
			var oldHeight=aLi[0].offsetHeight;
			
			oUl.style.left=oCen.offsetWidth/2-(n*width+width/2)+'px';
			
			calSize(aLi);
			oUl.onmousedown=function (ev)
			{
				var oEvent=ev||event;
				
				var disX=oEvent.clientX-oUl.offsetLeft;
				
				oUl.onmousemove=function (ev)
				{
					var oEvent=ev||event;
					
					oUl.style.left=oEvent.clientX-disX+'px';
					
					calSize(aLi);
				};
				
				oUl.onmouseup=function ()
				{
					oUl.onmousemove=null;
					oUl.onmouseup=null;
				};
				
				return false;
			};
			
			
		
			function calSize(aLi)
			{
				for(var i=0; i<aLi.length; i++)
				{
					var scale=calScale({obj: aLi[i], oCen: oCen, r: r});
					
					var scale=scale<0.5?0.5:scale;
					
					aLi[i].innerHTML=scale.toFixed(2);
					
					aLi[i].style.opacity=(scale<0.2)?0:scale;
					aLi[i].style.filter='alpha(opacity:'+scale+')';
					aLi[i].style.zIndex=100*scale;
					aLi[i].style.width=2*oldWidth*scale+'px';
					aLi[i].style.height=2*oldHeight*scale+'px';
					aLi[i].style.marginLeft=-(aLi[i].offsetWidth-oldWidth)/2+'px';
					aLi[i].style.marginTop=-(aLi[i].offsetHeight-oldHeight)/2+'px';
				}
				
				function calScale(json)
				{
					var dis=Math.abs(modules.exports.getPos(json.obj).left+json.obj.offsetWidth/2-(modules.exports.getPos(json.oCen).left+json.oCen.offsetWidth/2));
					
					return 1-dis/json.r;			
				}
			}
		},
		
		isChild:	function (oParent, obj)
		{
			while(obj)
			{
				if(obj==oParent)
				{
					return true;
				}
				obj=obj.parentNode;
			}
			
			return false;
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
		
		rand_one:	function (n, m)
		{
			return parseInt(Math.random()*(m-n+1)+n);
		},			
		
		rand:	function (n, m)//[n, m]
				{
					var arr=[];
					
					var tmp=0;
					while(arr.length!=(m-n+1))
					{
						tmp=parseInt(Math.random()*(m+1-n)+n);
						
						if(!findArr(tmp, arr))
						{
							arr.push(tmp);
						}
					}
					
					function findArr(n, arr)
					{
						for(var i=0; i<arr.length; i++)
						{
							if(arr[i]==n)
								return true;
						}
						
						return false;
					}
					
					return arr;
				},
				
		jsonp:	function (url, data, fnSucc)
		{
			var oHead=document.getElementsByTagName('head')[0];
			
			var fnName='jsonp'+Math.random();
			fnName=fnName.replace('.', '');
			
			window[fnName]=function (json)
			{
				fnSucc(json);
				oHead.removeChild(oScript);
			};
			
			data.cb=fnName;
			
			var str=url+'?'+json2url(data);
			
			var oScript=document.createElement('script');
			oScript.src=str;
			oHead.appendChild(oScript);
			
			function json2url(json)
			{
				json.t=Math.random();
				
				var arr=[];
				
				for(var i in json)
				{
					arr.push(i+'='+json[i]);
				}
				
				return arr.join('&');
			}
		},
		
	}
});
