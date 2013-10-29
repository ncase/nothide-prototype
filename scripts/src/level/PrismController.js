(function(exports){

	var PrismController = function(level,config){

		var self = this;
		
		// Properties
		this.level = level;
		this.config = config;
		this.prisms = [];


		///////////////////////
		///// UPDATE LOOP /////
		///////////////////////

		var isHoldingPrism = false;
		var lastSpace = false;
		this.update = function(){

			// Adding/Removing a new light.
			var player = level.player;
		    if(!lastSpace && Key.space){

		    	// Are you near a light?
		    	var nearPrism = self.isNearPrism(player.x,player.y,50);
		    	if(nearPrism && !isHoldingPrism){

		    		// Remove light
		    		index = self.prisms.indexOf(nearPrism);
		    		if(index>=0) self.prisms.splice(index,1);

		    		// Pick it up!
		    		isHoldingPrism = true;
		    		level.player.holdingPrism = true;
		    		createjs.Sound.play( nearPrism.active ? "sfx_prism_pickup" : "sfx_prism_pickup_soft", null,0,0,false,0.4);

		    		// Dirty
		    		level.shadows.dirtyCam = true;

		    	}else if(isHoldingPrism){
		    		
		    		// Logic
		    		self.addPrism(player.x,player.y);
		    		isHoldingPrism = false;
		    		level.player.holdingPrism = false;

		    		// Sound
		    		var isMetal = (level.map.getTile(player.x,player.y)==Map.METAL);
		    		createjs.Sound.play( isMetal ? "sfx_prism_putdown" : "sfx_prism_putdown_soft", null,0,0,false,0.4);

		    		// Dirty
		    		level.shadows.dirtyCam = true;

				}

		    }
		    lastSpace = Key.space;

		};

		/////////////////////
		///// DRAW LOOP /////
		/////////////////////

		this.draw = function(){
			// Hack
			for(var i=0;i<self.prisms.length;i++){
				self.prisms[i].draw();
	    	}
		};

		///////////////////
		///// HELPERS /////
		///////////////////

		this.isNearPrism = function(x,y,size){
			for(var i=0;i<self.prisms.length;i++){
				var prism = self.prisms[i];
				var dx = Math.abs(prism.x-x);
				var dy = Math.abs(prism.y-y);
				if(dx<size&&dy<size) return prism;
			}
			return null;
		};

		this.addPrism = function(x,y){

			var isMetal = (level.map.getTile(x,y)==Map.METAL);

			// New Cam
			var prism = new Prism(level);
			prism.x = x;
			prism.y = y;

			if(isMetal){

				// Shadow Canvas cache
		    	var temp_shadowCanvas = document.createElement("canvas");
				var temp_shadowContext = temp_shadowCanvas.getContext("2d");
				temp_shadowCanvas.width = level.map.width;
				temp_shadowCanvas.height = level.map.height;
				level.shadows.drawShadow(temp_shadowContext,x,y);

				// Push light
				prism.active = true;
				prism.canvas = temp_shadowCanvas;
				self.prisms.push(prism);

				// Dirty!
				self.dirtyCam = true;

			}else{
				prism.active = false;
				self.prisms.push(prism);
			}

		};


		//////////
		// INIT //
		//////////

		for(var i=0;i<config.prisms.length;i++){
			var prism = config.prisms[i];
			this.addPrism(prism.x,prism.y);
		}


	};

	exports.PrismController = PrismController;

})(window);