class MainApp {
	constructor(){
		this.textArr = [
			["일과 삶의 균형을<br>디자인하는","LIFE STYLER"],
			["대한민국<br>행복지수를 높여가는","MENTAL TRAINER"],
			["사람의 성공과<br>성장을 돕는","GOOD PARTNER"]
		];
		this.isSliding = false;
		this.nowIdx = 0;
		this.preScroll = 0;
		this.scrollIdx = 0;
		this.isScrolling = false;
		this.screenHeight = $(window).height();

		this.init();
	}

	init(){
		this.resetInterval();
		this.addEvent();
		this.slideImg();
		this.showWeb();
	}

	showWeb(){
		let date = new Date();
		let txt = `${date.getFullYear()}/${(date.getMonth()+1+"").padStart(2,"0")}/${(date.getDate()+"").padStart(2,"0")} ${(date.getHours()+"").padStart(2,"0")}:${(date.getMinutes()+"").padStart(2,"0")}:${(date.getSeconds()+"").padStart(2,"0")}`;
		$(".about-stock-date").html(txt);
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
		document.querySelector("html,body").addEventListener("mousewheel", this.scrollEvent,{passive:false});
		window.addEventListener("keydown",this.windowKeydown);
		$(window).on("resize",this.resizeWindow);
		$(".support-icon").hover(this.iconHoverOn,this.iconHoverOut);
	}

	iconHoverOn = e => {
		$(".support-icon").css({opacity:0.6});
		$(e.currentTarget).css({opacity:1});
	}

	iconHoverOut = e => {
		$(".support-icon").css({opacity:1});
	}

	windowKeydown = e => {
		if(e.keyCode >= 32 && e.keyCode <= 40){
			e.preventDefault();
			e.stopPropagation();
		}
	}

	resizeWindow =  e => {
		this.screenHeight = $(window).height();
	}

	scrollEvent = e =>{
		e.preventDefault();
		e.stopPropagation();
		if(this.isScrolling) return;
		this.isScrolling = true;
		let down = e.deltaY > 0;

		this.scrollIdx += down ? 1 : -1;
		if(this.scrollIdx >= 3) this.scrollIdx = 2;
		if(this.scrollIdx <= 0) this.scrollIdx = 0;

		if(this.scrollIdx == 1) this.aboutAnimation();
		if(this.scrollIdx == 2) this.iconsRotateAnimation();
		else $(".support-icon > img").css({transform : `rotateY(0deg)`});

		if(this.scrollIdx != 0) $("header").addClass("is-sticky");
		else $("header").removeClass("is-sticky");



		let top = this.scrollIdx * this.screenHeight;
		$("html,body").animate({scrollTop:top},500,(e)=>{
			this.isScrolling = false;
		});
	}

	iconsRotateAnimation(){
		$(".support-icon > img").css({transform : `rotateY(360deg)`});
	}

	aboutAnimation(){
		$(".about-animate").each((idx,dom)=>{
			this.animateDomAbout($(dom),idx*100);
		});
	}

	animateDomAbout(dom,delay){
		dom.css({top:`${50+delay}px`,opacity:0.5});
		setTimeout(()=>{dom.animate({top:0,opacity:1},1000)},delay);
	}

	slideCircleClick = e=> {
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