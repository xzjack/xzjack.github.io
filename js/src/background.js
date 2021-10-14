// build time:Thu Oct 14 2021 17:39:54 GMT+0800 (GMT+08:00)
"use strict";var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||false;s.configurable=true;if("value"in s)s.writable=true;Object.defineProperty(t,s.key,s)}}return function(e,i,s){if(i)t(e.prototype,i);if(s)t(e,s);return e}}();function _classCallCheck(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var Progress=function(){function t(){var e=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];_classCallCheck(this,t);this.timestamp=null;this.duration=e.duration||t.CONST.DURATION;this.progress=0;this.delta=0;this.progress=0;this.isLoop=!!e.isLoop;this.reset()}t.prototype.reset=function e(){this.timestamp=null};t.prototype.start=function i(t){this.timestamp=t};t.prototype.tick=function s(t){if(this.timestamp){this.delta=t-this.timestamp;this.progress=Math.min(this.delta/this.duration,1);if(this.progress>=1&&this.isLoop){this.start(t)}return this.progress}else{return 0}};_createClass(t,null,[{key:"CONST",get:function n(){return{DURATION:1e3}}}]);return t}();var Confetti=function(){function t(e){_classCallCheck(this,t);this.parent=e.elm||document.body;this.canvas=document.createElement("canvas");this.ctx=this.canvas.getContext("2d");this.width=e.width||this.parent.offsetWidth;this.height=e.height||this.parent.offsetHeight;this.length=e.length||t.CONST.PAPER_LENGTH;this.yRange=e.yRange||this.height*2;this.progress=new Progress({duration:e.duration,isLoop:true});this.rotationRange=typeof e.rotationLength==="number"?e.rotationRange:10;this.speedRange=typeof e.speedRange==="number"?e.speedRange:10;this.sprites=[];this.canvas.style.cssText=["display: block","position: absolute","top: 0","left: 0","opacity: 0.3","pointer-events: none"].join(";");this.render=this.render.bind(this);this.build();this.parent.append(this.canvas);this.progress.start(performance.now());requestAnimationFrame(this.render)}t.prototype.build=function e(){for(var e=0;e<this.length;++e){var i=document.createElement("canvas"),s=i.getContext("2d");i.width=t.CONST.SPRITE_WIDTH;i.height=t.CONST.SPRITE_HEIGHT;i.position={initX:Math.random()*this.width,initY:-i.height-Math.random()*this.yRange};i.rotation=this.rotationRange/2-Math.random()*this.rotationRange;i.speed=this.speedRange/2+Math.random()*(this.speedRange/2);s.save();s.fillStyle=t.CONST.COLORS[Math.random()*t.CONST.COLORS.length|0];s.fillRect(0,0,i.width,i.height);s.restore();this.sprites.push(i)}};t.prototype.render=function i(e){var i=this.progress.tick(e);this.canvas.width=this.width;this.canvas.height=this.height;for(var s=0;s<this.length;++s){this.ctx.save();this.ctx.translate(this.sprites[s].position.initX+this.sprites[s].rotation*t.CONST.ROTATION_RATE*i,this.sprites[s].position.initY+i*(this.height+this.yRange));this.ctx.rotate(this.sprites[s].rotation);this.ctx.drawImage(this.sprites[s],-t.CONST.SPRITE_WIDTH*Math.abs(Math.sin(i*Math.PI*2*this.sprites[s].speed))/2,-t.CONST.SPRITE_HEIGHT/2,t.CONST.SPRITE_WIDTH*Math.abs(Math.sin(i*Math.PI*2*this.sprites[s].speed)),t.CONST.SPRITE_HEIGHT);this.ctx.restore()}requestAnimationFrame(this.render)};_createClass(t,null,[{key:"CONST",get:function s(){return{SPRITE_WIDTH:9,SPRITE_HEIGHT:16,PAPER_LENGTH:100,DURATION:8e3,ROTATION_RATE:50,COLORS:["#EF5350","#EC407A","#AB47BC","#7E57C2","#5C6BC0","#42A5F5","#29B6F6","#26C6DA","#26A69A","#66BB6A","#9CCC65","#D4E157","#FFEE58","#FFCA28","#FFA726","#FF7043","#8D6E63","#BDBDBD","#78909C"]}}}]);return t}();(function(){var t=12e3*(document.documentElement.scrollHeight/window.innerHeight),e=24*(document.documentElement.scrollHeight/window.innerHeight);new Confetti({width:window.innerWidth,height:document.documentElement.scrollHeight,length:e,duration:t});setTimeout(function(){new Confetti({width:window.innerWidth,height:document.documentElement.scrollHeight,length:e,duration:t})},t/2)})();
//rebuild by neat 