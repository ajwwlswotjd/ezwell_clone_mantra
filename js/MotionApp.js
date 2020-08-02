class MotionApp {
	constructor(){
		this.init();
	}

	init(){
		// this.ex1();
		this.ex2();
		this.addEvent();
	}

	ex2(){
		let first = new mojs.Shape({
			shape:"circle",
			left: 0,
			top: 0,
			radius:{0:40},
			stroke:"#22b8cf",
			strokeWidth:{20:0},
			fill:"none"
		});
		let colors = ["#20c997","#479ee5","skyblue","blue"];
		let seconds = [];
		for(let i = 0; i < 4; i++){
			let second = new mojs.Shape({
				parent:first.el,
				shape:"circle",
				left: "50%",
				top: "50%",
				radius: {0:'rand(20,40)'},
				stroke:colors[i],
				strokeWidth:{10:0},
				fill:"none",
				x:'rand(-100,100)',
				y:'rand(-100,100)',
				delay:200
			});
			seconds.push(second);
		}

		document.addEventListener("click",(e)=>{
			first.tune({x:e.pageX,y:e.pageY}).replay();

			seconds.forEach(second=>{
				second.generate().replay();
			});

		});
	}

	ex1(){
		let c1 = new mojs.Shape({
			shape:"circle",
			radius:{0:50},
			left: 0,
			top: 0,
			x:0,
			y:0,
			fill:"#f4f5f9",
			stroke:"#333030",
			strokeWidth:15,
			isYoyo:true,
			isShowStart:true
		});

		document.addEventListener("click",(e)=>{
			c1.generate().tune({x:e.pageX,y:e.pageY}).replay();
		});
	}

	addEvent(){

	}
}

window.addEventListener("load",()=>{
	let motionApp = new MotionApp();
});