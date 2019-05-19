// JavaScript Document

define(function (require, exports, modules)
{
	var Common=require('common_pure.js');
	var ShowNav=require('showNav.js');
	
	var fn={
			common:	{
						getByClass:	Common.getByClass,
						setStyle3:	Common.setStyle3,
						getStyle:	Common.getStyle,
						getPos:		Common.getPos,
						calLineAngle:	Common.calLineAngle,
						addEvent:	Common.addEvent,
						removeEvent:	Common.removeEvent,
						
				},
			move:	{
						move:	Common.startMove,
				},
			showNav:	{
						showNav:	ShowNav.showNav,
				},
			/*resume:	{
						showResume:	Resume.showResume,
				},	*/
			homeFn: {
					angle2Radian:	function (deg)
									{
										return deg*2*Math.PI/360;
									},
									
					setLR:			function (json)
									{
										var R=json.R;
										var r=json.r;
										var deg=json.deg;
										
										
										if(deg>=0 && deg<=90)
										{
											var l=R+r*Math.cos(fn.homeFn.angle2Radian(90-deg))
											var t=R-r*Math.sin(fn.homeFn.angle2Radian(90-deg));
										}
										else if(deg>90 && deg<=180)
										{
											var l=R+r*Math.cos(fn.homeFn.angle2Radian(deg-90));
											var t=R+r*Math.sin(fn.homeFn.angle2Radian(deg-90));
										}else if(deg>180 && deg<=270)
										{
											var l=R-r*Math.cos(fn.homeFn.angle2Radian(270-deg));
											var t=R+r*Math.sin(fn.homeFn.angle2Radian(270+deg));
										}
										else 
										{
											var l=R-r*Math.cos(fn.homeFn.angle2Radian(deg-270));
											var t=R-r*Math.sin(fn.homeFn.angle2Radian(deg-270));
										}
										
										return {left:l, top:t};
									},
									
						getDis:		function (pos1, pos2)
									{
										var a=pos1.x-pos2.x;
										var b=pos1.y-pos2.y;
									
										return Math.sqrt(a*a+b*b);
									},
						
						getCenPos:	function (obj)
										{
											return {	
														x: 	fn.common.getPos(obj).left+obj.offsetWidth/2,
														y:	fn.common.getPos(obj).top+obj.offsetHeight/2,
														r:	obj.offsetWidth/2
													};
										},
									
						collTest:	function (cenPos1, cenPos2, r)
									{
										return fn.homeFn.getDis(cenPos1, cenPos2)<=r ? true: false;
									},
						/*navCol:	function (obj1, obj2)
						{
							var a=Common.getPos(obj1).left-Common.getPos(obj2).left;
							var b=Common.getPos(obj1).top-Common.getPos(obj2).top;
							
							var s=Math.sqrt(a*a+b*a);
							
							if(s>=obj1.offsetWidth)
							{
								return true;
							}
							
							return false;
						},*/
									
						createBullet:	function (json)
										{
											var oBul=document.createElement('span');
											oBul.className='bullet';
											
											oBul.style.zIndex=window.zIndex+10;
											
											var leftStart=json.leftStart;
											var topStart=json.topStart;
											var deg=json.deg;
											var oParent=json.oParent;
											
											var oBox=fn.common.getByClass(oParent, 'fortressBox')[0];
											
											var R=oBox.offsetWidth/2;
											var r=150;//可变
											
											oParent.appendChild(oBul);
											
											oBul.style.left=leftStart+fn.homeFn.setLR({r:r, R:R, deg:deg}).left+'px';
											oBul.style.top=topStart+fn.homeFn.setLR({r:r, R:R, deg:deg}).top+'px';
											
											return oBul;
										},
										
						
						/*calStringHeight:	function ()
						{
							var aNav=Common.getByClass(document, 'nav');
							for(var i=0; i<aNav.length-1; i++)
							{
								var oTmp=document.createElement('div');
								
								
								var a=aNav[i+1].offsetLeft-aNav[i].offsetLeft;
								var b=aNav[i+1].offsetTop-aNav[i].offsetTop-aNav[i].offsetHeight;
								var s=Math.sqrt(a*a+b*b);
								
								var oString=Common.getByClass(aNav[i], 'string')[0];
								
								oString.style.height=s+'px';//-aNav[i].offsetHeight*3/2+'px';
								
								//计算角度
								if(a>0)
								{
									var angle=90+Math.atan(Math.abs(b)/Math.abs(a));
								}
								else if(a==0)
								{
									var angle=180;
								}
								else
								{
									var angle=270-Math.atan(Math.abs(b)/Math.abs(a));
								}
								
								Common.setStyle3(oString, 'transform', 'rotate('+fn.homeFn.angle2Radian(angle)+'deg)');
							}
							
						},*/
										
						moveNav:		function (obj, speed, fnEnd)
										{
											var fns={
													showNav:	fn.showNav.showNav,
												};
											var oFortress=Common.getByClass(document, 'fortress')[0];	
											
											var oBar=fn.common.getByClass(document.getElementById('home'), 'sideBar')[0];
											
											var aNav=fn.common.getByClass(document.getElementById('home'), 'nav');
											
											obj.speed_x=speed.speed_x;
											obj.speed_y=0;//speed.speed_y;
											
											var damp=0.5;
											var damp2=0.97;
											
											
											obj.colNavTest=0;
											
											clearInterval(obj.timer);
											
											obj.timer=setInterval(function ()
											{
												/*
													拉伸动作未完成
												*/
												
												var l=obj.offsetLeft+obj.speed_x;
												var t=obj.offsetTop+obj.speed_y;	
												
												
												if(l<2)
												{
													l=2;
													obj.speed_x*=-damp;
													obj.speed_y*=damp;
													
												
													obj.crossBar=true;
													
													oFortress.crossBar=true;
													
													if(!oBar.widen)
													{
														Common.startMove(oBar, {width: 130}, {time: 700});
														oBar.widen=true;
													}
												}
												else if(l>130-obj.offsetWidth-5)//oBar.offsetWidth-obj.offsetWidth-5)
												{
													if(obj.crossBar)
													{
														l=130-obj.offsetWidth-5;//oBar.offsetWidth-obj.offsetWidth-5;
														obj.speed_x*=-damp;
														obj.speed_y*=damp;
													}
													
												}
												
												if(t<0)
												{
													t=0;
													obj.speed_y*=-damp;
													obj.speed_x*=damp;
												}
												else if(t>document.documentElement.clientHeight-obj.offsetHeight)
												{
													t=document.documentElement.clientHeight-obj.offsetHeight;
													
													obj.speed_y*=-damp;
													obj.speed_x*=damp;
												}
												
												
												obj.speed_y*=damp2;
												obj.speed_x*=damp2;
												
												//防止navLine长短不对应
												var oShowWindow=fn.common.getByClass(document.getElementById('home'),'showWindow')[0];
												if(oShowWindow)
												{
													if(obj.fired&&(oShowWindow.index==obj.index))
													{
														var aNavLine=fn.common.getByClass(obj, 'navLine');
														
														if(aNavLine.length)
														{
															aNavLine[0].style.width=oShowWindow.offsetLeft-obj.offsetLeft-obj.offsetWidth+'px';
														}
														
														obj.top=obj.offsetTop;
													}
												}
												//结束
												
												
												if(Math.round(obj.speed_x)==0 && Math.round(obj.speed_y)==0)
												{
													clearInterval(obj.timer);
													
													fnEnd && fnEnd(obj);		
												}
												
											
												obj.style.left=l+'px';
												obj.style.top=t+'px';
												
												//fn.homeFn.calStringHeight();
												
											}, 10);
											
											
										},
						testNavColl:	function (aNav, oNav)
										{
											
											//记录当前nav中心的位置
											var aPos=[];
											var now=0;
											for(var i=0; i<aNav.length; i++)
											{
												aPos.push({	x: 	fn.common.getPos(aNav[i]).left+aNav[i].offsetWidth/2, 
															y:	fn.common.getPos(aNav[i]).top+aNav[i].offsetHeight/2  	
														});
												if(aNav[i]==oNav)
												{
													now=i;
												}
											}
											//结束
											for(var j=0; j<aNav.length; j++)
											{
												if(aNav[j]!=oNav)
												{
													if(fn.homeFn.getDis(aPos[now], aPos[j])<=oNav.offsetWidth/2)
													{
														return true;
													}
												}
											}
											
											return false;
										},
						afterNavMove:	function (oNav)
										{
											var oFortressBox=Common.getByClass(document, 'fortressBox')[0];
											
											var crossBar=false;
											var aNav=Common.getByClass(document, 'nav');
											for(var i=0; i<aNav.length; i++)
											{
												if(aNav[i].crossBar)
													crossBar=true;
											}
											
											if(!oFortressBox.hide&&(!crossBar))
											{
												oFortressBox.hide=true;
												Common.startMove(oFortressBox, {right: -300});
											}
											
											oNav.oldLeft=oNav.offsetLeft;
											if(oNav.fired)
											{				
												//记录每次的位置
												oNav.pos.push(fn.common.getPos(oNav));
												//弹出各导航的内容
												
												fn.showNav.showNav(oNav);
											}
										},
						
						testTimer:		function ()
										{
											var oHome=document.getElementById('home');
											var aNav=fn.common.getByClass(oHome, 'nav');
											var aNavLine=fn.common.getByClass(oHome, 'navLine');
											var aShowWindow=fn.common.getByClass(oHome, 'showWindow');
											
											for(var i=0; i<aNavLine.length; i++)
											{
												if(aNavLine[i].timer)
												{
													return true;
												}
											}
											
											for(var j=0; j<aShowWindow.length; j++)
											{
												if(aShowWindow[j].timer)
												{
													return true;
												}
											}
											
											return false;
										},
										
						moveBullet:		function (json)
										{
											var oHome=document.getElementById('home');
											
											var speed=json.bulSpeed;
											var r=json.r;
											
											var oBul=json.oBul;
											var deg=json.bulDeg;
											var leftStart=json.leftStart;
											var topStart=json.topStart;
											
											var speedX=speedY=lastX=lastY=0;
											
											clearInterval(oBul.timer);
											
											var fns={
													collTest:	fn.homeFn.collTest,
													getCenPos:	fn.homeFn.getCenPos,
													getPos:		fn.common.getPos,
													setLR:		fn.homeFn.setLR,
													getByClass:	fn.common.getByClass,
													moveNav:	fn.homeFn.moveNav,
													move:		fn.move.move
												};
											var aNav=fns.getByClass(oHome, 'nav');
											
											oBul.timer=setInterval(function ()
											{
												r+=speed;
												if(	fns.getPos(oBul).left<0 
													|| fns.getPos(oBul).top<0 
													|| fns.getPos(oBul).left>document.documentElement.clientWidth-oBul.offsetWidth 
													|| fns.getPos(oBul).top>document.documentElement.clientHeight-oBul.offsetHeight
												)
												{
													oBul.parentNode.removeChild(oBul);
													
													clearInterval(oBul.timer);
												}
												else
												{
													oBul.style.left=leftStart+fns.setLR({r:r, R:json.R, deg:json.bulDeg}).left+'px';
													oBul.style.top=topStart+fns.setLR({r:r, R:json.R, deg:json.bulDeg}).top+'px';
													
													speedX=oBul.offsetLeft-lastX;
													speedY=oBul.offsetTop-lastY;
													
													lastX=oBul.offsetLeft;
													lastY=oBul.offsetTop;
													
													for(var i=0; i<aNav.length; i++)
													{
														if(fns.collTest(fns.getCenPos(oBul), fns.getCenPos(aNav[i]), fns.getCenPos(aNav[i]).r))
														{
															var allUnFired=true;
															for(var aa=0; aa<aNav.length; aa++)
															{
																if(aNav[aa].fired)
																{
																	allUnFired=false;
																}
															}
															/*
															//监测碰撞位置
															var a1=Common.getPos(oBul).top+oBul.offsetHeight/2;
															var a2=Common.getPos(aNav[i]).top+aNav[i].offsetHeight/2;
															if(a1>a2)
															{
																var up=true;
															}
															else
															{
																var up=false;
															}
															*/
															
															if(!fn.homeFn.testTimer()&&allUnFired&&!aNav[i].isShowing)
															{	
												
																	for(var k=0; k<aNav.length; k++)
																	{
																		aNav[k].fired=false;
																	}
																	aNav[i].fired=true;
																	
																	
																	clearInterval(oBul.timer);
																	Common.bomb(oBul);
																	oBul.parentNode.removeChild(oBul);
																	
																	
																	fns.moveNav(aNav[i], {speed_x: speedX, speed_y: speedY}, function (obj)
																	{
																		fn.homeFn.afterNavMove(obj);
																		
																	});	
																	
																	//未被击中的nav的动作
																	
																	var aNavInfo=fn.homeFn.moveNav.prototype.aNavInfo;
																
																	for(var j=0; j<aNav.length; j++)
																	{
																		if(aNav[j]!=aNav[i]&&(!aNav[j].crossBar))
																		{
																			fns.moveNav(aNav[j], {speed_x: -30, speed_y: 0});
																		}
																	}
																
																}
															else
															{
																//oBul.style.background='red';
																Common.crashed(oBul, speedX, speedY)//, up);//Common.bomb(oBul);
																//oBul.parentNode.removeChild(oBul);
																
																/*
																产生爆炸效果未完成
																*/
															}
														}
													}
													
												}
											}, 30);
										},
										
						
					}
	};
	
	modules.exports={
		home: function ()
			{
				var pi=Math.PI;
				var deg=0;
				
				fns={
						setStyle3:		fn.common.setStyle3,
						getPos:			fn.common.getPos,
						moveBullet:		fn.homeFn.moveBullet,
						getCenPos:		fn.homeFn.getCenPos,
						createLine:		fn.homeFn.createLine,
						createBullet:	fn.homeFn.createBullet,
						getByClass:		fn.common.getByClass,
						addEvent:		fn.common.addEvent,
					};
				
				
				(function ()
				{
					var oHome=document.getElementById('home');
					var oBar=fns.getByClass(oHome, 'sideBar')[0];
					oBar.style.height=(document.documentElement.clientHeight>590?document.documentElement.clientHeight:590)+'px';
					var oGameBg=document.getElementById('gameBg');
					
					oGameBg.style.height=oBar.offsetHeight+'px';
					
					var  aNav=Common.getByClass(document, 'nav');
					for(var i=0; i<aNav.length; i++)
					{
						aNav[i].style.top=oBar.offsetHeight*(10+i*30)/100+'px';
					}
					
				})();
				
				
				/*//画连线	-----------------------------------------------------待定
				(function ()
				{
					var oHome=document.getElementById('home');
					
					fns.createLine(fns.getByClass(oHome, 'nav'));
					
				})();*/
				
				
				//创建炮盘
				(function ()
				{
					var oHome=document.getElementById('home');
					var oFortress=fns.getByClass(oHome, 'fortress')[0];
					
					for(var i=0; i<60; i++)
					{
						var oDiv=document.createElement('div');
						
						oDiv.className="small";
						
						fns.setStyle3(oDiv, 'transform', 'rotate('+6*i+'deg)');
						fns.setStyle3(oDiv, 'transformOrigin', 'center '+oFortress.offsetHeight/2+'px');
						
						oFortress.appendChild(oDiv);
					}
					
					var oMuzzle=fns.getByClass(oHome, 'muzzle')[0];
					fns.setStyle3(oMuzzle, 'transformOrigin', 'center 150px');
				})();
				
				//导航框参数初始化
				(function ()
				{
					var aNav=fns.getByClass(document.getElementById('home'), 'nav');
					var aTarget=fns.getByClass(document, 'target');
					
					for(var i=0; i<aNav.length; i++)
					{
						aNav[i].speed_x=aNav[i].speed_y=0;
						aNav[i].fired=false;
						aNav[i].index=i;
						aNav[i].pos=[];
						aNav[i].alreadyShowed=false;
						aNav[i].isShowing=false;
						
						if(aTarget[i])
						{aNav[i].targetPos={
							left:	Common.getPos(aTarget[i]).left+aTarget[i].offsetWidth/2-aNav[i].offsetWidth/2,
							top:	Common.getPos(aTarget[i]).top+aTarget[i].offsetHeight/2-aNav[i].offsetHeight/2
						}};
					}
				})();
				
				//游戏图层
				(function ()
				{
					var oGameBg=document.getElementById('gameBg');
					
					oGameBg.style.height=document.documentElement.clientHeight+'px';
					
					window.zIndex=1000000000000;
					
					oGameBg.style.zIndex=1;//window.zIndex;
				})();
			
				//模块图层
				(function ()
				{
					var oModularBg=document.getElementById('modularBg');
					
					oModularBg.style.height=document.documentElement.clientHeight+'px';
					
					oModularBg.style.zIndex=window.zIndex;
				})();
				
				
				//向我开炮
				(function ()
				{
					var aNav=Common.getByClass(document, 'nav');
					var oFireme=document.getElementById('fireme');
					
					var oSideBar=Common.getByClass(document, 'sideBar')[0];
					
					for(var i=0; i<aNav.length; i++)
					{
						(function (index)
						{
							Common.addEvent(document, 'mousemove', function (ev)
							{
								var oEvent=ev||event;
								var src=oEvent.srcElement||oEvent.target;
								
								var oTestUserAgentBg=document.getElementById('testUserAgentBg');
								var oTestUserAgent=document.getElementById('testUserAgent');
								
								if(Common.isChild(oTestUserAgent, src)||Common.isChild(oTestUserAgentBg, src))
								{
									return;
								}
								
								if(!aNav[index].crossBar)
								{
									oFireme.style.display='block';
									oFireme.style.left=oEvent.clientX+'px';
									oFireme.style.top=oEvent.clientY+'px';
								}
								else
								{
									if(oEvent.clientX<oSideBar.offsetWidth)
									{
										oFireme.style.display='block';
										oFireme.style.left=oEvent.clientX+'px';
										oFireme.style.top=oEvent.clientY+'px';
									}
									else
									{
										oFireme.style.display='none';
									}
								}
							});
						})(i);
						
					}
					
				})();
				
				(function ()
				{
					var oFortress=Common.getByClass(document, 'fortress')[0];
					var oFortressBox=Common.getByClass(document, 'fortressBox')[0];
					var oSideBar=Common.getByClass(document, 'sideBar')[0];
					
					oFortressBox.hide=false;
					
					//设置枪口转向
					fns.addEvent(document, 'mousemove', function (ev)
					{
						var oEvent=ev||event;
						var src=oEvent.srcElement||oEvent.target;
						
						var oTestUserAgentBg=document.getElementById('testUserAgentBg');
						var oTestUserAgent=document.getElementById('testUserAgent');
						
						if(Common.isChild(oTestUserAgent, src)||Common.isChild(oTestUserAgentBg, src))
						{
							return;
						}
						
						if(oFortress.crossBar)
						{
							if(oEvent.clientX<oSideBar.offsetWidth)
							{
								if(oFortressBox.hide)
								{
									Common.startMove(oFortressBox, {right: -150});
									oFortressBox.hide=false;
								}
							}
							else
							{
								if(!oFortressBox.hide)
								{
									oFortressBox.hide=true;
									Common.startMove(oFortressBox, {right: -300});
								}
							}
							
						}
						
						moveFort();
						
						function moveFort ()
						{
							var oHome=document.getElementById('home');
							var oFortress=fns.getByClass(oHome, 'fortress')[0];
							
							var a=oEvent.clientX-fn.homeFn.getCenPos(oFortress).x;
							var b=fn.homeFn.getCenPos(oFortress).y-oEvent.clientY;	
							var oMuzzle=Common.getByClass(oHome, 'muzzle')[0];
							
							setDer(a, b, oMuzzle);
							
						}
					});
				})();
				
				function setDer (a, b, obj)
				{
					if(a>=0&&b>=0)
					{
						deg=(Math.atan(a/b))*(180/Math.PI);
					}
					else if(a>0&&b<0)
					{
						deg=180+(Math.atan(a/b))*(180/Math.PI);
					}
					else if(a<=0&&b<0)
					{
						deg=180+(Math.atan(a/b))*(180/Math.PI);
					}
					else
					{
						deg=360+(Math.atan(a/b))*(180/Math.PI);
					}
					
					Common.setStyle3(obj, 'transform', 'rotate('+deg+'deg)');
				}
				
				(function ()
				{
					//发射子弹
					var oFireme=document.getElementById('fireme');
					fns.addEvent(oFireme, 'click', function (ev)
					{
						var oMuzzle=Common.getByClass(document, 'muzzle')[0];
						Common.startMove(oMuzzle, {marginTop: 50}, {end: function ()
						{
							Common.startMove(oMuzzle, {marginTop: 0});
						}});
						
						var oEvent=ev||event;
						var src=oEvent.srcElement||oEvent.target;
						
						var oFortress=Common.getByClass(document, 'fortress')[0];
						
						var oHome=document.getElementById('home');
						var oBox=fns.getByClass(oHome, 'fortressBox')[0];
						var leftStart=oBox.offsetLeft;
						var topStart=oBox.offsetTop;
						
						var oBul=fn.homeFn.createBullet({oParent: oHome, leftStart: leftStart, topStart: topStart, deg: deg});
						//设置子弹转向
						var oHome=document.getElementById('home');
						var oFortress=fns.getByClass(oHome, 'fortress')[0];
						
						var a=oEvent.clientX-fn.homeFn.getCenPos(oFortress).x;
						var b=fn.homeFn.getCenPos(oFortress).y-oEvent.clientY;	
						
						setDer(a, b, oBul);
						
						fn.homeFn.moveBullet({r:150, R:oBox.offsetHeight/2, oBul: oBul, bulSpeed:80, bulDeg:deg, leftStart: leftStart, topStart: topStart});
						
					});
				})();
				
				//时钟
				(function ()
				{
									
					function setStyle3(obj, name, value)
					{
						var bigName=name.charAt(0).toUpperCase()+name.substring(1);
						
						obj.style['Webkit'+bigName]=value;
						obj.style['Moz'+bigName]=value;
						obj.style['ms'+bigName]=value;
						obj.style['O'+bigName]=value;
						obj.style[name]=value;
					}
					
					var oClock=document.getElementById('clock');
					var oHour=Common.getByClass(oClock, 'hour')[0];
					var oMin=Common.getByClass(oClock, 'min')[0];
					var oSec=Common.getByClass(oClock, 'sec')[0];
					
					var arr=[oHour, oMin, oSec];
					for(var i=0; i<arr.length; i++)
					{
						setOrigin3(arr[i], 'center bottom');
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
					
					change();
					
					setInterval(change, 30);
					
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
						
						setOrigin3(oSpan, 'center 90px');
					}
					
				
				})();
				
				//自动旋转
				/*(function ()
				{
					var aNav=Common.getByClass(document, 'nav');
					
					for(var i=0; i<aNav.length; i++)
					{
						(function (index)
						{
							var deg=0;
							aNav[i].nicemove_timer=setInterval(function ()
							{
								Common.setStyle3(aNav[index], 'transform', 'rotate('+(deg++)+'deg)');
							}, 100);
						})(i);
						
						
					}
				})();*/
			}
		};
});