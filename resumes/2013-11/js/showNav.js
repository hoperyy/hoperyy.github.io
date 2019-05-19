// JavaScript Document

define(function (require, exports, module)
{
	var Common=require('common_pure.js');
	var Works=require('works.js');
	var CSW=require('createShowWindow.js');
	
	var getByClass=Common.getByClass;
	var move=Common.startMove;
	var createShowWindow=CSW.createShowWindow;
	
	module.exports={
						showNav:	function (nav)
						{
							var oSideBar=Common.getByClass(document, 'sideBar')[0];
							var oPackup=document.getElementById('packup');
							var aNav=getByClass(document.getElementById('home'), 'nav');
							
							var oClock=document.getElementById('clock');
							
							function clockShow ()
							{
								Common.startMove(oClock, {right: 0});
							}
							
							function clockHide ()
							{
								if(document.documentElement.clientWidth-180-900<=oClock.offsetWidth)
								{
									Common.startMove(oClock, {right: -oClock.offsetWidth});
								}
							}
							
							var oHome=document.getElementById('home');
							
							var dis2ScreenTop=10;
							var showWindowTop=nav.offsetTop+nav.offsetHeight/2;
							
							var showWindowMt=-showWindowTop+dis2ScreenTop;
							var showWindowHeight=oSideBar.offsetHeight-dis2ScreenTop*2;//document.documentElement.clientHeight-dis2ScreenTop*2;
						
							if(!getByClass(oHome, 'showWindow').length)
							{
								var oTmp=createShowWindow(oHome);
								oTmp.onclick=function (ev)
								{
									var oEvent=ev||event;
									
									oEvent.cancelBubble=true;
								};
								oTmp.index=-1;
							}
							
							var oShowWindow=getByClass(document.getElementById('home'), 'showWindow')[0];
							
							if(!getByClass(nav, 'navLine').length)//没有此子元素
							{
								var oDiv=document.createElement('div');
								
								nav.appendChild(oDiv);
								
								oDiv.className='navLine';
							}
							
							//收起动作
							Common.addEvent(oPackup, 'click', function ()
							{
								move(oPackup, {width: 0, opacity: 0}, {time: 300, end: function ()
								{
									oPackup.style.display='none';
									oShowWindow.index=-1;
									nav.fired=false;
									for(var i=0; i<aNav.length; i++)
									{
										aNav[i].isShowing=false;
										aNav[i].fired=false;
									}
									for(var i=0; i<oShowWindow.children.length; i++)
									{
										(function (index)
										{
									
											move(oShowWindow.children[i], {opacity: 0}, {time: 400, end: function ()
											{
												oShowWindow.children[index].style.display='none';
											}});	
										})(i);										
									}
								
									clockShow();
									move(oShowWindow, {width: 0}, {end: function ()
									{
										/*Common.startMove(oClock, {right: 0});*/
										
										for(var i=0; i<aNav.length; i++)
										{
											var oNavLine=getByClass(aNav[i], 'navLine')[0];
											oNavLine&&(move(oNavLine, {width: 0}));
										}
									}});
								}});
							});
							
							nav.navLineStartWidth=oShowWindow.offsetLeft-nav.offsetLeft-nav.offsetWidth;
							
							
							if(oShowWindow.index!=nav.index)
							{
								move(oPackup, {width: 0, opacity: 0}, {time: 300, end: function ()
								{
									for(var i=0; i<oShowWindow.children.length; i++)
									{
										(function (index)
										{
											move(oShowWindow.children[i], {opacity: 0}, {time: 700, end: function ()
											{
												oShowWindow.children[index].style.display='none';
											}});	
										})(i);										
									}
									oPackup.style.display='none';
									move(oShowWindow, {height: 0, marginTop: 0}, {end: function ()
									{
										clockShow();
										
									for(var i=0; i<aNav.length; i++)
									{
										var oNavLine=getByClass(aNav[i], 'navLine')[0];
										
										aNav[i].isShowing=false;
										
										(function (oNavLine, index)
										{
											if(aNav[i].fired)
											{
												aNav[i].isShowing=true;
												if(oNavLine)
												{
													move(oNavLine, {width: nav.navLineStartWidth}, {time: 400, end: function()
													{
														oShowWindow.index=nav.index;
														oShowWindow.style.top=showWindowTop+'px';
														oShowWindow.style.width=900+'px';
														
														clockHide();//不要盖住showWindow
														
														move(oShowWindow, {
															height: showWindowHeight, 
															marginTop: showWindowMt,
															},
															 
														{end: function ()
														{
															oPackup.style.top=oShowWindow.offsetTop+oShowWindow.offsetHeight/2+'px';
															oPackup.style.left=oShowWindow.offsetLeft+oShowWindow.offsetWidth+'px';
															oPackup.style.display='block';
															move(oPackup, {width: 30, opacity: 100});
															
															//设定所有子元素的宽高
															for(var aa=0; aa<oShowWindow.children.length; aa++)
															{
																oShowWindow.children[aa].style.width=oShowWindow.style.width;
																oShowWindow.children[aa].style.height=oShowWindow.style.height;
															}
															
															nav.fired=false;
															
															//为每个子元素添加与nav对应的索引
															for(var i=0; i<oShowWindow.children.length; i++)
															{
																var child=oShowWindow.children[i];
																
																if(child.id=='resume')
																{
																	child.index=0;
																}
																else if(child.className.indexOf('allWorks')!=-1)
																{
																	child.index=1;
																}
																else if(child.id=='about')
																{
																	child.index=2;
																}
															}
															
															for(var i=0; i<oShowWindow.children.length; i++)
															{
																if(oShowWindow.children[i].index==nav.index)
																{
																	move(oShowWindow.children[i], {opacity: 100}, {time: 700});
																}
															}
															
															
															//3个nav内容展示
															//获取当前showWindow的内容
															
															for(var i=0; i<oShowWindow.children.length; i++)
															{
																if(oShowWindow.children[i].index==nav.index)
																{
																	var nowShow=oShowWindow.children[i];
																}
															}
															nowShow.style.display='block';
															
															switch(nav.index)
															{
																case 0:
																	
																	break;
																case 1:
																
																	nowShow.style.height=Common.getStyle(nowShow.parentNode, 'height');
																	nowShow.style.width=Common.getStyle(nowShow.parentNode, 'width');														
																	var oWorkList=Common.getByClass(nowShow, 'worklist')[0];
																	oWorkList.style.marginTop=-oWorkList.offsetHeight/2+'px';
																	oWorkList.style.height=oWorkList.offsetHeight+'px';
																	
																	//alert(nowShow.className);
																	if(nowShow.className=='allWorks')
																	{
																		nowShow.children[0].style.width=oShowWindow.offsetWidth+'px';
																		nowShow.children[0].style.height=oShowWindow.offsetHeight-202+'px';
																		nowShow.children[0].style.marginTop=0;
																		nowShow.children[0].style.paddingTop=(oShowWindow.offsetHeight-202)/2+'px';
																	}
																	
																	Works.actions(nowShow);
																	
																	var oWorks=nowShow//Common.getByClass(nowShow, 'allWorks')[0];
																	var aWorkItem=Common.getByClass(oWorkList, 'workItem');
																	
																	var aWorkDetail=Common.getByClass(oShowWindow, 'worksDetail');
																	
																	var oWorkListTips=Common.getByClass(document, 'worklist_tips')[0];
																	
																	
																	for(var i=0; i<aWorkItem.length; i++)
																	{
																		//每个workItem添加索引
																		aWorkItem[i].contIndex='works'+(i+1);
																		
																		(function (index)
																		{
																			//aWorkItem[index].downTime=0;
																			Common.addEvent(aWorkItem[i], 'mousedown', function
																			()
																			{
																		
																				var oDate=new Date();
																				aWorkItem[index].downTime=oDate.getTime();
																				
																				
																			});
																			
																			
																			Common.addEvent(aWorkItem[i], 'mouseup', function
																			()
																			{
																				var oDate=new Date();
																				
																				if((oDate.getTime()-aWorkItem[index].downTime)<200)
																				{
																				
																					move(oWorks, {opacity: 0}, {end: function 
																					()
																					{
																						oWorks.style.display='none';
																						
																						//对应的Item详细内容显示
																						for(var j=0; j<aWorkDetail.length; j++)
																						{
																							if(aWorkDetail[j].index==aWorkItem[index].contIndex)
																							{
																								aWorkDetail[j].style.display='block';
																								move(aWorkDetail[j], {opacity: 100});
																							}
																						}
																					
																					}});
																				}
																				
																				
																			});	
																			
																			Common.addEvent(aWorkItem[i], 'mouseover', function ()
																			{
																				oWorkListTips.style.display='block';
																				oWorkListTips.style.left=aWorkItem[index].offsetLeft+aWorkItem[index].offsetWidth/2+'px';
																				oWorkListTips.style.top=aWorkItem[index].offsetTop-oWorkListTips.offsetHeight-10+'px';
																			});
																			
																			Common.addEvent(aWorkItem[i], 'mouseout', function ()
																			{
																				oWorkListTips.style.display='none';
																			
																			});
																			
																		})(i);
																	}
																	break;
																case 2:
																	break;
															}
															//3个nav内容展示结束
														}, time: 300});
														
														
													}, time: 300});
												}
											}
											else
											{
												if(oNavLine)
												{
													move(oNavLine, {width: 0}, {time: 400});
												}
											}
											
										})(oNavLine, i);
										
									}
								}, time: 500});
								}});
								
							}
							
						},
						
						
					};
					
});
