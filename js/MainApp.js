class MainApp {
	constructor(){
		this.textArr = [
			["일과 삶의 균형을<br>디자인하는","LIFE STYLER"],
			["대한민국<br>행복지수를 높여가는","MENTAL TRAINER"],
			["사람의 성공과<br>성장을 돕는","GOOD PARTNER"]
		];
		this.isSliding = false;
		this.nowIdx = 0;
		this.init();
	}

	init(){
		this.resetInterval();
		this.addEvent();
		this.slideImg();
	}

	resetInterval(){
		clearInterval(this.interval);
		this.interval = setInterval(()=>{$(".controller-right")[0].click()},3000);
	}

	slideImg(){
		if(this.isSliding) return;
		this.nowIdx*=1;
		this.isSliding = true;
		$(".slider > img").css({zIndex:2});
		$(".slider > img").fadeOut(600);
		$(".active").removeClass("active");
		$(".slider-circles > .slider-circle").eq(this.nowIdx).addClass("active");
		let dom = $(".slider > img").eq(this.nowIdx);
		dom.css({zIndex:1});
		dom.show();
		this.animateSliderText();
		this.zoomImg(dom,1.05,1000);
		this.resetInterval();
	}

	zoomImg(dom,scale,millisecond){
		let totalAddNum = scale - 1;
		let addOneNum = totalAddNum/millisecond;
		let now = 1;
		for(let i = 0; i < millisecond; i++){
			setTimeout(()=>{
				now += addOneNum;
				dom.css({transform:`scale(${now})`});
			},i);
		}
	}

	animateSliderText(){
		let arr = this.textArr[this.nowIdx];
		$(".slider-title").html(arr[0]);
		$(".slider-title-bold").html(arr[1]);

		$(".slider-title").css({opacity : 0,marginBottom:'100px'});
		$(".slider-title").animate({opacity : 1,marginBottom:'0px'},1000);

		$(".slider-title-bold").css({opacity : 0});
		$(".slider-title-bold").animate({opacity : 1},1000,()=>{this.isSliding = false});
	}

	addEvent(){
		$("nav > ul").hover(this.headerHoverOn,this.headerHoverOut);
		$(".controller > button").on("click", this.slideBtnClick);
		$(".slider-circle").on('click', this.slideCircleClick);
	}

	slideCircleClick =  e=> {
		if(this.isSliding) return;
		this.nowIdx = e.currentTarget.dataset.idx;
		this.slideImg();
	}

	slideBtnClick = e=> {
		if(this.isSliding) return;
		let dir = e.currentTarget.dataset.dir*1;
		this.nowIdx += dir;
		if(this.nowIdx >= 3) this.nowIdx = 0;
		if(this.nowIdx <= -1) this.nowIdx = 2;
		this.slideImg();
	}

	headerHoverOn = e => {
		$("header").addClass("header-hover");
		$("#logo").addClass("logo-hover");
	}

	headerHoverOut = e => {
		$("header").removeClass("header-hover");
		$("#logo").removeClass("logo-hover");
	}
}

window.addEventListener("load",()=>{
	let mainApp = new MainApp();
});