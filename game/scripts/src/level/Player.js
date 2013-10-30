(function(exports){

	var Player = function(level,config){
		
		var self = this;

		// Properties
		this.level = level;
		this.config = config;
		this.x = config.x;
		this.y = config.y;
		this.vx = this.vy = 0;

		///////////////////////
		///// UPDATE LOOP /////
		///////////////////////

		this.update = function(){

		    // Velocity player
		    var MAX_SPEED = Key.shift ? 12 : 6;
		    this.vx += (Key.left ? -3 : 0) + (Key.right ? 3 : 0);
		    this.vy += (Key.up ? -3 : 0) + (Key.down ? 3 : 0);
		    this.vx = this.vx>MAX_SPEED ? MAX_SPEED : (this.vx<-MAX_SPEED ? -MAX_SPEED : this.vx); // Limit to 20 max
		    this.vy = this.vy>MAX_SPEED ? MAX_SPEED : (this.vy<-MAX_SPEED ? -MAX_SPEED : this.vy); // Limit to 20 max
		    this.vx = (!Key.left && !Key.right) ? this.vx*0.5 : this.vx; // Stop if no keys
		    this.vy = (!Key.up && !Key.down) ? this.vy*0.5 : this.vy; // Stop if no keys

		    // Stop completely
		    if(Math.abs(this.vx)<0.01) this.vx=0;
		    if(Math.abs(this.vy)<0.01) this.vy=0;

		    // Move
		    this.x += this.vx;
		    this.y += this.vy;

		    // Crappy Collision
		    var endLoop = MAX_SPEED*5;
		    while(level.map.hitTest(this.x+15+this.vx,this.y) && (endLoop--)>0) this.x-=1;
		    while(level.map.hitTest(this.x-15+this.vx,this.y) && (endLoop--)>0) this.x+=1;
		    while(level.map.hitTest(this.x,this.y+10+this.vy) && (endLoop--)>0) this.y-=1;
		    while(level.map.hitTest(this.x,this.y-10+this.vy) && (endLoop--)>0) this.y+=1;
		    if(endLoop<=0) console.log("WOOPS");


		    /////////////////////////////////////////////////
		    // FRAME LOGIC: For stable walking despite FPS //
		    /////////////////////////////////////////////////


			// Facing which way?
		    if(Key.left && !Key.right) faceDirection = -1;
		    if(Key.right && !Key.left) faceDirection = 1;

			// Frame Logic: VERY CUSTOMIZED FOR THE BAG SWINGING
		    if(Key.left || Key.right || Key.up || Key.down){
		    	// Loop walk
		    	if(frameIndex<99||frameIndex>117){
		    		frameIndex=99;
		    	}else{
		    		frameIndex+= Key.shift ? 2 : 1; // for faster running
		    		if(frameIndex>117) frameIndex=118;
		    	}
		    }else{
		    	if(frameIndex>50){
		    		// Swing the bag the right way when you stop
		    		if(frameIndex>=105&&frameIndex<=116){
		        		frameIndex = 3;
		        	}else{
		        		frameIndex = 0;
		        	}
		        }else if(frameIndex<48){
		        	frameIndex+=1; // for faster running
		        	if(frameIndex>48) frameIndex=49;
		        }else{
		        	frameIndex=10;
		        }
		    }

			// Footstep Sounds!
			var cx = level.camera.x;
			var pan = (this.x-cx)/(Display.width/2);
			var onMetal = (level.map.getTile(self.x,self.y)==Map.METAL);
			if(frameIndex==101){
				if(onMetal){
					createjs.Sound.play("sfx_metal_footstep_1", null,0,0,false,1.0,pan);
				}else{
					createjs.Sound.play("sfx_footstep_1", null,0,0,false,0.3,pan);
				}
			}
			if(frameIndex==111){
				if(onMetal){
					createjs.Sound.play("sfx_metal_footstep_2", null,0,0,false,1.0,pan);
				}else{
					createjs.Sound.play("sfx_footstep_2", null,0,0,false,0.3,pan);
				}
			}

		};

		/////////////////////
		///// DRAW LOOP /////
		/////////////////////

		var ctx = Display.context.props;
		var frameIndex = 0;
		var faceDirection = 1;
		this.draw = function(){

		    // Which Spritesheet to use
		    var sprite = self.holdingPrism ? Asset.sprite.girlWithPrism : Asset.sprite.girl;
			var spriteImage = sprite.image;
			var spriteData = sprite.data;

			// Draw frame
			var frame = spriteData.frames[frameIndex].frame;
			ctx.save();
		    ctx.translate(this.x,this.y);
		    ctx.scale(0.5,0.5);
		    ctx.scale(faceDirection,1); // Player facing
		    ctx.translate(-150,-250); // The footing offset

		    var offset = spriteData.frames[frameIndex].spriteSourceSize;
		    ctx.translate(offset.x,offset.y);
		    ctx.drawImage(spriteImage,frame.x,frame.y,frame.w,frame.h,0,0,frame.w,frame.h);

			// Draw shade of YOU
			// How transparent is your part of the BACKGROUND canvas?
			/*var px = self.x - (level.camera.x-Display.width/2);
			var py = self.y - (level.camera.y-Display.height/2);
			px = Math.round(px);
			py = Math.round(py);
			var imageData = Display.context.background.getImageData(px,py,1,1); // What happens when you're OUT of screen?!
			var alpha = 1-(imageData.data[3]/255);*/
			/*ctx.save();
			ctx.globalCompositeOperation = "source-atop";
			ctx.fillStyle = "rgba(0,0,0,"+alpha.toFixed(1)+")";
			ctx.fillRect(-500,-500,1000,1000);
			ctx.restore();*/

			// Restore again
			ctx.restore();

		};

	};

	exports.Player = Player;

})(window);