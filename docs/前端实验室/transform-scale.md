## 1

[](../_iframe/docs-前端实验室-transform-scale-0.html ':include')

<!-- run -->
```html
<style>
div.demo {
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transform: scale(-1, 1);
}
</style>

<div class="demo">
	scale
</div>
```

## 2

[](../_iframe/docs-前端实验室-transform-scale-1.html ':include')

<!-- run -->
```html

<style>
div.demo {
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transform: scale(1, -1);
}
</style>

<div class="demo">
	scale
</div>
```

## 3

[](../_iframe/docs-前端实验室-transform-scale-2.html ':include')

<!-- run -->
```html

<style>
div.demo {
	margin-bottom: 120px;
}
div.demo div {
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transform-origin: center bottom;
	transform: scale(1, -1);
}
</style>

<div class="demo">
	<div>
		scale
	</div>
</div>
```

## 4

[](../_iframe/docs-前端实验室-transform-scale-3.html ':include')

<!-- run -->
```html

<style>
div.demo {
	width: 100px;
	height: 100px;
	font-size: 20px;
	color: #fff;
	background: #000;
	transition: 1s all ease;
}

div.demo:hover {
	transform: scaleY(2);
}
</style>

<div class="demo"></div>
```