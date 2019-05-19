// JavaScript Document

define(function (require, exports, module)
{
	var Common=require('common_pure.js');
	var Aurl=require('aUrl.js');
	
	var aEnemy=[];
	
	/*各模块*/
	var Objects=function ()
			{
			this.oHome=document.getElementById('home');
			this.oGames=Common.getByClass(this.oHome, 'games')[0];
			this.oUl=Common.getByClass(this.oGames, 'gamesUl')[0];
			this.oPlaneBg=Common.getByClass(this.oUl, 'plane')[0];
			this.oPlayBox=Common.getByClass(this.oUl, 'play_plane')[0];
			
			this.oLoading=Common.getByClass(this.oPlayBox, 'loading')[0];//loading
			this.oHero=Common.getByClass(this.oPlayBox, 'hero')[0];//hero
			this.oBombIcon=Common.getByClass(this.oPlayBox, 'bomb_icon')[0];
			this.oPause=Common.getByClass(this.oPlayBox, 'pause')[0];
			this.oScore=Common.getByClass(this.oPlayBox, 'score')[0];
			this.oBombNum=Common.getByClass(this.oPlayBox, 'bomb_number')[0];
			
			this.aGames=Common.getByClass(this.oUl, 'gamesLi');
			this.aTitle=Common.getByClass(this.oUl, 'title');
			this.aStartGame=Common.getByClass(this.oUl, 'startGame');
			this.aCloseGame=Common.getByClass(this.oUl, 'closeGame');
			this.oShowWindow=Common.getByClass(this.oHome, 'showWindow')[0];
			
			this.oGameBg=document.getElementById('gameBg');
			this.aAskIfQuit=Common.getByClass(this.oUl, 'ask_if_quit');
			this.aAskIfGameover=Common.getByClass(this.oUl, 'ask_if_gameover');
			
			this.oGameDire=Common.getByClass(document, 'gameDire')[0];
			
			this.oProgress=Common.getByClass(this.oGames, 'progress')[0];
			this.oProgressSpan=this.oProgress.getElementsByTagName('span')[0];
			this.oProgressTxt=this.oProgress.getElementsByTagName('p')[0];
			
			
		};
		
	
	var pause_fns={	
		
		/*暂停*/
		pause_click_add:	function ()
		{
			var objects=new Objects();
			
			Common.addEvent(objects.oPause, 'click', pause_fns.pause);
		},
		
		document_keydown_pause:	function ()
		{
			
			Common.addEvent(document, 'keydown', pause_fns.document_keydown_pause_act);
		},
		
		document_keydown_pause_act:	function (ev)
		{
			var oEvent=ev||event;
			
			if(oEvent.keyCode==32)
			{
				pause_fns.pause();
			}
		},
		
		pause_click_remove:	function ()
		{
			var objects=new Objects();
			Common.removeEvent(objects.oPause, 'click', pause_fns.pause);
		},
		
		pause_on:	function ()
		{
			var objects=new Objects();
			
			
			objects.oPause.pauseon_liu=true;//暂停状态
			objects.oPause.style.background='url(/images/game_plan/game_pause_hl.png) 0 0  no-repeat';
			
			hero_fns.hero_fire_pause();
			fly_fns.all_fly_pause();
			
			hero_fns.move_hero_pause();
		
			//不再产生新enemy
			enemy_fns.enemy_act_pause();	
			blowup_fns.all_blowup_pause();
			enemy_fns.all_enemy_move_pause();
			bullet_fns.all_bullets_pause();
			
			//gift
			gift_fns.gift_pause();
			
			bomb_fns.bomb_click_pause();
			
		},
		
		pause_off:	function ()
		{
			var objects=new Objects();
			
			objects.oPause.pauseon_liu=false;//非暂停状态
			objects.oPause.style.background='url(/images/game_plan/game_pause.png) 0 0  no-repeat';
			
			//子弹恢复运动
			bullet_fns.all_bullet_move_agian();
			
			blowup_fns.blowup_again();//包括enemy和hero
			
			//恢复页面上所有的定时器
			
			//hero飞行
			hero_fns.hero_fire_again();
			hero_fns.move_hero_again();
			fly_fns.all_fly_again();
			
			//enemy
			enemy_fns.all_enemy_move_again();
			
			enemy_fns.enemy_act_again();
			
			//gift
			gift_fns.create_gift_again();
			gift_fns.move_gift_again();
			
			bomb_fns.add_bomb_click_again();
		},
		
		pause:		function ()
		{
			var objects=new Objects();
			
			if(!objects.oPause.clickPause)
			{
				objects.oPause.clickPause=true;
			}
			else
			{
				objects.oPause.clickPause=false;
			}
			
			
			if(!objects.aAskIfGameover[window.nowGameIndex].askingIfGameOver)
			{
				
				if(!objects.oPause.pauseon_liu)
				{
					pause_fns.pause_on();
				}
				else
				{
					pause_fns.pause_off();
				}
			}
			
		},
		
		/*暂停结束*/
		
		
		};
	
	
		
	var fly_fns={
		
		fly:	function (json)
		{
			(new fly_fns.Fly()).fly(json);
		},
		
		Fly:	function ()
		{
			this.hero_fly=['/images/game_plan/hero_fly_1.png', '/images/game_plan/hero_fly_2.png'];
			
			this.enemy1_fly=['/images/game_plan/enemy1_fly_1.png'];
			
			this.enemy2_fly=['/images/game_plan/enemy2_fly_1.png', '/images/game_plan/enemy2_fly_2.png'];
			
			this.enemy3_fly=['/images/game_plan/enemy3_fly_1.png'];
			
			fly_fns.Fly.prototype.fly=function (json)//{obj: obj, className: className}
			{
				//var objects=new Objects();
				var obj=json.obj;
				var className=json.className;
				
				var _this=this;
				obj.fly_timer_i=0;
				
				clearInterval(obj.fly_timer);
				obj.fly_timer=null;
				
				obj.fly_timer=setInterval(function()
				{
					(obj.fly_timer_i==_this[className+'_fly'].length)&&(obj.fly_timer_i=0);
				
					obj.style.background='url('+_this[className+'_fly'][obj.fly_timer_i]+') 0 0 no-repeat';
					obj.fly_timer_i++;
				}, 300);
				
			};
		},
		
		
		all_fly_remove:	function ()
		{
			var objects=new Objects();
			var child=objects.oPlayBox.children;
			
			for(var i=0; i<child.length; i++)
			{
				clearInterval(child[i].fly_timer);
				child[i].fly_timer=null;
			}
		},
		
		all_fly_pause:	function ()
		{
			fly_fns.all_fly_remove();
		},
		
		all_fly_again:	function ()
		{
			var objects=new Objects();
			
			var aChild=[];
			
			for(var i=0; i<objects.oPlayBox.children.length; i++)
			{
				aChild.push(objects.oPlayBox.children[i]);
			}
			
			for(var i=0; i<aChild.length; i++)
			{
				if(aChild[i]&&!(aChild[i].blowup))
				{
					fly_fns.one_fly_again({obj: aChild[i], className: aChild[i].className});
				}
			}

		},
		
		one_fly_again:	function (json)
		{
			//console.log(json.className);
			var obj=json.obj;
			var className=json.className;
			
			var _this=new fly_fns.Fly();
			
			clearInterval(obj.fly_timer);
			obj.fly_timer=null;
			
			obj.fly_timer=setInterval(function()
			{
				if(!obj.blowup)
				{
					if(_this[className+'_fly'])
					{
						(obj.fly_timer_i==_this[className+'_fly'].length)&&(obj.fly_timer_i=0);
				
						obj.style.background='url('+_this[className+'_fly'][obj.fly_timer_i]+') 0 0 no-repeat';
				
						obj.fly_timer_i++;
					}
				}
				else
				{
					clearInterval(obj.fly_timer);
					obj.fly_timer=null;
				}
			}, 300);
		},
		
		
		};
		
	var enemy_fns={
		
		
		/*enemy*/
		
		enemy_act_again:	function ()
		{
			enemy_fns.enemy_act();
		},
		
		enemy_act:	function ()
		{
			aEnemy=['enemy1', 'enemy1', 'enemy3', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy1', 'enemy2', 'enemy3', 'enemy1', 'enemy1', 'enemy1',];
			
			clearInterval(enemy_fns.enemy_act.prototype.enemy_act_timer);
			
			enemy_fns.enemy_act.prototype.enemy_act_timer=setInterval(function ()
			{
				randCreateEnemy();	
			}, 900);
			
			function randCreateEnemy ()
			{
				var randIndex=Common.rand_one(0, aEnemy.length-1);
				
				var oEnemy=enemy_fns.createEnemy(aEnemy[randIndex]);
				enemy_fns.moveEnemy(oEnemy);
	
			}
			
		},
		
		remove_enemy_act:	function ()
		{
			clearInterval(enemy_fns.enemy_act.prototype.enemy_act_timer);
		},
		
		enemy_act_pause:	function ()
		{
			enemy_fns.remove_enemy_act();
		},
		
		moveEnemy:	function (enemy)
		{
			var objects=new Objects();
			
			var speed=enemy.speed||3;
			clearInterval(enemy.move_timer);
			enemy.move_timer=setInterval(function ()
			{
				var aBullet=bullet_fns.get_all_bullet();
				for(var i=0; i<aBullet.length; i++)
				{
					if(Common.collTest(aBullet[i], enemy)&&enemy.life)
					{
						(aBullet[i].parentNode)&&(aBullet[i].parentNode.removeChild(aBullet[i]));
						
						aBullet[i].bulletType_liu==0?(enemy.life--):(enemy.life-=2);
							
					}
				}
				
				if(Common.collTest(enemy, objects.oHero))//&&!enemy.collisioned)
				{
					//enemy.collisioned=true;
					enemy.life-=2;
					objects.oHero.life-=2;
				
				}
				
				if(enemy.life<=0)
				{	
					enemy.life=0;
					enemy.blowup=true;
					blowup_fns.blowup_one({obj: enemy, className: enemy.className});
					clearInterval(enemy.move_timer);
				}
				else
				{
					if(enemy.offsetTop>=enemy.parentNode.offsetHeight)
					{
						clearInterval(enemy.move_timer);
						(enemy.parentNode)&&(enemy.parentNode.removeChild(enemy));
					}
					else
					{
						enemy.style.top=enemy.offsetTop+speed+'px';
					}
				}
				
				if(objects.oHero.life<=0)
				{
					clearInterval(enemy.move_timer);
					
					blowup_fns.blowup_one({obj: objects.oHero, className: objects.oHero.className, end: function ()
					{
						hero_fns.after_hero_destroied();
					}});
				}
				
			}, 30);
			
		},
		
		createEnemy:	function (sClass)
		{
			var objects=new Objects();
			
			var oLi=document.createElement('li');
			oLi.className=sClass;
			
			objects.oPause.parentNode.appendChild(oLi);
			
			oLi.style.top=-oLi.offsetHeight+'px';
			
			var randLeft=parseInt(Math.random()*(objects.oHero.parentNode.offsetWidth-oLi.offsetWidth-0+1));
			
			oLi.style.left=randLeft+'px';//要随机产生
			
			oLi.style.zIndex=0;
			
			//飞行
			fly_fns.fly({obj: oLi, className: oLi.className});
			
			//爆炸状态
			oLi.blowup_i=0;
			
			switch(sClass)
			{
				case 'enemy1':
					oLi.life=1;
					oLi.speed=4;
					oLi.score=1000;
					break;
				case 'enemy3':
					oLi.speed=3;
					oLi.life=3;
					oLi.score=2000;
					break;
				case 'enemy2':
					oLi.speed=2;
					oLi.life=10;
					oLi.score=5000;
			}
			
			return oLi;
		},
		
		all_enemy_move_pause:	function ()
		{
			enemy_fns.all_enemy_move_remove();
		},
		
		all_enemy_move_remove:	function ()
		{
			var objects=new Objects();
			
			//当前的enemy暂停运动
			var aEnemy=[];
			var re=/enemy/;
			for(var i=0; i<objects.oPlayBox.children.length; i++)
			{
				if(re.test(objects.oPlayBox.children[i].className))
				{
					aEnemy.push(objects.oPlayBox.children[i]);
				}
			}
			
			for(var i=0; i<aEnemy.length; i++)
			{
				clearInterval(aEnemy[i].move_timer);
			}
		},
		
		
		
		all_enemy_move_again:	function ()
		{
			var objects=new Objects();
			
			var aEnemy=[];
			var re=/enemy/;
			for(var i=0; i<objects.oPlayBox.children.length; i++)
			{
				if(re.test(objects.oPlayBox.children[i].className))
				{
					aEnemy.push(objects.oPlayBox.children[i]);
				}
			}
			
			for(var i=0; i<aEnemy.length; i++)
			{
				enemy_fns.moveEnemy(aEnemy[i]);
			}
			
		},
		
		remove_all_enemy:	function ()
		{
			var aEnemy=enemy_fns.get_all_enemy();
			
			for(var i=0; i<aEnemy.length; i++)
			{
				(aEnemy[i].parentNode)&&(aEnemy[i].parentNode.removeChild(aEnemy[i]));
			}
		},
		
		get_all_enemy:	function ()
		{
			var objects=new Objects();
			
			var aEnemy=[];
			var re=/enemy/;
			for(var i=0; i<objects.oPlayBox.children.length; i++)
			{
				if(re.test(objects.oPlayBox.children[i].className))
				{
					aEnemy.push(objects.oPlayBox.children[i]);
				}
			}
			
			return aEnemy;
		},
		
		/*enemy结束*/
		/*enemy_fns结束*/
		};
		
	var bullet_fns={
		
		/*子弹*/
		create_bullet:	function (oHero, sBulName)
		{
			var oLi=document.createElement('li');
			
			oLi.className=sBulName;
			
			(oHero.offsetParent)&&(oHero.offsetParent.appendChild(oLi));
			
			oLi.style.top=oHero.offsetTop-oLi.offsetHeight+'px';
			oLi.style.left=oHero.offsetLeft+(oHero.offsetWidth-oLi.offsetWidth)/2+'px';
			
			oLi.style.zIndex=0;
			
			oLi.bulletType_liu=oHero.bulletType;
			
			
			return oLi;
		},
		
		move_bullet_liu:	function (oBul)
		{
			var speed=40;
			clearInterval(oBul.move_timer);
			oBul.move_timer=setInterval(function ()
			{
				oBul.style.top=oBul.offsetTop-speed+'px';
				
				if(oBul.offsetTop<0)
				{
					clearInterval(oBul.move_timer);
					(oBul.parentNode)&&(oBul.parentNode.removeChild(oBul));
				}
				
					
			}, 30);
		},
		
		all_bullets_pause:	function ()
		{
			var objects=new Objects();
		
			var aBullet1=Common.getByClass(objects.oPlayBox, 'bullet1');
			var aBullet2=Common.getByClass(objects.oPlayBox, 'bullet2');
			
			for(var i=0; i<aBullet1.length; i++)
			{
				clearInterval(aBullet1[i].move_timer);	//子弹静止
			}
			for(var i=0; i<aBullet2.length; i++)
			{
				clearInterval(aBullet2[i].move_timer);
			}
			
		},
		
		all_bullet_move_agian: function ()
		{
			var objects=new Objects();
		
			var aBullet1=Common.getByClass(objects.oPlayBox, 'bullet1');
			var aBullet2=Common.getByClass(objects.oPlayBox, 'bullet2');
			
			for(var i=0; i<aBullet1.length; i++)
			{
				bullet_fns.move_bullet_liu(aBullet1[i]);
			}
			for(var i=0; i<aBullet2.length; i++)
			{
				bullet_fns.move_bullet_liu(aBullet2[i]);
			}
		},
		
		get_all_bullet: function ()
		{
			var objects=new Objects();
			
			var arr=[];
			
			var child=[];
			
			for(var i=0; i<objects.oPlayBox.children.length; i++)
			{
				child.push(objects.oPlayBox.children[i]);
			}
			
			var re=/bullet[12]/;
			
			for(var i=0; i<child.length; i++)
			{
				if(child[i]&&(re.test(child[i].className)))
				{
					arr.push(child[i]);
				}
			}
			
			return arr;
		},
		
		remove_all_bullets:	function ()
		{
			var objects=new Objects();
			
			var aBullet1=Common.getByClass(objects.oPlayBox, 'bullet1');
			var aBullet2=Common.getByClass(objects.oPlayBox, 'bullet2');
			
			while(aBullet1.length)
			{
				(aBullet1[0].parentNode)&&(aBullet1[0].parentNode.removeChild(aBullet1[0]));
			}
			
			while(aBullet2.length)
			{
				(aBullet2[0].parentNode)&&(aBullet2[0].parentNode.removeChild(aBullet2[0]));
			}
		},
		/*子弹结束*/
		
		/*bullet_fns结束*/
		};	
	
	var hero_fns={
		
		after_hero_destroied:	function ()
		{
			var objects=new Objects();
			
			pause_fns.pause_on();
			
			var oAsk=objects.aAskIfGameover[window.nowGameIndex];
			
			Common.startMove(objects.aCloseGame[0], {opacity: 0}, {end: function ()
			{
				objects.aCloseGame[0].style.display='none';
			}});
			
			oAsk.style.display='block';
			
			var aA=oAsk.getElementsByTagName('a');
			
			var quit_game=aA[0];
			var once_again=aA[1];
			
			for(var i=0; i<aA.length; i++)
			{
				(function (index)
				{
					Common.addEvent(aA[i], 'mouseover', function ()
					{
						aA[index].className='active';
					});
					Common.addEvent(aA[i], 'mouseout', function ()
					{
						aA[index].className='';
					});
				})(i);				
			}
			
			//点击事件
			Common.addEvent(quit_game, 'click', function ()
			{
				Common.startMove(oAsk, {opacity: 0}, {end: function ()
				{
					//游戏结束
					oAsk.style.display='none';
					
					plane_gameover_clearAll(window.nowGameIndex, games_act_fns.gamesLi_turn_smaller);
					
				}});
			});
			
			//再来一次
			Common.addEvent(once_again, 'click', function ()
			{
				Common.startMove(oAsk, {opacity: 0}, {end: function ()
				{
					objects.aAskIfGameover[window.nowGameIndex].askingIfGameOver=false;
					
					oAsk.style.display='none';
					
					//objects.oHero.style.background='';
					
					plane_gameover_clearAll(window.nowGameIndex, plane_game_start);
					
					objects.aCloseGame[0].style.display='block';
					Common.startMove(objects.aCloseGame[0], {opacity: 100});
					
				}});
			});
			
			Common.startMove(objects.aAskIfGameover[window.nowGameIndex], {opacity: 100}, {end: function ()
			{
				objects.aAskIfGameover[window.nowGameIndex].askingIfGameOver=true;
			}});
		},
		
		move_hero_remove:	function ()
		{
			var objects=new Objects();	
			if(objects.oHero)
			{
				clearInterval(objects.oHero.move_timer);
			}
			Common.removeEvent(document, 'keydown', hero_fns.move_hero_add.prototype.keydown);
			Common.removeEvent(document, 'keyup', hero_fns.move_hero_add.prototype.keyup);
		},
		
		move_hero_pause:	function ()
		{
			hero_fns.hero_fire_remove();
		},
		
		move_hero_again:	function ()
		{
			hero_fns.move_hero_add();
		},
		
		move_hero_add: function ()
			{
				/*
					↑: 38
					→: 39
					↓: 40
					←: 37
					空格:32
					enter: 13
					B: 66
					*/
				var objects=new Objects();
				
				if(objects.oHero)
				{
					var oHero=objects.oHero;
					
					var bLeft=bRight=bUp=bDown=false;
					
					hero_fns.move_hero_add.prototype.keydown=keydown;
					hero_fns.move_hero_add.prototype.keyup=keyup;
						
					Common.removeEvent(document, 'keydown', keydown);
					Common.removeEvent(document, 'keyup', keyup);
					
					Common.addEvent(document, 'keydown', keydown);
					Common.addEvent(document, 'keyup', keyup);
					
					clearInterval(oHero.move_timer);
					oHero.move_timer=setInterval(function ()
					{
						var speed=9;
						
						bLeft&&(oHero.style.left=oHero.offsetLeft-speed+'px');
						bUp&&(oHero.style.top=oHero.offsetTop-speed+'px');
						bRight&&(oHero.style.left=oHero.offsetLeft+speed+'px');
						bDown&&(oHero.style.top=oHero.offsetTop+speed+'px');
						
						
						(oHero.offsetLeft<0)&&(oHero.style.left=0);
						(oHero.offsetLeft>oHero.parentNode.offsetWidth-oHero.offsetWidth)&&(oHero.style.left=oHero.parentNode.offsetWidth-oHero.offsetWidth+'px');
						(oHero.offsetTop<0)&&(oHero.style.top=0);
						(oHero.offsetTop>oHero.parentNode.offsetHeight-oHero.offsetHeight)&&(oHero.style.top=oHero.parentNode.offsetHeight-oHero.offsetHeight+'px');
						
					}, 30);
			}
				
				function keydown(ev)
				{
					var oEvent=ev||event;
					
					
					switch(oEvent.keyCode)
					{
						case 37:
							bLeft=true;
							break;
						case 38:
							bUp=true;
							break;
						case 39:
							bRight=true;
							break;
						case 40:
							bDown=true;
							break;
					}
					
					//document.title='l:'+bLeft+'r:'+bRight;
				}
				
				function keyup(ev)
				{
					var oEvent=ev||event;
					
					switch(oEvent.keyCode)
					{
						case 37:
							bLeft=false;
							break;
						case 38:
							bUp=false;
							break;
						case 39:
							bRight=false;
							break;
						case 40:
							bDown=false;
							break;
					}
				}
			},
		
			
		hero_fire:		function ()
		{
			var objects=new Objects();
			
			var i=0;
			//开火
			if(objects.oHero)
			{	
				clearInterval(objects.oHero.fire_timer);
				objects.oHero.fire_timer=setInterval(function ()
				{
					if(objects.oHero.bulletType==0)
					{
						
						bullet_fns.move_bullet_liu(bullet_fns.create_bullet(objects.oHero, 'bullet1'));
					}
					else
					{
						bullet_fns.move_bullet_liu(bullet_fns.create_bullet(objects.oHero, 'bullet2'));
					}
				}, 200);
			}
		},
		
		hero_fire_again:	function ()
		{
			hero_fns.hero_fire();
		},
		
		hero_fire_remove:	function ()
		{
			var objects=new Objects();
			if(objects.oHero)
			{	
				clearInterval(objects.oHero.fire_timer);
			}
		},
		
		hero_fire_pause:	function ()
		{
			hero_fns.hero_fire_remove();
		},
		
		/*hero_fns结束*/
		};
	
	
	var blowup_fns={
		
		
		all_blowup_remove:	function ()
		{
			var objects=new Objects();
			
			var aChild=objects.oPlayBox.children;
			
			for(var i=0; i<aChild.length; i++)
			{
				clearInterval(aChild[i].blowup_timer);
			}
		},
		
		all_blowup_pause:	function ()
		{
			blowup_fns.all_blowup_remove();
		},
		
		blowup_again:	function ()
		{
			var objects=new Objects();
			var aChild=[];
			
			var re=/enemy/;
			for(var i=0; i<objects.oPlayBox.children.length; i++)
			{
				if(re.test(objects.oPlayBox.children[i].className))
				{
					aChild.push(objects.oPlayBox.children[i]);
				}
			}
			
			aChild.push(objects.oHero);
			
			for(var i=0; i<aChild.length; i++)
			{
				if(aChild[i]&&aChild[i].blowup)
				{
					blowup_fns.one_blowup_again({obj: aChild[i], className: aChild[i].className});
				}
			}
			
		},
		
		one_blowup_again:	function (json)
		{
			blowup_fns.blowup_action(json);
		},
		
		Blowup_bg:	function ()
		{
			this.hero_blowup=['/images/game_plan/hero_blowup_1.png', '/images/game_plan/hero_blowup_2.png', '/images/game_plan/hero_blowup_3.png', '/images/game_plan/hero_blowup_4.png'];
			
			this.enemy1_blowup=['/images/game_plan/enemy1_blowup_1.png', '/images/game_plan/enemy1_blowup_2.png', '/images/game_plan/enemy1_blowup_3.png', '/images/game_plan/enemy1_blowup_4.png'];
			
			this.enemy2_blowup=['/images/game_plan/enemy2_blowup_1.png', '/images/game_plan/enemy2_blowup_2.png', '/images/game_plan/enemy2_blowup_3.png', '/images/game_plan/enemy2_blowup_4.png', '/images/game_plan/enemy2_blowup_5.png', '/images/game_plan/enemy2_blowup_6.png', '/images/game_plan/enemy2_blowup_7.png'];
			
			this.enemy3_blowup=['/images/game_plan/enemy3_blowup_1.png', '/images/game_plan/enemy3_blowup_2.png', '/images/game_plan/enemy3_blowup_3.png', '/images/game_plan/enemy3_blowup_4.png'];
		},
		
		blowup_action:	function (json)
		{
			var objects=new Objects();
			var obj=json.obj;
			var className=json.className;
			var _this=new blowup_fns.Blowup_bg();
			
			clearInterval(obj.blowup_timer);
			obj.blowup_timer=null;
			
			//停止飞行
			clearInterval(obj.fly_timer);
			obj.fly_timer=null;
			
			obj.blowup_timer=setInterval(function()
			{					
				//停止飞行
				clearInterval(obj.fly_timer);
				obj.fly_timer=null;
				
				if(_this[className+'_blowup'])
				{
					if(obj&&(obj.blowup_i==_this[className+'_blowup'].length))
					{
						//clearInterval(obj.move_timer);
						(obj.parentNode)&&(obj.parentNode.removeChild(obj));
						clearInterval(obj.blowup_timer);
						obj.blowup_timer=null;
						
						objects.oScore.score+=obj.score;
						
						objects.oScore.innerHTML=objects.oScore.score;
						
						
					}
					else
					{
						//obj.blowup=true;
						obj.style.background='url('+_this[className+'_blowup'][obj.blowup_i]+') 0 0 no-repeat';
						
						if((json.end)&&(obj.blowup_i==_this[className+'_blowup'].length-1))
						{
							json.end&&json.end();
							clearInterval(obj.blowup_timer);
						}
						
						obj.blowup_i++;
					}
					
				}
				else
				{
					alert(className+'_blowup 不存在');
				}
			}, 100);
		},
		
		blowup_one:	function (json)
		{
			blowup_fns.blowup_action(json);
		},
		/*blowup_fns结束*/
		};
	
	var score_fns={
		
		get_score:	function ()
		{
			var objects=new Objects();
			//获取所有enemy
			var aEnemy=enemy_fns.get_all_enemy();
			
			for(var i=0; i<aEnemy.length; i++)
			{
				if(aEnemy[i].blowup)
				{
					objects.oScore.score+=aEnemy[i].score;
					objects.oScore.innerHTML=objects.oScore.score;
				}
			}
			
		},
		
		};
	
		
	var bomb_fns={
			
			add_bomb_click_again:	function ()
			{
				bomb_fns.add_bomb_click();
			},
			
			add_bomb_click:	function ()
			{
				var objects=new Objects();
				
				Common.addEvent(objects.oBombIcon, 'click', bomb_fns.bomb_click);
			},
			
			bomb_click:	function ()
			{
				var objects=new Objects();
				
				if(objects.oBombNum.number==0)
				{
					return;
				}
				else 
				{
					objects.oBombNum.number--;
					
					if(objects.oBombNum.number==0)
					{
						objects.oBombIcon.style.display='none';
						objects.oBombNum.style.display='none';
					}
					
					objects.oBombNum.innerHTML='×'+objects.oBombNum.number;
					
					//全部爆炸
					var aEnemy=enemy_fns.get_all_enemy();
					
					for(var i=0; i<aEnemy.length; i++)
					{
						aEnemy[i].life=0;
					}
				}
			},
			
			remove_bomb_click:	function ()
			{
				var objects=new Objects();
				Common.removeEvent(objects.oBombIcon, 'click', bomb_fns.bomb_click);
			},
			
			bomb_click_pause:	function ()
			{
				bomb_fns.remove_bomb_click();
			},
			
		};
	
	var gift_fns={
		
		gift_move_level_1:	function(oGift)//0--100
		{
			oGift.move_level_1=true;
			oGift.move_level_2=false;
			oGift.move_level_3=false;
			
			gift_fns.gift_buffer_move(oGift, 100, function ()
			{
				if(oGift)
				{
					gift_fns.gift_move_level_2(oGift);
				}
			});
		},
		
		gift_move_level_2:	function (oGift)
		{
			oGift.move_level_1=false;
			oGift.move_level_2=true;
			oGift.move_level_3=false;
			
			gift_fns.gift_buffer_move(oGift, 0, function ()
			{
				if(oGift)
				{
					gift_fns.gift_move_level_3(oGift);
				}
			});
		},
		
		gift_move_level_3:	function (oGift)
		{
			var objects=new Objects();
			
			oGift.move_level_1=false;
			oGift.move_level_2=false;
			oGift.move_level_3=true;
			
			var maxHeight=oGift.parentNode.offsetHeight-oGift.offsetHeight;
			
			clearInterval(oGift.go_down_timer);
			oGift.go_down_timer=setInterval(function ()
			{
				if(Common.collTest(objects.oHero, oGift))
				{
					clearInterval(oGift.go_down_timer);
					gift_fns.gift_hero_coll(oGift);
				}
				else
				{
					if(oGift.offsetTop>=maxHeight)
					{
						clearInterval(oGift.go_down_timer);
						(oGift.parentNode)&&(oGift.parentNode.removeChild(oGift));
					}
					else
					{
						oGift.style.top=oGift.offsetTop+20+'px';
			
					}
				}
			}, 30);
		},
		
		gift_hero_coll:	function (oGift)
		{
			var objects=new Objects();
			
			switch(oGift.giftType)
			{
				case 0:	//'bullet_gift'
					//变换子弹
					objects.oHero.bulletType=1;
					clearTimeout(objects.oHero.changeBulletTimeout);
					objects.oHero.changeBulletTimeout=setTimeout(function ()
					{
						objects.oHero.bulletType=0;
						clearTimeout(objects.oHero.changeBulletTimeout);
					}, 20000);
					break;
				case 1:
					objects.oBombIcon.style.display='block';
					objects.oBombNum.number++;
					objects.oBombNum.innerHTML='×'+objects.oBombNum.number;
					objects.oBombNum.style.display='block';
					break;
			}
			//oGift 消失
			(oGift.parentNode)&&(oGift.parentNode.removeChild(oGift));
			
		},
		
		hero_changeBulletTimeout_pause:		function ()
		{
			var objects=new Objects();
			clearTimeout(objects.oHero.changeBulletTimeout);
		},
		
		remove_hero_changeBulletTimeout:	function ()
		{
			var objects=new Objects();
			clearTimeout(objects.oHero.changeBulletTimeout);
		},
		
		gift_buffer_move:	function (oGift, iTarget, fnEnd)
		{
			var objects=new Objects();
			
			clearInterval(oGift.move_timer);
			oGift.move_timer=setInterval(function ()
			{
				var speed=(iTarget-oGift.offsetTop)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				
				if(Common.collTest(objects.oHero, oGift))
				{
					clearInterval(oGift.move_timer);
					gift_fns.gift_hero_coll(oGift);
				}
				else
				{
					if(oGift.offsetTop==iTarget)
					{
						clearInterval(oGift.move_timer);
						fnEnd && fnEnd(oGift);
					}
					else
					{
						oGift.style.top=oGift.offsetTop+speed+'px';
					}
				}
			}, 30);
			
			
		},
		
		create_gift:	function ()
		{
			var objects=new Objects();
			
			var type=['bullet_gift', 'bomb_gift'];
			
			clearTimeout(gift_fns.create_gift.timer);
			gift_fns.create_gift.timer=setTimeout(innerCreateGift, 10000);
			
			function innerCreateGift ()
			{
				
				var rndClass=type[Common.rand_one(0, type.length-1)];
				
				var oGift=document.createElement('li');
				
				oGift.className=rndClass;
				
				switch(rndClass)
				{
					case 'bullet_gift':
						oGift.giftType=0;
						break;
					case 'bomb_gift':
						oGift.giftType=1;
						break;
					default:
						alert(rndClass+'类名错误');
						break;
				}
				
				objects.oPlayBox.appendChild(oGift);
				
				oGift.style.left=Common.rand_one(0, objects.oPlayBox.offsetWidth-oGift.offsetWidth)+'px';
				oGift.style.top=-oGift.offsetHeight+'px';
				
				gift_fns.gift_move_level_1(oGift);
				
				clearTimeout(gift_fns.create_gift.timer);
				gift_fns.create_gift.timer=setTimeout(innerCreateGift, Common.rand_one(20000, 30000));
			
			}
		},
		
		create_gift_again:	function ()
		{
			gift_fns.create_gift();
		},
		
		move_gift_again:	function ()
		{
			var aGift=gift_fns.get_all_gifts();
			
			for(var i=0; i<aGift.length; i++)
			{
				if(aGift[i])
				{
					if(aGift[i].move_level_1)
					{
						gift_fns.gift_move_level_1(aGift[i]);
					}
					else if(aGift[i].move_level_2)
					{
						gift_fns.gift_move_level_2(aGift[i]);
					}
					else if(aGift[i].move_level_3)
					{
						gift_fns.gift_move_level_3(aGift[i]);
					}
				}
			}
		},
		
		gift_pause:	function ()
		{
			gift_fns.create_gift_pause();
			gift_fns.gift_move_pause();
			gift_fns.hero_changeBulletTimeout_pause();
		},
		
		remove_gift_move:	function ()
		{
			gift_fns.gift_pause();
		},
		
		remove_create_gift:	function ()
		{
			clearInterval(gift_fns.create_gift.timer);
		},
		
		create_gift_pause:	function ()
		{
			clearInterval(gift_fns.create_gift.timer);
		},
		
		gift_move_pause:	function ()
		{
			var aGift=gift_fns.get_all_gifts();
			
			for(var i=0; i<aGift.length; i++)
			{
				clearInterval(aGift[i].go_down_timer);
				clearInterval(aGift[i].move_timer);
			}
		},
		
		get_all_gifts:	function ()
		{
			var objects=new Objects();
			
			var re=/gift/;
			
			var aChild=[];
			
			for(var i=0; i<objects.oPlayBox.children.length; i++)
			{
				aChild.push(objects.oPlayBox.children[i]);
			}
			
			return aChild;
		},
		
		remove_all_gifts:	function ()
		{
			var aChild=gift_fns.get_all_gifts();
			var re=/gift/;
			
			for(var i=0; i<aChild.length; i++)
			{
				if(aChild[i]&&(re.test(aChild[i].className)))
				{
					(aChild[i].parentNode)&&(aChild[i].parentNode.removeChild(aChild[i]));
				}
			}
		},
		
		/*gift_fns结束*/
		
		};
		
	/*各模块结束*/
	
	
	
	/*游戏主体*/
	
	//初始化
	var plane_init=	function (fn_after_plane_init)
	{
		
		var objects=new Objects();
		
		//play_plane宽高变化
		objects.oPlayBox.style.display='block';
		
		objects.oHero.style.display='block';
		objects.oPause.style.display='block';
		objects.oScore.style.display='block';
		objects.oBombIcon.style.display='none';
		objects.oBombNum.style.display='none';
		objects.aCloseGame[0].style.display='block';
		objects.aCloseGame[0].style.opacity=1;
		objects.aCloseGame[0].style.filter='alpha(opacity: 100)';
		
		objects.oHero.style.background='';
		
		objects.aAskIfGameover[window.nowGameIndex].style.display='none';
		
		objects.oPlayBox.style.width=objects.oPlayBox.parentNode.offsetWidth+'px';
		objects.oPlayBox.style.height=objects.oPlayBox.parentNode.offsetHeight+'px';	
		objects.oHero.style.left=(objects.oPlayBox.offsetWidth-objects.oHero.offsetWidth)/2+'px';
		objects.oHero.style.top=objects.oPlayBox.offsetHeight-objects.oHero.offsetHeight+'px';
		
		//提示：'home.js': window.zIndex=1000000000000;
		
		objects.aAskIfGameover[window.nowGameIndex].style.zIndex=window.zIndex+3;
		
		//初始化分数
		objects.oScore.score=0;
		objects.oScore.innerHTML=0;
		
		//初始化bomb数量
		objects.oBombNum.number=0;
		
		//hero移动
		hero_fns.move_hero_add();
		
		//hero飞行状态
		(new fly_fns.Fly()).fly({obj: objects.oHero, className: 'hero'});
		
		//hero开火
		objects.oHero.bulletType=0;//默认开火类型
		
		//hero生命值
		objects.oHero.life=2;
		
		//ask_if_gameover时鼠标click暂停图标时用
		objects.aAskIfGameover[window.nowGameIndex].askingIfGameOver=false;
		
		//hero爆炸背景
		objects.oHero.blowup_i=0;
		
		objects.oPause.pauseon_liu=false;//默认不暂停
		objects.oPause.clickPause=false;
		
		pause_fns.pause_click_add();//暂停事件
		pause_fns.document_keydown_pause();
		
		bomb_fns.add_bomb_click();
		
		//检测游戏加载时间
		window.loadImgFailed=false;
		
		/*初始化结束*/
		
		/*游戏开始*/
		fn_after_plane_init&&fn_after_plane_init();
		
	};
	
	
	var plane_game_start=function ()
	{
		var objects=new Objects();
		
		objects.oProgress.style.display='block';
		objects.oProgress.style.opacity=1;
		objects.oProgress.style.filter='alpha(opacity: 100)';
		objects.oProgressSpan.style.width=0;
		
		//载入图片开始时间
		var loadImgStart=(new Date()).getTime();
		var loadImgEnd;
		
		//载入图片
		var aUrlGame=Aurl.aUrlGame();
		var count=0;
		
		var loadImgFailed=false;
		
		Common.startMove(objects.aCloseGame[0], {opacity: 0}, {end: function ()
		{
			objects.aCloseGame[0].style.display='none';
		}});
		for(var i=0; i<aUrlGame.length; i++)
		{
			Common.loadImg(aUrlGame[i], function ()
			{
				//加载结束时间
				loadImgEnd=(new Date()).getTime();
				if((loadImgEnd-loadImgStart)>400000)
				{
					if(!loadImgFailed)
					{
						loadImgFailed=true;
					
						alert('游戏加载失败，请检查您的网络状况');
						Common.startMove(objects.oProgress, {opacity: 0}, {end: function ()
						{
							objects.oProgress.style.display='none';
						
							//退出游戏
							plane_gameover_clearAll(0, games_act_fns.gamesLi_turn_smaller);
								
						}});
					}
					
					return;
				}
				else
				{
					count++;
							
					objects.oProgressSpan.style.width=(count/aUrlGame.length)*objects.oProgress.offsetWidth+'px';
					objects.oProgressTxt.innerHTML='已加载'+((count/aUrlGame.length)*100).toFixed(0)+'%';
					
					if(count==aUrlGame.length)
					{
						objects.aCloseGame[0].display='block';
						Common.startMove(objects.aCloseGame[0], {opacity: 100});
						
						Common.startMove(objects.oProgress, {opacity: 0}, {end: function ()
						{
							objects.oProgress.style.display='none';
							
							//图片载入完成后
							plane_init(function ()
							{
								gift_fns.create_gift();
								hero_fns.hero_fire();
								enemy_fns.enemy_act();
							});
						}});
						
						
					}
				}
				
				
				
			});
		}
		
		
	};
	
	var plane_gameover_clearAll=function (index, end)
	{
		var objects=new Objects();
							
		objects.oLoading.style.display='none';
		objects.oHero.style.display='none';
		objects.oBombIcon.style.display='none';
		objects.oBombNum.style.display='none';
		objects.oPlayBox.style.display='none';
		objects.oPause.style.display='none';
		objects.oScore.style.display='none';
		
		window.loadImgFailed=false;
		
		objects.oHero.style.background='';
		
		objects.aAskIfGameover[window.nowGameIndex].style.opacity=0;
		objects.aAskIfGameover[window.nowGameIndex].style.filter='alpha(opacity: 0)';
		
		//删除绑定事件
		Common.removeEvent(objects.oPause, 'click', pause_fns.pause);
		Common.removeEvent(document, 'keydown', pause_fns.document_keydown_pause_act);
		Common.addEvent(objects.oBombIcon, 'click', bomb_fns.bomb_click);
		
		objects.oScore.score=0;
		objects.oScore.innerHTML=0;
		
		objects.oHero.blowup_i=0;
		
		hero_fns.hero_fire_remove();
		hero_fns.move_hero_remove();
		
		fly_fns.all_fly_remove();
		
		pause_fns.pause_click_remove();
	
		gift_fns.remove_create_gift();
		gift_fns.remove_gift_move();
		gift_fns.remove_all_gifts();
		gift_fns.remove_hero_changeBulletTimeout();
		
		bullet_fns.remove_all_bullets();
		
		blowup_fns.all_blowup_remove();
		
		enemy_fns.all_enemy_move_remove();
		enemy_fns.remove_enemy_act();
		enemy_fns.remove_all_enemy();
		
		bomb_fns.remove_bomb_click();
				
		//clearAll处理结束
		end&&end(index);
	};
	
	/*游戏主体结束*/
	
	var games_act_fns={
		
			gamesLi_mouseover: function (index)
			{
				var objects=new Objects();
				
				Common.startMove(objects.aStartGame[index], {opacity: 100});
			},
			
			gamesLi_mouseout:	function (index)
			{
				var objects=new Objects();
				
				Common.startMove(objects.aStartGame[index], {opacity: 0});
			},
			
			begin_one_game:	function (index)
			{
				//游戏开始
				switch(index)
				{
					case 0:		//打飞机
						plane_game_start();	
						break;
					case 1:		//其他游戏
						break;
				}
			},
			
			after_gameBg_appear:	function (index)
			{
				var objects=new Objects();
				
				objects.aCloseGame[index].style.display='block';
				Common.startMove(objects.aCloseGame[index], {opacity: 100});
				
				Common.startMove(objects.aTitle[index], {opacity: 0}, {end: function ()
				{
					objects.aTitle[index].style.display='none';	
				}});
				
				games_act_fns.begin_one_game(index);
			},
			
			after_gamesLi_turn_bigger: function (index)
			{
				
				var objects=new Objects();
				
				//添加背景层
				objects.oGameBg.style.display='block';
				objects.aGames[index].style.zIndex=1;//window.zIndex+1;
				
				Common.startMove(objects.oGameBg, {opacity: 90}, { end: function ()
				{
					games_act_fns.after_gameBg_appear(index);
				}});	
				
				objects.oGameDire.style.display='block';
				objects.oGameDire.style.zIndex=objects.aGames[index].style.zIndex;
				objects.oGameDire.style.left=objects.aGames[0].offsetLeft-objects.oGameDire.offsetWidth+'px';
				objects.oGameDire.style.top=objects.oPlayBox.offsetTop+'px';
				
				Common.startMove(objects.oGameDire, {opacity: 100});
			},
			
			gamesLi_onclick:	function (ev, index)
			{
				var objects=new Objects();
				
				//记录当前是哪个游戏页面
				window.nowGameIndex=index;
				
				//更换背景
				//objects.oPlaneBg.style.background='url(../..//images/game_plan/background_2.png) 0 0 repeat';
				
				
				var oEvent=ev||event;
				var src=oEvent.srcElement||oEvent.target;
				if(src.className.indexOf('startGame')!=-1)
				{
					
					objects.aStartGame[index].style.display='none';
					
					objects.oShowWindow.style.overflow='visible';
					
					Common.startMove(
						objects.aGames[index], 
						{
							width: objects.aGames[index].bigWidth, height: objects.aGames[index].bigHeight, 
							left: (objects.oShowWindow.offsetWidth-objects.aGames[index].bigWidth)/2, 
							marginTop: -Common.getPos(objects.aGames[index]).top+10
						}, 
						{
							end: function ()
								{
									games_act_fns.after_gamesLi_turn_bigger(index);
								}
						});
				}	
			},
			
			after_gamesLi_turn_smaller: function (index) 
			{
				var objects=new Objects();
				
				Common.startMove(objects.oGameBg, {opacity: 0}, {end: function ()
				{
					objects.oGameBg.style.display='none';
					objects.aGames[index].style.zIndex=0;
					
					objects.aTitle[index].style.display='block';
					Common.startMove(objects.aTitle[index], {opacity: 100});
					
					objects.oShowWindow.style.overflow='hidden';
					objects.aStartGame[index].style.display='block';
				}});
			},
			
			gamesLi_turn_smaller:	function (index)
			{
				var objects=new Objects();
				
				Common.startMove(objects.aCloseGame[index], {opacity: 0}, {end: function ()
				{
					objects.aCloseGame[index].style.display='none';
				}});
			
				Common.startMove(objects.oGameDire, {opacity: 0}, {time: 100, end: function ()
				{
					objects.oGameDire.style.display='none';
					
					Common.startMove(objects.aGames[index], {width: objects.aGames[index].oldWidth, height: objects.aGames[index].oldHeight, left: objects.aGames[index].oldLeft, marginTop: 0}, {end: function ()
					{	
						games_act_fns.after_gamesLi_turn_smaller(index);
					}});
				}});
				
			},
			
			aCloseGame_onclick:	function (index)
			{
				var objects=new Objects();
				
				switch(index)
				{
					case 0:	//打飞机
					
						var oAskIfQuit=objects.aAskIfQuit[index];
						
						Common.startMove(objects.aCloseGame[index], {opacity: 0}, {end: function ()
						{
							objects.aCloseGame[index].style.display='none';
						}});
						
						oAskIfQuit.style.display='block';
						oAskIfQuit.style.zIndex=window.zIndex+2;
						
						//暂停
						pause_fns.pause_on();
						
						Common.startMove(oAskIfQuit, {opacity: 100});
						
						var aA=oAskIfQuit.getElementsByTagName('a');
						
						var quit_game=aA[0];
						var back_to_game=aA[1];
						
						function after_backToGame_click ()
						{
							Common.startMove(oAskIfQuit, {opacity: 0}, {end: function ()
							{
								objects.aCloseGame[index].style.display='block';
								Common.startMove(objects.aCloseGame[index], {opacity: 100});
								
								oAskIfQuit.style.display='none';
								
								(!objects.oPause.clickPause)&&(pause_fns.pause_off());
								
								Common.removeEvent(back_to_game, 'click', after_backToGame_click);
							}});
							
							
						}
						
						function after_quitGame_click ()
						{
							Common.startMove(oAskIfQuit, {opacity: 0}, {end: function ()
							{
								oAskIfQuit.style.display='none';
								
								//退出游戏
								plane_gameover_clearAll(index, games_act_fns.gamesLi_turn_smaller);
								
								Common.removeEvent(quit_game, 'click', after_quitGame_click);
							}});
						}
						
						
						
						Common.addEvent(back_to_game, 'click', after_backToGame_click);
						Common.addEvent(quit_game, 'click', after_quitGame_click);
						
						for(var i=0; i<aA.length; i++)
						{
							(function (index)
							{
								Common.addEvent(aA[i], 'mouseover', function ()
								{
									aA[index].className='active';
								} );
								Common.addEvent(aA[i], 'mouseout', function ()
								{
									aA[index].className='';
								});
							})(i);
							
						}
						
						
						break;
					case 1:	//其他游戏
						break;
				}
					
			},
			
			
		};
	
	module.exports={
		
		games_act:	function ()
		{
			var objects=new Objects();
				
			objects.oUl.style.marginTop=-objects.oUl.offsetHeight/2+'px';
			objects.oUl.style.height=0;
			
			//转换布局
			Common.changeStyle2Absolute(objects.aGames);
			
			//记录每个游戏要放大的大小和位置
			for(var i=0; i<objects.aGames.length; i++)
			{
				objects.aGames[i].bigWidth=480;//可能会变
				objects.aGames[i].bigHeight=document.documentElement.clientHeight-20;
				objects.aGames[i].oldLeft=objects.aGames[i].offsetLeft;
				objects.aGames[i].oldWidth=objects.aGames[i].offsetWidth;
				objects.aGames[i].oldHeight=objects.aGames[i].offsetHeight;
				
			}
			
			
			for(var i=0; i<objects.aGames.length; i++)
			{
				(function (index)
				{
					Common.addEvent(objects.aGames[i], 'mouseover', function ()
					{
						games_act_fns.gamesLi_mouseover(index);
					});
					
					Common.addEvent(objects.aGames[i], 'mouseout', function () 
					{
						games_act_fns.gamesLi_mouseout(index);
					});
					
					Common.addEvent(objects.aGames[i], 'click',function (ev) 
					{
						games_act_fns.gamesLi_onclick(ev, index);
					});
				})(i);
			}
			
			
			for(var i=0; i<objects.aCloseGame.length; i++)
			{
				(function (index)
				{
					Common.addEvent(objects.aCloseGame[i], 'click', function ()
					{	
						games_act_fns.aCloseGame_onclick(index);
					});
				})(i);
			}
		},
		
		
		};
});