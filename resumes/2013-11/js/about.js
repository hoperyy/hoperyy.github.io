// JavaScript Document


define(function (require, exports, module)
{
	module.exports={
						sAbout:	function ()
						{
							var str='<div id="about">'+
									'<div class="aboutBox">'+
									'<h3><span>本站用到了哪些技术？</span></h3>'+
									'<div class="about_string"></div>'+
									'<ul>'+
									'<li>原生JS制作</li>'+
									'<li>Seajs</li>'+
									'<li>Ajax</li>'+
									'<li>Jsonp</li>'+
									'<li>CSS3</li>'+
									'<li>图片预加载</li>'+
									'<li>...</li>'+
									'</ul>'+
									'</div>'+
									'</div>';
							return str;
						},
						
					};
});