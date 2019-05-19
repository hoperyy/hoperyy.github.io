// JavaScript Document


define(function (require, exports, module)
{	

	var Common=require('common_pure.js');
	module.exports={
						resume:	function ()
						{
							var str='<div id="resume">'+
									'<ul class="resume_cont">'+
									'<li class="active resume_contLi">'+
									//自我介绍
									'<div class="resume_head"><img src="/images/resume/head.jpg" alt="" /></div>'+
									'<div class="myInfo">'+
										'<h3>自我介绍</h3>'+
										'<ul class="clearfix">'+
											'<li class="smWidth">姓名： 刘远洋</li>'+
											'<li>性别:<em></em>男</li>'+
											'<li class="smWidth">年龄:<em></em>24</li>'+
											'<li>学历:<em></em>全日制本科</li>'+
											'<li class="smWidth">学校:<em></em>西安电子科技大学</li>'+
											'<li>专业:<em></em>探测制导与控制技术</li>'+
											'<li class="smWidth">毕业时间:<em></em>2012-07</li>'+
											'<li>QQ:<em></em> xxxxxxx</li>'+
											'<li class="smWidth">手机:<em></em><span>xxxxxxxx</span></li>'+
											'<li>邮箱:<em></em><span>liuyuanyangscript@gmail.com</span></li>'+
										'</ul>'+
										'<h3>求职意向</h3>'+
										'<ul class="clearfix">'+
											'<li>前端开发</li>'+
										'</ul>'+
										/*'<h3>期望薪资</h3>'+
										'<ul class="clearfix">'+
											'<li>11K/月</li>'+
										'</ul>'+*/
									'</div>'+
									//自我介绍结束
									'</li>'+
									'<li class="resume_contLi">'+
									'<ul class="resume_timeaxis">'+
									'	<li class="resume_time">2008.08--2012.07<span class="timeaxis_line"></span><span class="timeaxis_contLine"></span><ul class="timeaxis_cont">'+
									'<li>学历：全日制本科</li>'+
									'<li>学校：西安电子科技大学</li>'+
									'<li>专业：探测制导与控制技术</li>'+
									'<li>英语：六级</li>'+
									'</ul></li>'+
									'	<li class="resume_time">2012.07--2012.12<span class="timeaxis_line"></span><span class="timeaxis_contLine"></span><ul class="timeaxis_cont">'+
									'<li>公司：华为技术有限公司</li>'+
									'<li>职位：软件开发(C语言)</li>'+
									/*'<li>薪水：9K/月</li>'+*/
									'</ul></li>'+
									'	<li class="resume_time">2013.09--2013.11<span class="timeaxis_line"></span><span class="timeaxis_contLine"></span><ul class="timeaxis_cont">'+
									'<li>思考、学习</li>'+
									'<li>学习：前端开发</li>'+
									'</ul></li>'+
									'	<li class="resume_time">2013.11--至今<span class="timeaxis_contLine"></span><ul class="timeaxis_cont">'+
									'<li>求职</li>'+
									'<li>意向职位：前端开发</li>'+
									'</ul></li>'+
									'</ul>'+
									'</li>'+
									//时间轴结束
									
									//工作能力
									'<li class="resume_contLi">'+
									'<ul class="ability">'+
									
									'<li class="ability_li">'+
									'<h3><span>HTML+CSS</span></h3>'+
									'<div class="ablity_string"></div>'+
									'<ul class="ability_list_ul">'+
									'<li>熟练制作静态页面(手写)</li>'+
									'<li>熟悉浏览器兼容性及解决方法</li>'+
									'<li>熟悉Firebug等开发调试工具</li>'+ 
									'<li>熟悉WEB标准和标签语义化</li>'+
									'</ul>'+
									'</li>'+
									
									'<li class="ability_li">'+
									'<h3><span>JavaScript</span></h3>'+
									'<div class="ablity_string"></div>'+
									'<ul class="ability_list_ul">'+
									'<li>熟悉DOM/BOM/Ajax/Jsonp</li>'+
									'<li>熟练实现常见交互效果</li>'+
									'<li>熟悉组件的编写</li>'+
									'<li>用原生JS实现JQuery的部分功能</li>'+
									'<li>熟悉性能优化常见方法</li>'+
									'</ul>'+
									'</li>'+
									
									'<li class="ability_li">'+
									'<h3><span>其他</span></h3>'+
									'<div class="ablity_string"></div>'+
									'<ul class="ability_list_ul">'+
									'<li>编码习惯良好、注重维护和扩展</li>'+
									'<li>善于钻研、渴望学习</li>'+
									'<li>nice、open</li>'+
									'</ul>'+
									'</li>'+
									
									'</ul></li>'+
									//工作能力结束
									'</ul>'+
									'<ul class="resume_nav">'+
									'<li class="active">自我介绍<span class="border"></span</li>'+
									'<li>时间轴<span class="border"></span></li>'+
									'<li>工作能力<span class="border"></span</li>'+
									'</ul>'+
									'</div>';
							return str;
						},
						
						resume_act:	function ()
						{
							var oNavBox=Common.getByClass(document, 'resume_nav')[0];
							var aNav=oNavBox.getElementsByTagName('li');
							var oContBox=Common.getByClass(document, 'resume_cont')[0];
							var aCont=Common.getByClass(oContBox, 'resume_contLi');
							
							for(var i=0; i<aNav.length; i++)
							{
								(function (index)
								{
									Common.addEvent(aNav[i], 'mouseover', function (ev)
									{
										var oEvent=ev||event;
										var from=oEvent.fromElement||oEvent.relatedTarget;
										
										if(Common.isChild(aNav[index], from))
											return;
											
										clearInterval(timer);
										now=index;
										show();
									});
									
									Common.addEvent(aNav[i], 'mouseout', function (ev)
									{
										var oEvent=ev||event;
										var to=oEvent.toElement||oEvent.relatedTarget;
										
										if(Common.isChild(aNav[index], to))
											return;
											
											
										clearInterval(timer);
										timer=setInterval(autoShow, 3000);
									});
									
								})(i);
								
							}
							
							for(var i=0; i<aNav.length; i++)
							{
								(function (index)
								{
									Common.addEvent(aCont[i], 'mouseover', function (ev)
									{
										var oEvent=ev||event;
										var from=oEvent.fromElement||oEvent.relatedTarget;
										
										if(Common.isChild(aCont[index], from))
											return;
										
										clearInterval(timer);
									});
									
									Common.addEvent(aCont[i], 'mouseout', function (ev)
									{
										var oEvent=ev||event;
										var to=oEvent.toElement||oEvent.relatedTarget;
										
										if(Common.isChild(aCont[index], to))
											return;
											
										clearInterval(timer);
										timer=setInterval(autoShow, 3000);
									});
								})(i);
								
							}
							
							var now=0;
							
							var timer=setInterval(autoShow, 3000);
							
							
							
							function autoShow()
							{
								show();
								now++;
								now==aNav.length && (now=0);
								
							}
							
							//不打开时定时器关闭
							var testDisplay=true;
							setInterval(function ()
							{
								var oResume=document.getElementById('resume');
								
								if(Common.getStyle(oResume, 'display')=='none')
								{
									clearInterval(timer);
									testDisplay=false;
								}
								else
								{
									if(!testDisplay)
									{
										timer=setInterval(autoShow, 3000);
										testDisplay=true;
									}
								}
								
							}, 3000);
							
							function show()
							{
								for(var i=0; i<aNav.length; i++)
								{
									(function (index)
									{
										aNav[i].className='';
										Common.startMove(aCont[i], {opacity: 0}, {time: 400, end: function ()
										{
											aCont[index].style.display='none';
										}});
									})(i);
									
								}
					
								aNav[now].className='active';
								aCont[now].style.display='block';
								Common.startMove(aCont[now], {opacity: 100}, {time: 400});
								/*
								now++;
								now==aNav.length && (now=0);*/
							}						
						},
						
					};
});