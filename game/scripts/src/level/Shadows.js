(function(exports){

	var Shadows = function(level,config){

		var self = this;

		// Properties
		this.level = level;
		this.config = config;
		
		///////////////////////
		///// UPDATE LOOP /////
		///////////////////////

		this.update = function(){};

		/////////////////////
		///// DRAW LOOP /////
		/////////////////////

		this.dirtyCam = true;
		this.draw = function(){

	    	// Draw Player Shadow
			ctx = Display.context.shadows;
			ctx.clearRect(0,0, level.map.width, level.map.height);
			var player = level.player;
		    _drawShadow(ctx,player.x,player.y);

	    	// DIRTY
			if(!self.dirtyCam) return;
			self.dirtyCam = false;

			// Draw shadows of ACTIVE cameras
			ctx = Display.context.shadowsCam;
			ctx.fillStyle = "#000";
			ctx.fillRect(0,0, level.map.width, level.map.height);
			var prisms = level.prisms.prisms;
			for(var i=0;i<prisms.length;i++){
				var cam = prisms[i];
				if(!cam.active) continue;
				var cachedCanvas = cam.canvas;
				ctx.globalCompositeOperation = "destination-in";
				ctx.drawImage(cachedCanvas,0,0);
			}

		};
		var _drawShadow = function(ctx,lightX,lightY){

			// Restore Canvas
			ctx.globalCompositeOperation = "source-over";

			// Base Shadows
			ctx.fillStyle = "#000";
			_drawShadow2(ctx,lightX,lightY);

			// Fuzzy Shadows
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			_drawShadow2(ctx,lightX+10,lightY);
			_drawShadow2(ctx,lightX-10,lightY);
			_drawShadow2(ctx,lightX,lightY+5);
			_drawShadow2(ctx,lightX,lightY-5);
			
		};
		var _drawShadow2 = function(ctx,lightX,lightY){

			var vector, vectorLength;
			var shadows = config.shadows;

			// Draw Shadow
		    for(var i=0;i<shadows.length;i++){
				var shadow = shadows[i];

				// Begin drawing shadow
		    	ctx.beginPath();

			    // From the start of the wall to the end of the wall
			    ctx.moveTo(shadow.ax,shadow.ay);
			    ctx.lineTo(shadow.bx,shadow.by);

			    // From the end of the wall to a far enough distance away from the light source.
			    vector = { x:shadow.bx-lightX, y:shadow.by-lightY };
			    vectorLength = Math.sqrt(vector.x*vector.x+vector.y*vector.y);
			    vector.x *= 1000000/vectorLength;
			    vector.y *= 1000000/vectorLength;
			    ctx.lineTo(shadow.bx+vector.x,shadow.by+vector.y);

			    // From the start of the wall to a far enough distance away from the light source.
			    vector = { x:shadow.ax-lightX, y:shadow.ay-lightY };
			    vectorLength = Math.sqrt(vector.x*vector.x+vector.y*vector.y);
			    vector.x *= 1000000/vectorLength;
			    vector.y *= 1000000/vectorLength;
			    ctx.lineTo(shadow.ax+vector.x,shadow.ay+vector.y);

			    // Fill in the shadow
		    	ctx.fill();

			}

		};
		this.drawShadow = _drawShadow;

	};

	exports.Shadows = Shadows;

})(window);