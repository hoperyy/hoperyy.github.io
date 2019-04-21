// JavaScript Document

define(function (require, exports, module)
{
	var Chrome=require('chrome.js');
	var Common=require('common_pure.js');
	
	var Objects=function ()
	{
		this.oHome=document.getElementById('home');
		this.oShowWindow=Common.getByClass(this.oHome, 'showWindow')[0];
		this.oModularBg=document.getElementById('modularBg');
		this.oMdCont=Common.getByClass(this.oHome, 'mdCont')[0];
		this.oModular=Common.getByClass(this.oHome, 'modular')[0];
		
	};
	
	
	module.exports={
		
		modularAct:	function ()
		{
			var objects=new Objects();
			
			
			var aItemName=[
							'手风琴效果',
							'CSS3时钟',
							'chrome首页效果',
							'鼠标跟随效果',
							'日历',
							'可拖拽大小的弹出层',
							'自定义滚动条',
							'百度搜索',
							'apple菜单',
							'弹性导航',
							'弹性运动',
							'无缝滚动'
						];
						
			var aItemCont=[
							'HTML+CSS+JS实现的手风琴效果',
							'CSS3实现的时钟',
							'HTML+CSS+JS实现，试试拖拽吧',
							'简单的JS',
							'组件化的日历, HTML+CSS+JS实现',
							'拖拽右下角及四条边均可改变层的大小',
							'JS实现, 可滚动、拖拽、长按上下方向键滚动',
							'通过AJAX获取百度词条联想列表显示, 搜搜看',
							'苹果菜单展示效果',
							'JS实现的弹性导航效果',
							'JS实现的弹性运动和碰撞, 拖拽后再松开试试',
							'无缝滚动效果，HTML+CSS+JS实现'
			];
			
			var innerHTML=[
						[
							'<div class="accordion_0">'+
							'<ul>'+
							'	<li class="active">'+
							'	<img src="/images/modular/accordion_0/bg0.jpg" alt="" />'+
							'		<span class="bg0">这是第一个</span>'+
							'	</li>'+
							'	<li>'+
							'	<img src="/images/modular/accordion_0/bg1.jpg" alt="" />'+
							'		<span class="bg1">这是第二个</span>'+
							'	</li>'+
							'	<li>'+
							'	<img src="/images/modular/accordion_0/bg2.jpg" alt="" />'+
							'		<span class="bg2">这是第三个</span>'+
							'	</li>'+
							'	<li>'+
							'	<img src="/images/modular/accordion_0/bg3.jpg" alt="" />'+
							'		<span class="bg3">这是第四个</span>'+
							'	</li>'+
							'	<li>'+
							'	<img src="/images/modular/accordion_0/bg4.jpg" alt="" />'+
							'		<span class="bg4">这是第五个</span>'+
							'	</li>'+
							'	<li>'+
							'	<img src="/images/modular/accordion_0/bg5.jpg" alt="" />'+
							'		<span class="bg5">这是第六个</span>'+
							'	</li>'+
							'</ul>'+
							'</div>'
						],
						
						[
							'<div class="clock_1">'+
							'	<span class="hour"></span>'+
							'	<span class="min"></span>'+
							'	<span class="sec"></span>'+
								
							'	<span class="cen"></span>'+
							'</div>'
						],
						
						//chrome
						[
							'<ul class="chrome_2"></ul>'
						],
						
						//鼠标跟随
						[
							'<ul class="mousemove_3">'+
							'	<li><img src="/images/modular/accordion_0/bg4.jpg"><p>小狗狗</p></li>'+
							'	<li><img src="/images/modular/accordion_0/bg5.jpg"><p>萌兔们</p></li>'+
							'</ul>'
						],
						
						//日历
						[
							'<div class="calendar_4">'+
							'<input type="text" _calendar="true" value="点击">'+
							'<input type="text" _calendar="true" value="点击">'+
							'</div>'
						],
						
						//拖拽九宫格
						[
							'<div class="DRAG_RESIZE_5">'+
							'	<div class="CORNER tl"></div>'+
							'	<div class="MBAR t"></div>'+
							'	<div class="CORNER tr"></div>'+
							'	<div class="l"></div>'+
							'	<div class="mm"></div>'+
							'	<div class="r"></div>'+
							'	<div class="CORNER bl"></div>'+
							'	<div class="MBAR b"></div>'+
							'	<div class="CORNER br"></div>'+
							'</div>'
						],
						
						//自定义滚动条
						[
							'<div class="scrollBar_6">'+
							'	<div class="scroll_contBox">'+
							'		<div class="scroll_cont">'+
							'<h3>致橡树</h3><br />'+
							'我如果爱你——<br />'+
							'绝不像攀援的凌霄花，<br />'+
							'借你的高枝炫耀自己；<br />'+
							'我如果爱你——<br />'+
							'绝不学痴情的鸟儿，<br />'+
							'为绿荫重复单调的歌曲；<br />'+
							'也不止像泉源，<br />'+
							'常年送来清凉的慰藉；<br />'+
							'也不止像险峰，<br />'+
							'增加你的高度，衬托你的威仪。<br />'+
							'甚至日光，<br />'+
							'甚至春雨。<br />'+
							'不，这些都还不够！<br />'+
							'我必须是你近旁的一株木棉，<br />'+
							'作为树的形象和你站在一起。<br />'+
							'根，紧握在地下；<br />'+
							'叶，相触在云里。<br />'+
							'每一阵风过，<br />'+
							'我们都互相致意，<br />'+
							'但没有人，<br />'+
							'听懂我们的言语。<br />'+
							'你有你的铜枝铁干，<br />'+
							'像刀，像剑，<br />'+
							'也像戟；<br />'+
							'我有我红硕的花朵，<br />'+
							'像沉重的叹息，<br />'+
							'又像英勇的火炬。<br />'+
							'我们分担寒潮、风雷、霹雳；<br />'+
							'我们共享雾霭、流岚、虹霓。<br />'+
							'仿佛永远分离，<br />'+
							'却又终身相依。<br />'+
							'这才是伟大的爱情，<br />'+
							'坚贞就在这里：<br />'+
							'爱——<br />'+
							'不仅爱你伟岸的身躯，<br />'+
							'也爱你坚持的位置，<br />'+
							'脚下的土地。<br />'+
							'</div>'+
							'	</div>'+
							'	<div class="scroll_barBox">'+
							'		<div class="scroll_up">↑</div>'+
							'		<div class="scroll_bar"></div>'+
							'		<div class="scroll_down">↓</div>'+
							'	</div>'+
							'</div>'
						],
						
						//百度联想
						[
							'<div class="associate_7">'+
							'<input type="text" class="search" />'+
							'<ul class="resultUl"></ul>'+
							'</div>'
						],
						
						//苹果展示
						[
							'<div class="apple_8">'+
							'	<img src="/images/modular/apple_8/1.png" width="64" />'+
							'	<img src="/images/modular/apple_8/2.png" width="64" />'+
							'	<img src="/images/modular/apple_8/3.png" width="64" />'+
							'	<img src="/images/modular/apple_8/4.png" width="64" />'+
							'</div>'
						],
						
						//弹性导航
						[
							'<ul class="flex_nav_9">'+
							'	<li>首页</li>'+
							'	<li>作品</li>'+
							'	<li>联系</li>'+
							'	<li>关于</li>'+
							'	<li class="flex_nav_box"></li>'+
							'</ul>'
						],
						
						//弹性运动
						[
							'<div class="flex_move_10">'+
							'<div class="flex_move_box"></div>'+
							'</div>'
						],
						
						//无缝滚动
						[
							'<div class="nogaprun_10" id="play">'+
							'<p class="nogaprun_prev">&laquo;</p>'+
							'<p class="nogaprun_next">&raquo;</p>'+
							'<ol>'+
							'	<li class="active">1</li>'+
							'	<li>2</li>'+
							'	<li>3</li>'+
							'	<li>4</li>'+
							'	<li>5</li>'+
							'</ol>'+
							'<ul>'+
							'	<li><a href="javascript:;"><img src="/images/modular/accordion_0/bg0.jpg" alt="广告一" /></a></li>'+
							'	<li><a href="javascript:;"><img src="/images/modular/accordion_0/bg1.jpg" alt="广告二" /></a></li>'+
							'	<li><a href="javascript:;"><img src="/images/modular/accordion_0/bg2.jpg" alt="广告三" /></a></li>'+
							'	<li><a href="javascript:;"><img src="/images/modular/accordion_0/bg3.jpg" alt="广告四" /></a></li>'+
							'	<li><a href="javascript:;"><img src="/images/modular/accordion_0/bg4.jpg" alt="广告五" /></a></li>'+
							'</ul>'+
							'</div>'
						]
						
			];
			
			var aClear=[
			];
			
			
			var imgSrc=[
					'/images/modular/accordion_0/showImg.png',
					'/images/modular/clock_1/showImg.png',
					'/images/modular/chrome_2/showImg.png',
					'/images/modular/mousemove_3/showImg.png',
					'/images/modular/calendar_4/showImg.png',
					'/images/modular/drag_resize_5/showImg.png',
					'/images/modular/scrollBar_6/showImg.png',
					'/images/modular/associate_7/showImg.png',
					'/images/modular/apple_8/showImg.png',
					'/images/modular/flex_nav_9/showImg.png',
					'/images/modular/flex_move_10/showImg.png',
					'/images/modular/nogaprun_11/showImg.png',
			];
			
			var fns=[
			
					//手风琴
					function ()
					{
						var oDiv=Common.getByClass(document, 'accordion_0')[0];
						var aLi=oDiv.getElementsByTagName('li');
					
						var timer=null;
						
						if(!oDiv.functioned)
						{
							oDiv.functioned=true;
							
							for(var i=0; i<aLi.length; i++)
							{
								aLi[i].onmouseover=function ()
								{
									var _this=this;
									
									clearInterval(timer);
									timer=setInterval(function ()
									{
										var sum=0;
										//其他的变小
										for(var i=0; i<aLi.length; i++)
										{
											if(aLi[i]!=_this)
											{
												var speed=(22-aLi[i].offsetWidth)/9;
												speed=speed>0?Math.ceil(speed):Math.floor(speed);
												
												aLi[i].style.width=aLi[i].offsetWidth+speed+'px';
												sum+=aLi[i].offsetWidth;
												
											}
										}
										
										//当前的变大
										_this.style.width=400-sum+'px';
										
										if(_this.offsetWidth==0)
										{
											clearInterval(timer);
										}
									}, 30);
									
								};
							}
						}
						
					
					}
					,
					
					//CSS3时钟
					function ()
					{	
						var oClock=Common.getByClass(document, 'clock_1')[0];
						
						var oHour=Common.getByClass(oClock, 'hour')[0];
						var oMin=Common.getByClass(oClock, 'min')[0];
						var oSec=Common.getByClass(oClock, 'sec')[0];
						var arr=[oHour, oMin, oSec];
						var timer=null;
						
						if(!oClock.functioned)
						{
							oClock.functioned=true;
							
							for(var i=0; i<arr.length; i++)
							{
								setOrigin3(arr[i], 'center bottom');
							}
							
							change();
							timer=setInterval(change, 30);
						
							aClear.push(timer);
							
							
							for(var i=0; i<60; i++)
							{
								var oSpan=document.createElement('span');
								
								if(i%5)
								{
									oSpan.className='small';
								}
								else
								{
									if(i==0)
									{
										oSpan.innerHTML='<em>'+12+'<\/em>';
									}
									else
									{
										oSpan.innerHTML='<em>'+i/5+'<\/em>';
									}
									
									oSpan.className='big';
									setStyle3(oSpan.children[0], 'transform', 'rotate('+(-i*6)+'deg)');
								}
								
								oClock.appendChild(oSpan);
								
								setStyle3(oSpan, 'transform', 'rotate('+i*6+'deg)');
								
								setOrigin3(oSpan, 'center 150px');
							}
							
						}
						else
						{
							change();
							timer=setInterval(change, 30);
						
							aClear.push(timer);
						}
						
						function setOrigin3 (obj, value)
						{
							obj.style['WebkitTransformOrigin']=value;
							obj.style['MozTransformOrigin']=value;
							obj.style['msTransformOrigin']=value;
							obj.style['OTransformOrigin']=value;
							obj.style['transformOrigin']=value;
						}
						
						function change()
						{
							var oDate=new Date();
							
							var timeSec=oDate.getSeconds()+oDate.getMilliseconds()/1000;
							var timeMin=oDate.getMinutes()+timeSec/60;
							var timeHour=oDate.getHours()+timeMin/60;
							
							setStyle3(oHour, 'transform', 'rotate('+timeHour*30+'deg)');
							setStyle3(oMin, 'transform', 'rotate('+timeMin*6+'deg)');
							setStyle3(oSec, 'transform', 'rotate('+timeSec*6+'deg)');
							
						}
						
						function setStyle3(obj, name, value)
						{
							var bigName=name.charAt(0).toUpperCase()+name.substring(1);
							
							obj.style['Webkit'+bigName]=value;
							obj.style['Moz'+bigName]=value;
							obj.style['ms'+bigName]=value;
							obj.style['O'+bigName]=value;
							obj.style[name]=value;
						}
					},
					
					//chrome效果
					function ()
					{
						var oBox=Common.getByClass(document, 'chrome_2')[0];
						if(!oBox.functioned)
						{
							oBox.functioned=true;
							
							var aLi=[];
						
						
							var num=16;
							
							
							for(var i=0; i<num; i++)
							{
								var oLi=document.createElement('li');
								oLi.innerHTML=i;
								oBox.appendChild(oLi);
							}
							
							aLi=oBox.children;
							Common.chrome(aLi);
							}
					},
					
					//鼠标跟随
					function ()
					{
						var oBox=Common.getByClass(document, 'mousemove_3')[0];
						
						var aLi=oBox.children;
						var aP=[];
						
						if(!oBox.functioned)
						{
							oBox.functioned=true;
							
							for(var i=0; i<aLi.length; i++)
							{
								aP.push(aLi[i].getElementsByTagName('p')[0]);
							}
							for(var i=0; i<aP.length; i++)
							{
								(function (index)
								{
									Common.addEvent(aLi[i], 'mousemove', function (ev)
									{
										var oEvent=ev||event;
										
										aP[index].style.left=oEvent.clientX-Common.getPos(aLi[index]).left+'px';
										aP[index].style.top=oEvent.clientY-Common.getPos(aLi[index]).top-aP[index].offsetHeight+'px';
										
									});
									
									Common.addEvent(aLi[i], 'mouseover', function (ev)
									{
										var oEvent=ev||event;
										var from=oEvent.fromElement||oEvent.relatedTarget;
										
										if(Common.isChild(aLi[index], from))
										{
											return;
										}
										
										aP[index].style.display='block';
										
									});
									Common.addEvent(aLi[i], 'mouseout', function (ev)
									{
										var oEvent=ev||event;
										var to=oEvent.toElement||oEvent.relatedTarget;
										
										if(Common.isChild(aLi[index], to))
										{
											return;
										}
										
										aP[index].style.display='none';
										
									});
								})(i);
								
							}
						}
						
						
					},
					
					//日历
					function ()
					{
						var oCalendar=Common.getByClass(document, 'calendar_4')[0];
						
						function innerCreate(oT)
						{	
							var oBox=document.createElement('div');
							oBox.className='calendar';
							oBox.innerHTML='<h3 class="title"><span></span><a href="javascript:;" class="cal_pre">←</a>'+
											'<a href="javascript:;" class="cal_next">→</a></h3>'+
											'<ul class="weekday clearfix">'+
												'<li>一</li>'+
												'<li>二</li>'+
												'<li>三</li>'+
												'<li>四</li>'+
												'<li>五</li>'+
												'<li>六</li>'+
												'<li>日</li>'+
											'</ul>'+
											'<ul class="dates clearfix"></ul>';
							oCalendar.appendChild(oBox);
							
							
							//oBox的位置
							var l=oT.offsetLeft;
							var t=oT.offsetTop+oT.offsetHeight+10;
							
							(l>=oCalendar.offsetWidth-oBox.offsetWidth-10)&&(l=oCalendar.offsetWidth-oBox.offsetWidth-10);
							
							oBox.style.left=l+'px';
							oBox.style.top=t+'px';
							
							var oTitle=getByClass(oBox,'title')[0];
							var oWeekDay=getByClass(oBox,'weekday')[0];
							var oDates=getByClass(oBox,'dates')[0];
							var iNow=0;
							//pre next
							var oPre=getByClass(oTitle,'cal_pre')[0];
							var oNext=getByClass(oTitle,'cal_next')[0];
							
							//周六日红色
							for(i=0; i<oDates.children.length; i++)
							{
								if(i%7==5 || i%7==6)
								{
									oDates.children[i].className='weekend';
								}
							}
							
							createDates(oTitle,oDates,iNow);
							
							oPre.onclick=function()
							{
								iNow--;
								oDates.innerHTML='';
								createDates(oTitle,oDates,iNow);
							};
							oNext.onclick=function()
							{
								iNow++;
								oDates.innerHTML='';
								createDates(oTitle,oDates,iNow);
							};
							oBox.onclick=function(ev)
							{
								var oEvent=ev || event;
								oEvent.cancelBubble=true;
							};
							
							return oBox;
						
							//获取某月天数
							function getMonthDays(oDate)
							{
								//var oDate=new Date();
								var oldMonth=oDate.getMonth();
								oDate.setMonth(oDate.getMonth()+1);
								if(Math.abs(oDate.getMonth()-oldMonth)==2)
								{
									oDate.setDate(0);
								}
								oDate.setDate(0);
								return oDate.getDate();
							}
							
							//找到某月第一天是周几
							function getFirstDay(oDate)
							{
								oDate.setDate(1);
								var day=oDate.getDay();
								if(day==0) day=7;
								return day;
							}
						
							function createDates(oTitle,oDates,iNow)
							{
								//日历中创建日期
								var oDate=new Date();
								oDate.setMonth(oDate.getMonth()+iNow);
								oTitle.children[0].innerHTML='<span>'+oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月'+oDate.getDate()+'日';
								//创建空白格
								for(var i=0; i<getFirstDay(oDate)-1; i++)
								{
									var oLi=document.createElement('li');
									oDates.appendChild(oLi);
								}
								for(var i=0; i<getMonthDays(oDate); i++)
								{
									var oLi=document.createElement('li');
									oLi.innerHTML=i+1;
									oDates.appendChild(oLi);
								}
								//变灰
								if(iNow<0)
								{
									for(var i=0; i<oDates.children.length; i++)
									{
										addClassName(oDates.children[i],'gray');
									}
								}
								else if(iNow==0)
								{
									var oDate=new Date();//当前日期
									var today=oDate.getDate();
									for(i=0; i<oDates.children.length; i++)
									{
										if(parseInt(oDates.children[i].innerHTML)<today)
										{
											addClassName(oDates.children[i],'gray');
										}
										else if(parseInt(oDates.children[i].innerHTML)==today)
										{
											addClassName(oDates.children[i],'today');
										}
									}
								}
							}
							
							function findArr(arr,n)
							{
								for(var i=0; i<arr.length; i++)
								{
									if(arr[i]==n) return true;
								}
								return false;
							}
							
							function addClassName(obj,sClass)
							{
								obj.className=obj.className+' '+sClass;
								var arr=[];
								var arr2=obj.className.split(' ');
					
								for(var i=0; i<arr2.length; i++)
								{
									if(arr2[i]!='')
										arr.push(arr2[i]);
								}
								//检重
								var arr3=[];
								for(var i=0; i<arr.length; i++)
								{
									if(!findArr(arr3,arr[i]))
										arr3.push(arr[i]);
								}
								obj.className=arr3.join(' ');
							}
							
						}
						
						function getByClass(obj,sClass)
						{
							if(obj.getElementsByClassName)
								return obj.getElementsByClassName(sClass);
							else
							{
								var aE=obj.getElementsByTagName('*');
								var aRes=[];
								for(var i=0; i<aE.length; i++)
								{
									var arr=aE[i].className.split(' ');
									if(findArr(arr,sClass))
										aRes.push(aE[i]);
								}
								return aRes;
							}
						}
						
						if(!oCalendar.functioned)
						{
							oCalendar.functioned=true;
							
							var aT=document.getElementsByTagName('input');
							var arrT=[];
							for(var i=0; i<aT.length; i++)
							{
								if(aT[i].getAttribute('_calendar')=='true' && aT[i].type=='text')
								{
									arrT.push(aT[i]);
								}
							}
							
							innerCreate(arrT[0]);
							
							for(var i=0; i<arrT.length; i++)
							{
								arrT[i].clicked=false;
								
								arrT[i].onclick=function(ev)
								{
									var oEvent=ev || event;
									oEvent.cancelBubble=true;
									
									var aCalendar=getByClass(document,'calendar');
									for(var i=0; i<aCalendar.length; i++)
									{
										aCalendar[i].parentNode.removeChild(aCalendar[i]);
									}
									this.calendar=null;
									this.calendar=innerCreate(this);
								};
								
								
							}
							
							Common.addEvent(document, 'click', function ()
							{
								var aCalendar=getByClass(document,'calendar');
								for(var i=0; i<aCalendar.length; i++)
								{
									aCalendar[i].parentNode.removeChild(aCalendar[i]);
								}
							});
							
							
							}
					},
					
					//可拖拽大小的弹出层
					function ()
					{
						var oBox=Common.getByClass(document, 'DRAG_RESIZE_5')[0];
						
						function change(obj)
						{
							obj.onmousedown=function(ev)
							{
								var oEv=ev || event;
								
								var oldX=oEv.clientX;
								var oldY=oEv.clientY;
								var oldWidth=oBox.offsetWidth;
								var oldHeight=oBox.offsetHeight;
								var oldLeft=oBox.offsetLeft;
								var oldTop=oBox.offsetTop;
								
								//取消冒泡
								oEv.cancelBubble=true;
								
								var disX=oEv.clientX-getPos(obj).left;
								var disY=oEv.clientY-getPos(obj).top;
								
								if(obj.setCapture)
								{
									if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
									{
										Common.addEvent(document, 'mousemove', mousemove);
										Common.addEvent(document, 'mouseup', mouseup);
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
									Common.addEvent(document, 'mousemove', mousemove);
									Common.addEvent(document, 'mouseup', mouseup);
								}
								
								return false;
								
								
								function mousemove (ev)
								{
									var oEv=ev || event;
									
									var mouseX=oEv.clientX;
									var mouseY=oEv.clientY;
									
									
									/*(mouseX<Common.getPos(oBox.parentNode).left)&&(mouseX=Common.getPos(oBox.parentNode).left);*/
									(oBox.offsetLeft<0)&&(oBox.style.left=0+'px');
									
									var newX=mouseX;//oEv.clientX;
									var newY=mouseY;//oEv.clientY;
									
									if(obj.className.indexOf('l')!=-1)
									{	
										oBox.style.width=oldWidth+oldX-newX+'px';
										oBox.style.left=oldLeft-(oldX-newX)+'px';
										oBox.style.marginLeft=0+'px';
									}
									if(obj.className.indexOf('t')!=-1)
									{
										oBox.style.height=oldHeight+(oldY-newY)+'px';
										oBox.style.top=oldTop-(oldY-newY)+'px';
										oBox.style.marginTop=0;
									}
									
									if(obj.className.indexOf('r')!=-1)
									{
										oBox.style.width=oldWidth-(oldX-newX)+'px';
									}
									
									if(obj.className.indexOf('b')!=-1)
									{
										oBox.style.height=oldHeight-(oldY-newY)+'px';
										
									}
								
								
								}
								function mouseup()
								{
									
									if(obj.setCapture)
									{
										if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
										{
											Common.removeEvent(document, 'mousemove', mousemove);
											Common.removeEvent(document, 'mouseup', mouseup);
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
										Common.removeEvent(document, 'mousemove', mousemove);
										Common.removeEvent(document, 'mouseup', mouseup);
									}
									
								}
								
							};
						}
						
						function getPos(obj)
						{
							var l=0;
							var t=0;
							while(obj)
							{
								l+=obj.offsetLeft;
								t+=obj.offsetTop;
								obj=obj.offsetParent;
							}
							return { left:l, top:t }
						}
						
						if(!oBox.functioned)
						{
							oBox.functioned=true;
							
								/*
							tl 0  上
							tr 1  右
							br 2  下
							bl 3  左
							t  4  上
							r  5  右
							b  6  下
							l  7  左
							*/
							
							var oTl=Common.getByClass(oBox, 'tl')[0];
							oTl.index=0;
							var oTr=Common.getByClass(oBox, 'tr')[0];
							oTr.index=1;
							var oBr=Common.getByClass(oBox, 'br')[0];
							oBr.index=2;
							var oBl=Common.getByClass(oBox, 'bl')[0];
							oBl.index=3;
							var oTm=Common.getByClass(oBox, 't')[0];
							oTm.index=4;
							var oMr=Common.getByClass(oBox, 'r')[0];
							oMr.index=5;
							var oBm=Common.getByClass(oBox, 'b')[0];
							oBm.index=6;
							var oMl=Common.getByClass(oBox, 'l')[0];
							oMl.index=7;
							
							var arr2=[oTl, oTr, oBr, oBl, oTm, oMr, oBm, oMl];
							for(var i=0; i<arr2.length; i++)
							{
								change(arr2[i]);
							}
						}
					},
					
					//自定义滚动条
					function ()
					{
						var oBox=Common.getByClass(document, 'scrollBar_6')[0];
						var oBar=Common.getByClass(oBox, 'scroll_bar')[0];
						var oBarBox=Common.getByClass(oBox, 'scroll_barBox')[0];
						var oCont=Common.getByClass(oBox, 'scroll_cont')[0];
						var oContBox=Common.getByClass(oBox, 'scroll_contBox')[0];
						var oUp=Common.getByClass(oBox, 'scroll_up')[0];
						var oDown=Common.getByClass(oBox, 'scroll_down')[0];
						
						var timer=null;
						Common.addEvent(oBarBox, 'click', function (ev)
						{
							var oEvent=ev||event;
							var src=oEvent.srcElement||oEvent.target;
							
							if(src.className=='scroll_up')
							{
								var t=oBar.offsetTop-10;
								setTop(t);
							}
							
							if(src.className=='scroll_down')
							{
								var t=oBar.offsetTop+10;
								setTop(t);
							}
						});
						
						Common.addEvent(oBarBox, 'mousedown', function (ev)
						{
							var oEvent=ev||event;
							var src=oEvent.srcElement||oEvent.target;
							
							var up;
							if(src.className=='scroll_up')
							{
								up=true;
							}
							
							if(src.className=='scroll_down')
							{
								up=false;
							}
							
							if(src.className=='scroll_up'||src.className=='scroll_down')
							{
								clearInterval(timer);
								timer=setInterval(function ()
								{
									var t=up?(oBar.offsetTop-10):(oBar.offsetTop+10);
									setTop(t);
								}, 60);
								
								aClear.push(timer);
							}
						});
						
						Common.addEvent(oBarBox, 'mouseup', function (ev)
						{
							var oEvent=ev||event;
							var src=oEvent.srcElement||oEvent.target;
							
							if(src.className=='scroll_up'||src.className=='scroll_down')
							{
								clearInterval(timer);
							}
						});
						
						function setTop(t)
						{
							t<20&&(t=20);
							t>(oBarBox.offsetHeight-oBar.offsetHeight-20)&&(t=oBarBox.offsetHeight-oBar.offsetHeight-20);
							oBar.style.top=t+'px';
							var scale=(t-20)/(oBarBox.offsetHeight-oBar.offsetHeight-40);
							oCont.style.top=-scale*(oCont.offsetHeight-oContBox.offsetHeight)+'px';
						}
						
						var disY;
						
						oBar.onmousedown=function(ev)
						{
							var oEv=ev || event;
							disY=oEv.clientY-oBar.offsetTop;
							
							if(oBar.setCapture)
							{
								if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
								{
									Common.addEvent(document, 'mousemove', mousemove);
									Common.addEvent(document, 'mouseup', mouseup);
								}
								else
								{
									oBar.onmousemove=mousemove;
									oBar.onmouseup=mouseup;
									oBar.setCapture();
								}
								
							}
							else
							{
								Common.addEvent(document, 'mousemove', mousemove);
								Common.addEvent(document, 'mouseup', mouseup);
							}
							
							if(oEv.preventDefault)  //IE7
							{
								oEv.preventDefault();
							}
							return false;
						};
						
						function mousemove (ev)
						{
							var oEv=ev || event;
							var t=oEv.clientY-disY;
							setTop(t);
						}
						
						function mouseup ()
						{
							if(oBar.setCapture)
							{
								if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
								{
									Common.removeEvent(document, 'mousemove', mousemove);
									Common.removeEvent(document, 'mouseup', mouseup);
								}
								else
								{
									oBar.onmousemove=null;
									oBar.onmouseup=null;
									oBar.releaseCapture();
								}
								
							}
							else
							{
								Common.removeEvent(document, 'mousemove', mousemove);
								Common.removeEvent(document, 'mouseup', mouseup);
							}
							
						}
						
						oBar.style.height=oBarBox.offsetHeight*oContBox.offsetHeight/oCont.offsetHeight+'px';
						
						addWheel(oBox, function(down)
						{
							if(down)
							{
								var t=oBar.offsetTop+10;
								setTop(t);
							}
							else 
							{
								var t=oBar.offsetTop-10;
								setTop(t);
							}
						});
						
						function addWheel(obj,fnDown)
						{
							var bDown=false;
							
							if(window.navigator.userAgent.indexOf('Firefox')!=-1)//FF
							{
								obj.addEventListener('DOMMouseScroll',function(ev)
								{
									var oEv=ev || event;
									bDown=oEv.detail>0;
									fnDown && fnDown(bDown);
								},false);
							}
							else												//Chrome IE
							{
								obj.onmousewheel=function(ev)
								{
									var oEv=ev || event;
									bDown=oEv.wheelDelta<0;
									fnDown && fnDown(bDown);
								};
							}
						}
	
					},
					
					//百度联想
					function ()
					{
						var oBox=Common.getByClass(document, 'associate_7')[0];
						
						if(!oBox.functioned)
						{
							oBox.functioned=true;
							
							var oBtn=Common.getByClass(oBox, 'search')[0];;
							var oUl=Common.getByClass(oBox, 'resultUl')[0];
							var oHead=document.getElementsByTagName('head')[0];
							
							oUl.style.left=oBtn.offsetLeft+'px';
							oUl.style.top=oBtn.offsetTop+oBtn.offsetHeight+'px';
							
							var fnName=('ajax'+Math.random()).replace('.', '');;
							
							var sendTime;
							
							window[fnName]=function (json)
							{
								
								var oDate=new Date();
								if((oDate.getTime()-sendTime)>5000)
								{
									alert('搜索超时，请检查您的网络连接状况');
								}
								
								if(json.s.length==0)
									oUl.style.display='none';
								else
									oUl.style.display='block';
								
								oUl.innerHTML='';
								for(var i=0; i<json.s.length; i++)
								{
									var oLi=document.createElement('li');
									oLi.innerHTML=json.s[i];
									oUl.appendChild(oLi);
									
									resultonout(oLi);
								}
								
								oHead.removeChild(oS);
							}
							
							var oS;
							
							var oldValue='';
							var iNow=-1;
							
							function showResult ()
							{
								window.open('http://www.baidu.com/s?wd='+encodeURIComponent(oBtn.value), '_blank');
								oBtn.value='';
								oUl.style.display='none';
							}
							
							function resultonout (oLi)
							{
								oLi.onmouseover=function ()
								{
									oLi.style.background='#ccc';
									oBtn.value=this.innerHTML;
								};
								
								oLi.onmouseout=function ()
								{
									oLi.style.background='';
								};
							}
							
							Common.addEvent(oBox, 'click', function (ev)
							{
								var oEvent=ev||event;
								var src=oEvent.srcElement||oEvent.target;
								
								if(!Common.isChild(oUl, src)&&!Common.isChild(oBtn, src))
								{
									oUl.style.display='none';
								}
								
							});
							
							oUl.onclick=function (ev)
							{
								var oEvent=ev||event;
								var src=oEvent.srcElement||oEvent.target;
								
								showResult();
							};
							
							oBtn.onkeyup=function(ev)
							{
								var oDate=new Date();
								sendTime=oDate.getTime();
								
								var oEvent=ev || event;
								if(oEvent.keyCode==38 || oEvent.keyCode==40)	return;
								var url='http://suggestion.baidu.com/su?wd='+encodeURIComponent(oBtn.value)+'&p=3&cb='+fnName;
								oS=document.createElement('script');
								oS.src=url;
								var oHead=document.getElementsByTagName('head')[0];
								oHead.appendChild(oS);
								oldValue=oBtn.value;
								iNow=-1;
							};
							
							oBtn.onkeydown=function(ev)
							{
								var oEv=ev || event;
								
								switch(oEv.keyCode)
								{
									case 38:
										iNow++;
										for(var i=0; i<oUl.children.length; i++)
										{
											oUl.children[i].style.background='#fff';
										}
										if(iNow==oUl.children.length)	
										{
											iNow=-1;
											oBtn.value=oldValue;
										}
										else
										{
											
											oUl.children[oUl.children.length-1-iNow].style.background='#ccc';
											oBtn.value=oUl.children[oUl.children.length-1-iNow].innerHTML;
										}
										
										return false;
										break;
									case 40:
										iNow--;
										for(var i=0; i<oUl.children.length; i++)
										{
											oUl.children[i].style.background='#fff';
										}
										if(iNow==-1)
										{
											oBtn.value=oldValue;
										}
										else
										{
											if(iNow==-2)	
											{
												iNow=oUl.children.length-1;
											}
											
											oUl.children[oUl.children.length-1-iNow].style.background='#ccc';
											oBtn.value=oUl.children[oUl.children.length-1-iNow].innerHTML;
										}
										break;
									case 13:
										showResult();
										break;
									default:
										break;
								}
							};
						}
					},
					
					//苹果展示
					function ()
					{
						var oDiv=Common.getByClass(document, 'apple_8')[0];
						
						if(!oDiv.functioned)
						{
							oDiv.functioned=true;
							
							var aImg=oDiv.getElementsByTagName('img');
							
							Common.addEvent(oDiv, 'mousemove', function (ev)
							{
								var oEvent=ev||event;
								
								for(var i=0;i<aImg.length;i++)
								{
									var l=Common.getPos(aImg[i]).left+aImg[i].offsetWidth/2;
									
									var t=Common.getPos(aImg[i]).top+aImg[i].offsetHeight/2;
									
									
									var a=l-oEvent.clientX;
									var b=t-oEvent.clientY;
									
									var dis=Math.sqrt(a*a+b*b);
									
									var scale=1-dis/200;	//0-150之间有反应——感应距离
									
									if(scale<0.5)
									{
										scale=0.5;
									}
									
									aImg[i].width=scale*128;
								}
							});
						}
						
					},
					
					//弹性导航
					function ()
					{
						var oUl=Common.getByClass(document, 'flex_nav_9')[0];
						
						if(!oUl.functioned)
						{
							oUl.functioned=true;
							
							var left=0;
						
							var aLi=oUl.children;
							var oBox=aLi[aLi.length-1];
							
							function startMove(obj, iTarget)
							{
								var speed=0;
								
								clearInterval(obj.timer);
								obj.timer=setInterval(function (){
									speed+=(iTarget-left)/5;
									speed*=0.7;
									
									left+=speed;
									
									if(Math.round(left)==iTarget && Math.round(speed)==0)
									{
										clearInterval(obj.timer);
									}
									else
									{
										obj.style.left=Math.round(left)+'px';
									}
									
								}, 30);
							}
							
							
							for(var i=0;i<aLi.length-1;i++)
							{
								aLi[i].onmouseover=function ()
								{
									startMove(oBox, this.offsetLeft);
								};
							}
						}
						
						

					},
					
					//弹性运动
					function ()
					{
						var oBox=Common.getByClass(document, 'flex_move_10')[0];
						
						if(!oBox.functioned)
						{
							oBox.functioned=true;
							
							var oDiv=Common.getByClass(document, 'flex_move_box')[0];
		
							var lastX=0;
							var lastY=0;
							
							var speed_x=0;
							var speed_y=0;
							
							var disX=disY=0;
							
							function mousemove (ev)
							{
								var oEvent=ev||event;
									
								var l=oEvent.clientX-disX;
								var t=oEvent.clientY-disY;
								
								(l<0)&&(l=0);
								(t<0)&&(t=0);
								
								(l>oBox.offsetWidth-oDiv.offsetWidth)&&(l=oBox.offsetWidth-oDiv.offsetWidth);
								(t>oBox.offsetHeight-oDiv.offsetHeight)&&(t=oBox.offsetHeight-oDiv.offsetHeight);
								
								oDiv.style.left=l+'px';
								oDiv.style.top=t+'px';
								
								//算速度
								speed_x=l-lastX;
								speed_y=t-lastY;
								
								lastX=l;
								lastY=t;
							}
							
							function mouseup ()
							{
								if(oDiv.setCapture)
								{
									if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
									{
										Common.removeEvent(document, 'mousemove', mousemove);
										Common.removeEvent(document, 'mouseup', mouseup);
									}
									else
									{
										oDiv.onmousemove=null;
										oDiv.onmouseup=null;
									
										oDiv.releaseCapture();
									}
								}
								else
								{
									Common.removeEvent(document, 'mousemove', mousemove);
									Common.removeEvent(document, 'mouseup', mouseup);
								}
								
								startMove(oDiv);
							}
							
							function startMove(obj)
							{
								clearInterval(obj.timer);
								obj.timer=setInterval(function (){
									speed_y+=3;
									
									var l=obj.offsetLeft+speed_x;
									var t=obj.offsetTop+speed_y;
									
									if(t>oBox.offsetHeight-obj.offsetHeight)
									{
										speed_y*=-0.8;
										speed_x*=0.8;
										t=oBox.offsetHeight-obj.offsetHeight;
									}
									else if(t<0)
									{
										speed_y*=-0.8;
										speed_x*=0.8;
										t=0;
									}
									
									if(l>oBox.offsetWidth-obj.offsetWidth)
									{
										speed_x*=-0.8;
										speed_y*=0.8;
										l=oBox.offsetWidth-obj.offsetWidth;
									}
									else if(l<0)
									{
										speed_x*=-0.8;
										speed_y*=0.8;
										l=0;
									}
									
									if(Math.abs(speed_x)<1)
									{
										speed_x=0;
									}
									if(Math.abs(speed_y)<1)
									{
										speed_y=0;
									}
									
									if(speed_x==0 && speed_y==0 && t==oBox.offsetWidth-obj.offsetHeight)
									{
										clearInterval(obj.timer);
									}
									
									obj.style.left=l+'px';
									obj.style.top=t+'px';
								}, 30);
							}
							
							oDiv.onmousedown=function (ev)
							{
								var oEvent=ev||event;
								
								disX=oEvent.clientX-oDiv.offsetLeft;
								disY=oEvent.clientY-oDiv.offsetTop;
								
								clearInterval(oDiv.timer);
								
								if(oDiv.setCapture)
								{
									if((/FIREFOX/).test(window.navigator.userAgent.toUpperCase()))
									{
										Common.addEvent(document, 'mousemove', mousemove);
										Common.addEvent(document, 'mouseup', mouseup);
									}
									else
									{
										oDiv.onmousemove=mousemove;
										oDiv.onmouseup=mouseup;
								
										oDiv.setCapture();
									}
								}
								else
								{
									Common.addEvent(document, 'mousemove', mousemove);
									Common.addEvent(document, 'mouseup', mouseup);
								}
								
								return false;
								
							};
							
						}
						
					},
					
					//无缝滚动
					function ()
					{
						var oDiv=Common.getByClass(document, 'nogaprun_10')[0];
						
						if(!oDiv.functioned)
						{	
							oDiv.functioned=true;
						
							var aBtn=oDiv.getElementsByTagName('ol')[0].children;
							var oUl=oDiv.getElementsByTagName('ul')[0];
							var aLi=oUl.children;
							
							var oBtnPrev=oDiv.children[0];
							var oBtnNext=oDiv.children[1];
							
							var now=0;
							
							oUl.innerHTML+=oUl.innerHTML;
							oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
							
							var w=oUl.offsetWidth/2;
							
							for(var i=0;i<aBtn.length;i++)
							{
								(function (index){
									aBtn[i].onclick=function ()
									{
										now=index;
										
										tab();
									};
								})(i);
							}
							
							function tab()
							{
								
								for(var i=0;i<aBtn.length;i++)
								{
									aBtn[i].className='';
								}
								
								if(now>0)
								{
									aBtn[now%aBtn.length].className='active';
								}
								else
								{
									aBtn[(now%aBtn.length+aBtn.length)%aBtn.length].className='active';
								}
								startMove(oUl, -aLi[0].offsetWidth*now);
							}
							
							oBtnNext.onclick=function ()
							{
								now++;
								
								tab();
							};
							oBtnNext.onmousedown=function ()
							{
								return;
							};
							oBtnPrev.onmousedown=function ()
							{
								return;
							};
							
							oBtnPrev.onclick=function ()
							{
								now--;
								
								tab();
							};
							
							var left=0;
							function startMove(obj, iTarget)
							{
								clearInterval(obj.timer);
								obj.timer=setInterval(function (){
									var speed=(iTarget-left)/8;
									speed=speed>0?Math.ceil(speed):Math.floor(speed);
									
									if(left==iTarget)
									{
										clearInterval(obj.timer);
									}
									else
									{
										left+=speed;
										
										if(left>0)
										{
											oUl.style.left=(left%w-w)%w+'px';
										}
										else
										{
											oUl.style.left=left%w+'px';
										}
									}
								}, 30);
							}
						}
					},
					
				];
			
			function change2str (index)
			{
				var oImgCont=Common.getByClass(aMdLiItem[index], 'img_cont')[0];
				var oImg=Common.getByClass(oImgCont, 'showImg')[0];
				var oCont=Common.getByClass(oImgCont, 'cont')[0];
				
				oImg.style.display='none';
				
				oCont.style.display='block';
				
				fns[index]&&(fns[index]());
				
			}
			
			function change2img (index)
			{
				for(var i=0; i<aClear.length; i++)
				{
					clearInterval(aClear[i]);
					clearTimeout(aClear[i]);
				}
				
				var oImgCont=Common.getByClass(aMdLiItem[index], 'img_cont')[0];
				var oImg=Common.getByClass(oImgCont, 'showImg')[0];
				var oCont=Common.getByClass(oImgCont, 'cont')[0];
				
				oCont.style.display='none';
				
				oImg.style.display='block';
			}
			
			//条目数、每页条目数、页数
			var itemNum=12;
			var perPageNum=6;
			var pageNum=Math.ceil(itemNum/perPageNum);
			
			
			for(var i=0; i<pageNum; i++)
			{
				var oLi=document.createElement('li');
				
				oLi.className=(i==0)?'mdLi mdLi_active':'mdLi';
				
				objects.oMdCont.appendChild(oLi);
				
				var itemPerPageNum=(i==pageNum-1)?(itemNum-perPageNum*i):perPageNum;
				
				for(var j=0; j<itemPerPageNum; j++)
				{
					var oItem=document.createElement('div');
					
					oItem.className='mdLi_item';
					
					oLi.appendChild(oItem);
				}
			}
			
			var aMdLiItem=Common.getByClass(document, 'mdLi_item');
			var zIndex=0;
			
			var nowShow=0;//当前显示的条目
			
			var aMdLi=Common.getByClass(objects.oModular, 'mdLi');
			var width=aMdLi[0].children[0].offsetWidth;
			var height=aMdLi[0].children[0].offsetHeight;
			
			for(var i=0; i<aMdLiItem.length; i++)
			{
				aMdLiItem[i].innerHTML='<div class="img_cont"><img class="showImg" src="'+(imgSrc[i]?imgSrc[i]:'')+'" alt="" /><div class="cont">'+(innerHTML[i]?innerHTML[i]:'')+'</div></div>'+'<div class="detail"><h3>'+(aItemName[i]?aItemName[i]:'')+'</h3><p>'+
				(aItemCont[i]?aItemCont[i]:'')+'</p></div>';
				
				aMdLiItem[i].posIndex=i%(perPageNum);
				
				(function (index)
				{
					Common.addEvent(aMdLiItem[i], 'mouseover', function (ev)
					{
						var oEvent=ev||event;
						var from=oEvent.fromElement||oEvent.relatedTarget;
						var oDetail=Common.getByClass(aMdLiItem[index], 'detail')[0];
						
						oDetail.style.display='block';
						
						if(Common.isChild(aMdLiItem[index], from)||oDetail.clicked)
						{
							return;
						}
						
						
						Common.startMove(oDetail, {height: 100}, {time: 500});
					});
					
					Common.addEvent(aMdLiItem[i], 'mouseout', function (ev)
					{
						var oEvent=ev||event;
						var to=oEvent.toElement||oEvent.relatedTarget;
						
						var oDetail=Common.getByClass(aMdLiItem[index], 'detail')[0];
						
						oDetail.style.display='block';
						
						if(Common.isChild(aMdLiItem[index], to)||oDetail.clicked)
						{
							return;
						}
						
						Common.startMove(oDetail, {height: 50}, {time: 500});
					});
					
					Common.addEvent(aMdLiItem[i], 'click', function (ev)
					{
						var oEvent=ev||event;
						
						var src=oEvent.srcElement||oEvent.target;
						
						
						if(aMdLiItem[index].turnedBigger)
						{
							return;
						}
						
						nowShow=index;
						
						zIndex+=100;
						aMdLiItem[index].style.zIndex=zIndex;
						
						var oDetail=Common.getByClass(aMdLiItem[index], 'detail')[0];
						oDetail.clicked=true;
						Common.startMove(oDetail, {height: 50});
						
						//已经变大  click不再有效
						aMdLiItem[index].turnedBigger=true;
						Common.startMove(aMdLiItem[index], {width: 400, height: 400, left: 250, top: 30, zIndex: zIndex}, {end: function ()
						{
							change2str(index);
							
							var oGoBack=Common.getByClass(document, 'modular_goBack')[0];
							oGoBack.style.zIndex=zIndex+1;
							
							var oDetail=Common.getByClass(aMdLiItem[index], 'detail')[0];
							oDetail.clicked=true;
							
							var oBg=Common.getByClass(objects.oModular, 'modular_bg')[0];
							oBg.style.display='block';
							oBg.style.height=objects.oShowWindow.offsetHeight+'px';
							Common.startMove(oBg, {opacity: 50});
							
							var oGoBack=Common.getByClass(objects.oModular, 'modular_goBack')[0];
							oGoBack.style.display='block';
							oGoBack.style.zIndex=zIndex;
							Common.startMove(oGoBack, {opacity: 100});
							
							var oPrev=Common.getByClass(objects.oModular, 'prev')[0];
							var oNext=Common.getByClass(objects.oModular, 'next')[0];
							var arr=[oPrev, oNext];
							
							for(var i=0; i<arr.length; i++)
							{
								arr[i].style.display='block';
								arr[i].style.zIndex=zIndex;
								
								Common.startMove(arr[i], {opacity: 100});
							}
						}});
					});
					
				})(i);
				
			}
			
			var oPrev=Common.getByClass(objects.oModular, 'prev')[0];
			var oNext=Common.getByClass(objects.oModular, 'next')[0];
			Common.addEvent(oPrev, 'click', function ()
			{
				zIndex+=100;
				
				nowShow--;
				
				(nowShow==-1)&&(nowShow=aMdLiItem.length-1);
				
				//alert(nowShow);
				for(var i=0; i<aMdLiItem.length; i++)
				{
					(function (index)
					{
						aMdLiItem[i].turnedBigger=false;
						change2img(i);
						
						Common.startMove(aMdLiItem[i], {left: aMdLiItem[i].nowPos.left, top: aMdLiItem[i].nowPos.top, width: aMdLiItem[i].nowSize.width, height: aMdLiItem[i].nowSize.height, opacity: aMdLiItem[i].nowSize.opacity, zIndex: 0}, {end: function ()
						{
							var oDetail=Common.getByClass(aMdLiItem[index], 'detail')[0];
							
							oDetail.clicked=false;
						}});
					})(i);
					
					
				}
				
				//已经变大  click不再有效
				aMdLiItem[nowShow].turnedBigger=true;
				Common.startMove(aMdLiItem[nowShow], {width: 400, height: 400, left: 250, top: 30, opacity: 100, zIndex: zIndex}, 
				{
					end: function ()
					{
						var oGoBack=Common.getByClass(document, 'modular_goBack')[0];
						oGoBack.style.zIndex=zIndex+1;
						
						change2str(nowShow);
						
						aMdLiItem[nowShow].style.zIndex=zIndex;
						
						var oDetail=Common.getByClass(aMdLiItem[nowShow], 'detail')[0];
						
						oDetail.clicked=true;
					}
				});
			});
			
			
			Common.addEvent(oNext, 'click', function (ev)
			{
				var oEvent=ev||event;
				var src=oEvent.srcElement||oEvent.target;
				
				zIndex+=100;
				
				nowShow++;
				
				(nowShow==aMdLiItem.length)&&(nowShow=0);
				
				
				for(var i=0; i<aMdLiItem.length; i++)
				{
					aMdLiItem[i].turnedBigger=false;
					(function (index)
					{
						change2img(index);
						
						Common.startMove(aMdLiItem[i], {left: aMdLiItem[i].nowPos.left, top: aMdLiItem[i].nowPos.top, width: aMdLiItem[i].nowSize.width, height: aMdLiItem[i].nowSize.height, opacity: aMdLiItem[i].nowSize.opacity, zIndex: 0}, 
						{
							end: function ()
							{
								var oDetail=Common.getByClass(aMdLiItem[index], 'detail')[0];
							
								oDetail.clicked=false;
							}
						});
					})(i);
					
				}
				
				
				//已经变大  click不再有效
				aMdLiItem[nowShow].turnedBigger=true;
				Common.startMove(aMdLiItem[nowShow], {width: 400, height: 400, left: 250, top: 30, opacity: 100, zIndex: zIndex}, 
				{
					end: function ()
					{
						change2str(nowShow);
						
						var oGoBack=Common.getByClass(document, 'modular_goBack')[0];
						oGoBack.style.zIndex=zIndex+1;
						
						aMdLiItem[nowShow].style.zIndex=zIndex;
						
						var oDetail=Common.getByClass(aMdLiItem[nowShow], 'detail')[0];
						
						oDetail.clicked=true;
					}
				});
				
			});
			
			var oGoBack=Common.getByClass(objects.oModular, 'modular_goBack')[0];
			Common.addEvent(oGoBack, 'click', function ()
			{
				Common.startMove(oGoBack, {opacity: 0}, {time: 400, end: function ()
				{
					oGoBack.style.display='none';
					
				}});
			
				var oPrev=Common.getByClass(objects.oModular, 'prev')[0];
				var oNext=Common.getByClass(objects.oModular, 'next')[0];
				var arr=[oPrev, oNext];
				
				var oBg=Common.getByClass(objects.oModular, 'modular_bg')[0];
				
				for(var i=0; i<arr.length; i++)
				{
					(function (index)
					{
						Common.startMove(arr[i], {opacity: 0}, {time: 400, end: function ()
						{
							arr[index].style.display='none';
							
							for(var i=0; i<aMdLiItem.length; i++)
							{
								aMdLiItem[i].turnedBigger=false;
								(function (index)
								{
									change2img(index);
									
									Common.startMove(aMdLiItem[i], {left: aMdLiItem[i].nowPos.left, top: aMdLiItem[i].nowPos.top, width: aMdLiItem[i].nowSize.width, height: aMdLiItem[i].nowSize.height, opacity: aMdLiItem[i].nowSize.opacity, zIndex: 0}, 
									{end: function ()
									{
										var oDetail=Common.getByClass(aMdLiItem[index], 'detail')[0];
										
										oDetail.clicked=false;
									}});
								})(i);
								
							}
							
							Common.startMove(oBg, {opacity: 0}, {end: function ()
							{
								oBg.style.display='none';
							}});
						}});
					})(i);
					
				}
			});
			
			//记录位置
			var aShowPos=[
							{left: 20, top: 20},
							{left: 20+300, top: 20},
							{left: 20+300*2, top: 20},
							{left: 20, top: 20+240},
							{left: 20+300, top: 20+240},
							{left: 20+300*2, top: 20+240},
						];
			
			var pageOneLi=aMdLi[0].children;
			//转为绝对定位
			for(var i=0; i<pageOneLi.length; i++)
			{
				pageOneLi[i].style.position='absolute';
				pageOneLi[i].style.left=aShowPos[i].left+'px';
				pageOneLi[i].style.top=aShowPos[i].top+'px';
				pageOneLi[i].style.margin=0;
				
				pageOneLi[i].nowPos=aShowPos[i];
				pageOneLi[i].nowSize={width: width, height: height, opacity: 100};
			}
			
			var oPages=Common.getByClass(objects.oModular, 'pages')[0];
			
			var aHidePos=[{left: 415, top: 510}, {left: 465, top: 510}];
			
			
			//非第一页的li hide
			for(var i=1; i<aMdLi.length; i++)
			{
				for(var j=0; j<aMdLi[i].children.length; j++)
				{
					var oChild=aMdLi[i].children[j];
					oChild.style.position='absolute';
					oChild.style.left=aHidePos[i].left+'px';
					oChild.style.top=aHidePos[i].top+'px';
					oChild.style.height=0;
					oChild.style.width=0;
					oChild.style.opacity=0;
					oChild.style.filter='alpha(opacity: 0)';
					oChild.style.margin=0;
					
					oChild.nowPos=aHidePos[i];
					oChild.nowSize={width: 0, height: 0, opacity: 0};
				}
				
				aMdLi[i].style.display='block';
				
				aMdLi[i].index=i;
			}
			
			
			
			//获取页码按钮
			var aPage=[];
			var aTmpA=oPages.getElementsByTagName('a');
			
			var oPagePrev=aTmpA[0];
			var oPageNext=aTmpA[aTmpA.length-1];
			
			for(var i=0; i<aTmpA.length; i++)
			{
				(i!=0&&i!=aTmpA.length-1)&&(aPage.push(aTmpA[i]));
				aTmpA[i].index=i;
			}
			
			//点击事件
			
			var now=0;
			
			var showFinished=true;
			var hideFinished=true;
			
			function show (index)
			{
				showFinished=false;
				
				var aLi=aMdLi[index].children;
				var aShowRnd=Common.rand(0, aLi.length-1);
				
				var count=0;
				var showCount=0;
				var timer=setInterval(function ()
				{
					var _this=aLi[aShowRnd[count]];
					
					aLi[aShowRnd[count]].turnedBigger=false;
					
					Common.startMove(aLi[aShowRnd[count]], {left: aShowPos[aShowRnd[count]].left, top: aShowPos[aShowRnd[count]].top, width: width, height: height, opacity: 100}, {end: function ()
					{
						//记录当前位置
						_this.nowPos={left: _this.offsetLeft, top: _this.offsetTop};
						_this.nowSize={width: width, height: height, opacity: 100};
						
						showCount++;
						if(showCount==aShowRnd.length)
						{
							showFinished=true;
						}
						
						
					}});
					
					count++;
					(count==aShowRnd.length)&&(clearInterval(timer));
				}, 100);
			}
			
			function hide (json)
			{
				hideFinished=false;
				
				var showIndex=json.showIndex;
				for(var k=0; k<aMdLi.length; k++)
				{
					if(showIndex!=k)
					{
						(function (kIndex)
						{
							var aLi=aMdLi[kIndex].children;
												
							var aHideRnd=Common.rand(0, aLi.length-1);
							
							var count=0;
							var hideCount=0;
							
							var timer=setInterval(function ()
							{
								var _this=aLi[aHideRnd[count]];
								var _count=aHideRnd[count];
								
								aLi[aHideRnd[count]].turnedBigger=false;
								
								Common.startMove(aLi[aHideRnd[count]], {left: aHidePos[kIndex].left, top: aHidePos[kIndex].top, width: 0, height: 0, opacity: 0}, {time: 550, end: function ()
								{
									 change2img(_count);
									//记录当前位置
									_this.nowPos={left: _this.offsetLeft, top: _this.offsetTop};
									_this.nowSize={width: 0, height: 0, opacity: 0};
									
									hideCount++;
									
									if(hideCount==aHideRnd.length)
									{
										//展示点击的页面
										show(showIndex);
										
										hideFinished=true;
									}
								}});
								
								count++;
								(count==aHideRnd.length)&&(clearInterval(timer));
							}, 100);
						})(k);
					}
				}
			}
			
			function pageOn ()
			{
				for(var i=0; i<aPage.length; i++)
				{
					aPage[i].className='';
				}
				
				aPage[now].className='active';
			}
			
			for(var i=0; i<aPage.length; i++)
			{
				(function (iIndex)
				{
					Common.addEvent(aPage[i], 'click', function ()
					{
						if(hideFinished&&showFinished)
						{
							now=iIndex;
							hide({showIndex: now});
							pageOn();
						}
					});
					
				})(i);
			}
			Common.addEvent(oPagePrev, 'click', function ()
			{
				if(hideFinished&&showFinished)
				{
					now--;
					(now==-1)&&(now=aPage.length-1);
					
					hide({showIndex: now});
					
					pageOn();
				}
			});
			Common.addEvent(oPageNext, 'click', function ()
			{
				if(hideFinished&&showFinished)
				{
					now++;
					(now==aPage.length)&&(now=0);
					
					hide({showIndex: now});
					pageOn();
				}
			});
			
		},
		
	
	};
});