
define(function (require, exports, module)
{
	Common=require('common_pure.js');
	
	var bChatRoomClosed=false;
	
	Objects=function ()
	{
		this.oHead=document.getElementsByTagName('head')[0];
		this.oShowWindow=Common.getByClass(document, 'showWindow')[0];
		
		this.oPrev=Common.getByClass(document, 'webQQ_prev')[0];
		this.oNext=Common.getByClass(document, 'webQQ_next')[0];
		this.oPic=Common.getByClass(document, 'webQQ_picture')[0];
		this.aPicLi=Common.getByTag(this.oPic,'li');
		
		this.oLogAndReg=Common.getByClass(document, 'webQQ_logAndReg')[0];
		this.oBtn=Common.getByClass(this.oLogAndReg, 'webQQ_btn')[0];
		this.oUserInput=Common.getByClass(this.oLogAndReg, 'webQQ_user')[0].children[0];
		this.oUserSpan=Common.getByClass(this.oLogAndReg, 'webQQ_user')[0].children[1];
		this.oPwInput=Common.getByClass(this.oLogAndReg, 'webQQ_pw')[0].children[0];
		this.oPwSpan=Common.getByClass(this.oLogAndReg, 'webQQ_pw')[0].children[1];
		this.oReg=Common.getByTag(this.oBtn, 'a')[1];
		this.oLog=Common.getByTag(this.oBtn, 'a')[0];
		this.oHead=Common.getByTag(document, 'head')[0];
		
		this.oChatRoom=Common.getByClass(document, 'chatRoom')[0];
		this.oMsgList=Common.getByClass(this.oChatRoom, 'chatRoom_msgList')[0];
		this.oUserWindow=Common.getByClass(this.oChatRoom, 'chatRoom_userWindow')[0];
		this.oUserList=Common.getByClass(this.oUserWindow, 'chatRoom_userList')[0];
		
		//发言
		this.oInputMsg=Common.getByClass(this.oChatRoom, 'chatRoom_input')[0];
		this.oSendMsg=this.oInputMsg.getElementsByTagName('a')[0];
		this.oTxtArea=this.oInputMsg.children[0];
		
		this.aScrollBox=Common.getByClass(this.oChatRoom, 'chatRoom_scrollBox');
		this.aScrollBar=Common.getByClass(this.oChatRoom, 'chatRoom_scrollBar');
		
		this.oClose=Common.getByClass(this.oChatRoom, 'chatRoom_close')[0];
		
	};
	
	var aOldID=[];
	var aFace=['/images/webQQ/face/1.jpg', '/images/webQQ/face/2.jpg', '/images/webQQ/face/3.jpg', '/images/webQQ/face/4.jpg', '/images/webQQ/face/5.jpg', '/images/webQQ/face/6.jpg', '/images/webQQ/face/7.jpg', '/images/webQQ/face/8.jpg', '/images/webQQ/face/9.jpg', '/images/webQQ/face/10.jpg', '/images/webQQ/face/11.jpg', '/images/webQQ/face/12.jpg'];
	
	var fns={
		
		createScript:	function (url)
		{
			var objects=new Objects();
			var oScript=document.createElement('script');
			oScript.src=url;
			objects.oHead.appendChild(oScript);
		},
		
		json2str:	function (json)
		{
			json.t=Math.random();
			
			var arr=[];
			for(var i in json)
			{
				arr.push(i+'='+json[i]);
			}
			
			return arr.join('&');
		},
		
		createMsg:	function(username, post_time, content)
		{
			var objects=new Objects();
			
			var oMsg=document.createElement('div');
			
			oMsg.className='chatRoom_msg';
			oMsg.innerHTML=	'<p class="chatRoom_msgTitle">'
							+'<span>'+username+'</span>'
							+'<span>'+' '+fns.time2date(post_time)+'</span>'
							+'<span>'+' '+fns.time2second(post_time)+'</span>'
							+'</p>'
							+'<p class="chatRoom_msgTxt">'
							+content
							+'</p>';
			objects.oMsgList.appendChild(oMsg);
			
			var oBar=Common.getByClass(document, 'chatRoom_scrollBar')[0];
			var oWindow=Common.getByClass(document, 'chatRoom_msgWindow')[0];
			var oHigher=Common.getByClass(document, 'chatRoom_msgList')[0];
			oBar.style.height=oWindow.offsetHeight*oWindow.offsetHeight/oHigher.offsetHeight+'px';
		},
		time2date:	function (time)
		{
			var oDate=new Date();
			oDate.setTime(time*1000);
			var year=oDate.getFullYear();
			var month=oDate.getMonth()+1;
			var date=oDate.getDate();
			
			return year+'-'+month+'-'+date;
		},
		time2second:	function (time)
		{
			var oDate=new Date();
			oDate.setTime(time*1000);
			var hour=oDate.getHours();
			hour<10 && (hour='0'+hour);
			var minute=oDate.getMinutes();
			minute<10 && (minute='0'+minute);
			var second=oDate.getSeconds();
			second<10 && (second='0'+second);
			
			return hour+':'+minute+':'+second;
		},
		
		smallest:	function (array)
		{
			return Math.min.apply( Math, array );
		},
		
		largest:	function (array)
		{
			var oShow=document.getElementById('show');
			return Math.max.apply( Math, array );
		},
		
		checkNewMsg:	function ()
		{
			var oldMaxID=fns.largest(aOldID);
			Common.jsonp('http://zhinengshe.com/exercise/im/api.php', 
			{
				a:	'get_msg_n',
				n:	oldMaxID,
			}, function (json)
			{
				if(!bChatRoomClosed)
				{
					if(!json.err)
					{
						
						for(var i=0; i<json.data.length; i++)
						{
							aOldID.push(json.data[i]['ID']);
							fns.createMsg(json.data[i]['username'], json.data[i]['post_time'], json.data[i]['content']);
						}
						
						var timer=setTimeout(function ()
						{
							fns.checkNewMsg();
							clearTimeout(timer);
							
						}, 1000);
					}
					else
					{
						alert('获取新消息失败');
					}
				}
			});
		},
		
		createUser:	function (username, face)
		{
			var objects=new Objects();
			var oDl=document.createElement('dl');
			oDl.className='clearfix';
			oDl.innerHTML=	'<dt class="fl">'
							+'<img src='+aFace[face]+'></dt>'
							+'<dd class="fl">'+username+'</dd>';
			objects.oUserList.appendChild(oDl);
		},
		
		sendMsg:	function (json)
		{
			var objects=new Objects();
			Common.jsonp('http://zhinengshe.com/exercise/im/api.php',
			{
				a: 		'snd_msg',
				content:	objects.oTxtArea.value,
			}, function (json)
			{
				var objects=new Objects();
			
				if(!json.err)
				{
					objects.oTxtArea.value='';
				}
				else 
				{
					alert('发送消息失败');
				}
			});
		},
		
	};
	
	module.exports={
		
		webQQ_login_register:	function ()
		{	
			var objects=new Objects();
			
			Common.addEvent(objects.oShowWindow, 'click', function (ev)
			{
				var oEvent=ev||event;
				var src=oEvent.srcElement||oEvent.target;
				
				if(!Common.isChild(objects.oUserInput.parentNode, src)&&!Common.isChild(objects.oPwInput.parentNode, src))
				{
					if(objects.oUserInput.value=='')
					{
						objects.oUserSpan.style.display='block';
					}
					
					if(objects.oPwInput.value=='')
					{
						objects.oPwSpan.style.display='block';
					}
				}
				
			});
			
			//登录框
			objects.oUserInput.parentNode.onclick=function ()
			{
				objects.oUserSpan.style.display='none';
				objects.oUserInput.focus();
				
				if(objects.oPwInput.value=='')
				{
					objects.oPwSpan.style.display='block';
				}
				
			};
			objects.oPwInput.parentNode.onclick=function ()
			{
				objects.oPwSpan.style.display='none';
				objects.oPwInput.focus();
				
				if(objects.oUserInput.value=='')
				{
					objects.oUserSpan.style.display='block';
				}
			};
			
			var iNow=0;
			
			objects.oPic.onmouseover=function()
			{
				Common.startMove(objects.oPrev, {opacity: 70});
				Common.startMove(objects.oNext, {opacity: 70});
			};
			
			objects.oPic.onmouseout=function()
			{
				Common.startMove(objects.oPrev, {opacity: 0});
				Common.startMove(objects.oNext, {opacity: 0});
			};
			
			//注册
			Common.addEvent(objects.oReg, 'mouseover', function ()
			{
				objects.oReg.style.backgroundPosition='0 -30px';
			});
			Common.addEvent(objects.oReg, 'mouseout', function ()
			{
				objects.oReg.style.backgroundPosition='0 0';
			});
			
			objects.oReg.onclick=function ()
			{
				var oDate=new Date();
				var t1=oDate.getTime();
				
				var objects=new Objects();
				
				Common.jsonp('http://zhinengshe.com/exercise/im/api.php', 
				{
					a: 		'reg',
					user:	objects.oUserInput.value,
					pass:	objects.oPwInput.value,
					face:	iNow,
				}, 
				function (json)
				{
					if(!json.err)
					{
						var oDate=new Date();
						if((oDate.getTime()-t1)>5000)
						{
							alert('注册超时，请检查你的网络连接情况');
							return;
						}
						
						alert(json.msg);
						objects.oUserInput.value='';
						objects.oPwInput.value='';
					}
					else
					{
						alert('注册失败');
						objects.oUserInput.value='';
						objects.oPwInput.value='';
					}
				});
			};
			
			
			Common.addEvent(objects.oLog, 'mouseover', function ()
			{
				objects.oLog.style.backgroundPosition='0 -30px';
			});
			Common.addEvent(objects.oLog, 'mouseout', function ()
			{
				objects.oLog.style.backgroundPosition='0 0';
			});
			objects.oLog.onclick=function ()
			{
				var objects=new Objects();
				
				Common.startMove(objects.oLogAndReg, {opacity: 0}, {end: function ()
				{
					objects.oLogAndReg.style.display='none';
				}});
				
				objects.oChatRoom.style.display='block';
				Common.startMove(objects.oChatRoom, {opacity: 100}, {end: function ()
				{
					
					try
					{
						//检查超时
						var oDate=new Date();
						var t1=oDate.getTime();
						
						
						Common.jsonp('http://zhinengshe.com/exercise/im/api.php', 
						{
							a: 		'lgn',
							user:	objects.oUserInput.value,
							pass:	objects.oPwInput.value,
						},
						function (json)
						{
							if(!json.err)
							{
								var oDate=new Date();
								if((oDate.getTime()-t1)>5000)
								{
									alert('登录超时，请检查你的网络连接情况');
									return;
								}
								
								bChatRoomClosed=false;
								
								objects.oUserInput.value='';
								objects.oPwInput.value='';
								
								
								
								//创建消息列表
								Common.jsonp('http://zhinengshe.com/exercise/im/api.php',
								{
									a:	'get_msg',
								}, function (json)
								{
									if(!json.err)
									{
										for(var i=0; i<json.data.length; i++)
										{
											if((/^<style>/i).test(json.data[i]['content']))
											{
												json.data[i]['content']=json.data[i]['content'].replace(/^<style>/i, '');
											}
											if((/<style>$/i).test(json.data[i]['content']))
											{
												json.data[i]['content']=json.data[i]['content'].replace(/<style>$/i, '');
											}
											if((/\-+/i).test(json.data[i]['content']))
											{
												json.data[i]['content']=json.data[i]['content'].replace(/\-+/i, '');
											}
											
											aOldID.push(json.data[i]['ID']);
											fns.createMsg(json.data[i]['username'], json.data[i]['post_time'], json.data[i]['content']);
										}
										
										//检查新消息
										fns.checkNewMsg();
										
										//添加滚动条
										Common.scrollBar(Common.getByClass(document, 'chatRoom_scrollBar')[0],
														Common.getByClass(document, 'chatRoom_msgWindow')[0],
														Common.getByClass(document, 'chatRoom_msgList')[0] );
														
										
										
									}
									else
									{
										alert('获取消息列表失败');
									}
								});
								
								//创建用户列表
								Common.jsonp('http://zhinengshe.com/exercise/im/api.php', 
								{
									a:	'get_user_list',
								}, function (json)
								{
									if(!json.err)
									{
										for(var i=0; i<json.data.length; i++)
										{
											fns.createUser(json.data[i]['username'], json.data[i]['face']);
										}
										
										Common.scrollBar(Common.getByClass(document, 'chatRoom_scrollBar')[1],
														Common.getByClass(document, 'chatRoom_userWindow')[0],
														Common.getByClass(document, 'chatRoom_userList')[0]);
														
										Common.startMove(objects.oLogAndReg, {opacity: 0}, {end: function ()
										{
											objects.oLogAndReg.style.display='none';
											
											objects.oChatRoom.style.display='block';
											Common.startMove(objects.oChatRoom, {opacity: 100})
										}});
									}
									else
									{
										alert('获取用户列表失败');
									}
								});
								
								
								
							}
							else
							{
								alert(json.msg);
							}
							
						});
					
					
					}
					catch(e)
					{
						alert(e);
					}
					
				}});
				
				
			};
			
			//发送消息
			objects.oSendMsg.onclick=fns.sendMsg;
			objects.oTxtArea.onkeyup=function (ev)
			{
				var oEvent=ev||event;
				
				if(oEvent.keyCode==13)
				{	
					fns.sendMsg();
				}
			};
			
			//关闭聊天
			objects.oClose.onclick=function ()
			{
				Common.startMove(objects.oChatRoom, {opacity: 0}, {end: function ()
				{
					objects.oChatRoom.style.display='none';
				}});
				
				objects.oLogAndReg.style.display='block';
				Common.startMove(objects.oLogAndReg, {opacity: 100});
				
				bChatRoomClosed=true;
			};
			
		},
		
	};
});