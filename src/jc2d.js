(function(window) {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    window.RAF = window.requestAnimFrame = window.requestAnimationFrame;
})(this);
(function() {

	window.JC = window.JC||{};

	/* 运动时间函数 */
	JC.TWEEN = {
		linear: function (t, b, c, d){  //匀速
			return c*t/d + b;
		},
		easeIn: function(t, b, c, d){  //加速曲线
			return c*(t/=d)*t + b;
		},
		easeOut: function(t, b, c, d){  //减速曲线
			return -c *(t/=d)*(t-2) + b;
		},
		easeBoth: function(t, b, c, d){  //加速减速曲线
			if ((t/=d/2) < 1) {
				return c/2*t*t + b;
			}
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInStrong: function(t, b, c, d){  //加加速曲线
			return c*(t/=d)*t*t*t + b;
		},
		easeOutStrong: function(t, b, c, d){  //减减速曲线
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
			if ((t/=d/2) < 1) {
				return c/2*t*t*t*t + b;
			}
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
			if (t === 0) { 
				return b; 
			}
			if ( (t /= d) == 1 ) {
				return b+c; 
			}
			if (!p) {
				p=d*0.3; 
			}
			if (!a || a < Math.abs(c)) {
				a = c; 
				var s = p/4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
			if (t === 0) {
				return b;
			}
			if ( (t /= d) == 1 ) {
				return b+c;
			}
			if (!p) {
				p=d*0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},    
		elasticBoth: function(t, b, c, d, a, p){
			if (t === 0) {
				return b;
			}
			if ( (t /= d/2) == 2 ) {
				return b+c;
			}
			if (!p) {
				p = d*(0.3*1.5);
			}
			if ( !a || a < Math.abs(c) ) {
				a = c; 
				var s = p/4;
			}
			else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			if (t < 1) {
				return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
						Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			}
			return a*Math.pow(2,-10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
		},
		backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
			if (typeof s == 'undefined') {
			   s = 3.70158;
			}
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		backOut: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 3.70158;  //回缩的距离
			}
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}, 
		backBoth: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 1.70158; 
			}
			if ((t /= d/2 ) < 1) {
				return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			}
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
			return c - this['bounceOut'](d-t, 0, c, d) + b;
		},       
		bounceOut: function(t, b, c, d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
			}
			return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		},      
		bounceBoth: function(t, b, c, d){
			if (t < d/2) {
				return this['bounceIn'](t*2, 0, c, d) * 0.5 + b;
			}
			return this['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
		}
	};
	/* 结束 运动时间函数 */


	JC.DTR = Math.PI/180;

	function noop(){}

    function Matrix(){
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
    }
    JC.Matrix = Matrix;
    Matrix.prototype.fromArray = function(array){
        this.a = array[0];
        this.b = array[1];
        this.c = array[3];
        this.d = array[4];
        this.tx = array[2];
        this.ty = array[5];
    };
    Matrix.prototype.toArray = function(transpose){
        if(!this.array) this.array = new JC2D.Float32Array(9);
        var array = this.array;

        if(transpose){
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        }else{
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        }
        return array;
    };
    Matrix.prototype.apply = function(pos, newPos){
        newPos = newPos || {};
        newPos.x = this.a * pos.x + this.c * pos.y + this.tx;
        newPos.y = this.b * pos.x + this.d * pos.y + this.ty;
        return newPos;
    };
    Matrix.prototype.applyInverse = function(pos, newPos){
        var id = 1 / (this.a * this.d + this.c * -this.b);
        newPos.x = this.d * id * pos.x + -this.c * id * pos.y + (this.ty * this.c - this.tx * this.d) * id;
        newPos.y = this.a * id * pos.y + -this.b * id * pos.x + (-this.ty * this.a + this.tx * this.b) * id;
        return newPos;
    };
    Matrix.prototype.translate = function(x, y){
        this.tx += x;
        this.ty += y;
        return this;
    };
    Matrix.prototype.scale = function(x, y){
        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;
        return this;
    };
    Matrix.prototype.rotate = function(angle){
        var cos = Math.cos( angle );
        var sin = Math.sin( angle );
        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;
        this.a = a1 * cos-this.b * sin;
        this.b = a1 * sin+this.b * cos;
        this.c = c1 * cos-this.d * sin;
        this.d = c1 * sin+this.d * cos;
        this.tx = tx1 * cos - this.ty * sin;
        this.ty = tx1 * sin + this.ty * cos;
        return this;
    };
    Matrix.prototype.append = function(matrix){
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        this.a  = matrix.a * a1 + matrix.b * c1;
        this.b  = matrix.a * b1 + matrix.b * d1;
        this.c  = matrix.c * a1 + matrix.d * c1;
        this.d  = matrix.c * b1 + matrix.d * d1;
        this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
        this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
        return this;
    };
    Matrix.prototype.identity = function(){
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        return this;
    };
	JC.identityMatrix = new Matrix();

	function Animate(){
		this.MST = 0;
		this.MAT = 300;
		this.fx = 'easeIn';
		this.complete = noop;
		this.moving = false;
		this.infinity = false;
		this.alternate = false;
		this.repeats = 0;
	}
	Animate.prototype.moveTween = function(opts){
		this.MST = Date.now();
		this.MATR = opts.attr||this.MATR;
		this.MAT = opts.time||this.MAT;
		this.fx = opts.fx||this.fx;
		this.complete = opts.complete||this.complete;
		this.infinity = opts.infinity||this.infinity;
		this.alternate = opts.alternate||this.alternate;
		this.repeats = opts.repeats||this.repeats;
		this.moving = true;
		this.MATRC = {};
		for(var i in this.MATR){
			this.MATRC[i] = this[i];
		}
	};
	Animate.prototype.manager = function(){
		if(!this.moving)return;
		var now = Date.now();
		if(now < this.MST+this.MAT){
			this.nextPose();
		}else{
			this.setVal(this.MATR);
			if(this.repeats>0||this.infinity){
				this.repeats>0&&--this.repeats;
				if(this.alternate){
					this.moveTween({attr: this.MATRC});
				}else{
					this.setVal(this.MATRC);
					this.moveTween({attr: this.MATR});
				}
			}else{
				this.moving = false;
				this.complete();
				if(now>this.MST)this.complete = noop;
			}
		}
	};
	Animate.prototype.nextPose = function(){
		var now=Date.now()-this.MST;
		for(var i in this.MATR){
			this[i] = JC.TWEEN[this.fx]( now , this.MATRC[i] , this.MATR[i] - this.MATRC[i] , this.MAT );
		}
	};

	function DisplayObject(){
    	Animate.call( this );
		this.visible = true;
		this.worldAlpha = 1;
		this.alpha = 1;

		this.scaleX = 1;
		this.scaleY = 1;

		this.skewX = 0;
		this.skewY = 0;

		this.rotation = 0;
		this.rotationCache = 0;
	    this._sr = 0;
	    this._cr = 1;
		
		this.x = 0;
		this.y = 0;
		
		this.pivotX = 0;
		this.pivotY = 0;

		this.mask = noop;

    	this.parent = null;
		this.worldTransform = new Matrix();
	}
    JC.DisplayObject = DisplayObject;
    DisplayObject.prototype = Object.create( Animate.prototype );
    DisplayObject.prototype.constructor = JC.DisplayObject;
	DisplayObject.prototype.isVisible = function(){
		return !!(this.visible && this.alpha>0 && this.scaleX*this.scaleY>0);
	};
	DisplayObject.prototype.removeMask = function(){
		this.mask = noop;
	};
	DisplayObject.prototype.setVal = function(vals){
		if(vals===undefined)return;
		for(var key in vals){
			if(this[key]===undefined){
				continue;
			}else{
				this[key] = vals[key];
			}
		}
	};
	DisplayObject.prototype.updateMe = function(){
	    var pt = this.parent.worldTransform;
	    var wt = this.worldTransform;

	    var a, b, c, d, tx, ty;

	    if(this.rotation % 360){
	        if(this.rotation !== this.rotationCache){
	            this.rotationCache = this.rotation;
	            this._sr = Math.sin(this.rotation*JC.DTR);
	            this._cr = Math.cos(this.rotation*JC.DTR);
	        }

	        a  =  this._cr * this.scaleX;
	        b  =  this._sr * this.scaleX;
	        c  = -this._sr * this.scaleY;
	        d  =  this._cr * this.scaleY;
	        tx =  this.x;
	        ty =  this.y;

	        if(this.pivotX || this.pivotY){
	            tx -= this.pivotX * a + this.pivotY * c;
	            ty -= this.pivotX * b + this.pivotY * d;
	        }
	        wt.a  = a  * pt.a + b  * pt.c;
	        wt.b  = a  * pt.b + b  * pt.d;
	        wt.c  = c  * pt.a + d  * pt.c;
	        wt.d  = c  * pt.b + d  * pt.d;
	        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
	        wt.ty = tx * pt.b + ty * pt.d + pt.ty; 
	    }else{
	        a  = this.scaleX;
	        d  = this.scaleY;

	        tx = this.x - this.pivotX * a;
	        ty = this.y - this.pivotY * d;

	        wt.a  = a  * pt.a;
	        wt.b  = a  * pt.b;
	        wt.c  = d  * pt.c;
	        wt.d  = d  * pt.d;
	        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
	        wt.ty = tx * pt.b + ty * pt.d + pt.ty;
	    }
	    this.worldAlpha = this.alpha * this.parent.worldAlpha;
	};
	DisplayObject.prototype.updateTransform = function(){
		this.manager();
		this.updateMe();
	};
	DisplayObject.prototype.setTransform = function(ctx){
		var matrix = this.worldTransform;
		ctx.globalAlpha = this.worldAlpha;
		ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
	};


    function Container(){
    	JC.DisplayObject.call( this );
        this.cds = [];
    }
    JC.Container = Container;
    Container.prototype = Object.create( JC.DisplayObject.prototype );
    Container.prototype.constructor = JC.Container;
    Container.prototype.addChilds = function (cd){
        if(cd === undefined)return cd;
        var l = arguments.length;
        if(l > 1){
            for (var i=0; i<l; i++) { this.addChilds(arguments[i]); }
            return arguments[l-1];
        }
        if(cd.parent){ cd.parent.removeChilds(cd); }
        cd.parent = this;
        this.cds.push(cd);
        return cd;
    };
    Container.prototype.removeChilds = function (){
        var l = arguments.length;
        if(l > 1){
            for (var i=0; i<l; i++) { this.removeChilds(arguments[i]); }
        }else if(l===1){
            for(var a=0;a<this.cds.length;a++){
                if(this.cds[a]===arguments[0]){
                    this.cds[a].parent = null;
                    this.cds.splice(a,1);
                    a--;
                }
            }
        }
    };
    Container.prototype.updateTransform = function (){
		this.manager();
		this.updateMe();
		this.cds.length>0&&this.updateChilds();
    };
    Container.prototype.updateChilds = function (){
        for (var i=0,l=this.cds.length; i<l; i++) {
            var cd = this.cds[i];
            cd.updateTransform();
        }
    };
    Container.prototype.render = function (ctx){
		ctx.save();
		this.setTransform(ctx);
		this.mask(ctx);
		this.renderMe(ctx);
		this.cds.length>0&&this.renderChilds(ctx);
		ctx.restore();
    };
    Container.prototype.renderMe = function (){
        return true;
    };
    Container.prototype.renderChilds = function (ctx){
        for (var i=0,l=this.cds.length; i<l; i++) {
            var cd = this.cds[i];
            if (!cd.isVisible())continue;
            cd.render(ctx);
        }
    };

    function Sprite(opts){
    	JC.Container.call( this );
        this.image = opts.image;
        this._imageW = this.image.width;
        this._imageH = this.image.height;
        this.width = opts.width||this._imageW;
        this.height = opts.height||this._imageH;
        this.regX = .5*this.width;
        this.regY = .5*this.height;
        this._cF = 0;
        this.count = opts.count||1;
        this.sH = opts.sH||0;
        this.sW = opts.sW||0;
        this.loop = false;
        this.repeatF = 0;
        this.preTime = Date.now();
        this.interval = 60;
    }
    JC.Sprite = Sprite;
    Sprite.prototype = Object.create( JC.Container.prototype );
    Sprite.prototype.constructor = JC.Sprite;
    Sprite.prototype.getFrameInfor = function(){
        var obj = {
                x: this.sW,
                y: this.sH
            };
        if(this._cF>0){
            obj.x = this.sW + this._cF*this.width;
        }
        return obj;
    };
    Sprite.prototype.renderMe = function (ctx){
        var obj = this.getFrameInfor();
        ctx.drawImage(this.image, obj.x, obj.y, this.width, this.height, -this.regX, -this.regY, this.width, this.height);
        this.upFS();
    };
    Sprite.prototype.upFS = function (){
        if(!this.canFrames)return;
        var time = Date.now(),
            ok = time-this.preTime>this.interval;
        if(ok){
            this._cF++;
            this.preTime = time;
        }
        if(this._cF>=this.count){
            if(this.repeatF<0){
                this.canFrames = false;
                this.onEnd();
            }
            this._cF = 0;
            if(!this.loop)this.repeatF--;
        }
    };
    Sprite.prototype.goFrames = function (opts){
        if(this.count<=1)return;
        this.canFrames = true;
        this.loop = opts.loop||false;
        this.repeatF = opts.repeatF||0;
        this.onEnd = opts.end||noop;
        this.preTime = Date.now();
        this._cF = 0;
    };

    /** TODO: drawTriangles a mesh frame 
	 *  can have perspective effect
	 *
	 *
     */
	function Strip(){}



	function Graphics(){
    	JC.Container.call( this );
    	this.cacheCanvas = null;
	}
	JC.Graphics = Graphics;
	Graphics.prototype = Object.create( JC.Container.prototype );
	Graphics.prototype.constructor = JC.Graphics;
    Graphics.prototype.renderMe = function (ctx){
    	if(this.cached&&!!this.cacheCanvas){
    		if(this.cache){
    			this.cacheCanvas = this.cacheCanvas||document.createElement('canvas');
    			this.width = this.cacheCanvas.width = this.session.width;
    			this.height = this.cacheCanvas.height = this.session.height;
    			this._ctx = this.cacheCanvas.getContext("2d");
    			this._ctx.clearRect(0,0,this.width,this.height);
	        	this.draw(this._ctx);
	        	this.cached = true;
	        	this.cache = false;
    		}
    		this.cacheCanvas&&ctx.drawImage(this.cacheCanvas, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
    	}else{
	        this.draw(ctx);
    	}
    };
	Graphics.prototype.drawCall = function(fn,opts){
		if(typeof fn !=='function')return;
		this.cache = opts.cache||false;
		this.cached = false;
		this.session = opts.session||{width:100,height:100};
		this.draw = fn||noop;
	};



	function Text(text,font,color){
    	JC.Container.call( this );
		this.text = text;
		this.font = font;
		this.color = color;
	}
	JC.Text = Text;
	Text.prototype = Object.create( JC.Container.prototype );
	Text.prototype.constructor = JC.Text;
	Text.prototype.renderMe = function(ctx){
		ctx.fillStyle = this.color;
		ctx.font=this.font;
		ctx.fillText(this.text,0,0);
	};



    function Stage(id,bgColor){
    	JC.Container.call( this );
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.cds = [];
        this.canvas.style.backgroundColor = bgColor || "transparent";
        this.autoClear = true;
        this.width = this.canvas.width;
        this.height = this.canvas.height;


	    if("imageSmoothingEnabled" in this.ctx)
	        this.ctx.imageSmoothingEnabled = true;
	    else if("webkitImageSmoothingEnabled" in this.ctx)
	        this.ctx.webkitImageSmoothingEnabled = true;
	    else if("mozImageSmoothingEnabled" in this.ctx)
	        this.ctx.mozImageSmoothingEnabled = true;
	    else if("oImageSmoothingEnabled" in this.ctx)
	        this.ctx.oImageSmoothingEnabled = true;
    }
    JC.Stage = Stage;
    Stage.prototype = Object.create( JC.Container.prototype );
    Stage.prototype.constructor = JC.Stage;
    Stage.prototype.resize = function (w,h){
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
    };
    Stage.prototype.render = function (){
        this.updateChilds();
        this.renderChilds();
    };
    Stage.prototype.renderChilds = function (){
    	this.ctx.setTransform(1,0,0,1,0,0);
        if(this.autoClear)this.ctx.clearRect(0,0,this.width,this.height);
        
        for (var i=0,l=this.cds.length; i<l; i++) {
            var cd = this.cds[i];
            if (!cd.isVisible())continue;
            cd.render(this.ctx);
        }
    };



	/* 纹理预加载器 */
	function ImagesLoad(json){
		this.sprite = {};
		this.OKNum = 0;
		this.errNum = 0;
		this.totalNum = 0;
		this.imagesLoad(json);
	}
	ImagesLoad.prototype.imagesLoad = function (json){
		var This = this;
		for(var img in json){
			this.sprite[img] = new Image();
			this.totalNum++;
			this.sprite[img].onload = function (){
				This.OKNum++;
				if(This.OKNum>=This.totalNum){
					This.imagesLoaded();
				}
			};
			this.sprite[img].onerror = function (){
				This.errNum++;
			};
			this.sprite[img].src = json[img];
		}
	};
	ImagesLoad.prototype.imagesLoaded = noop;
	ImagesLoad.prototype.getResult = function (id){
		return this.sprite[id];
	};
	JC.ImagesLoad = ImagesLoad;
	/* 结束 纹理预加载 */

	if (typeof exports !== 'undefined') {
	    if (typeof module !== 'undefined' && module.exports) {
	        exports = module.exports = JC;
	    }
	    exports.JC = JC;
	} else if (typeof define !== 'undefined' && define.amd) {
	    define(JC);
	}

})();