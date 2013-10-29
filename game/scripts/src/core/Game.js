(function(exports){

	// Singleton
	var Game = {};
	exports.Game = Game;

	// Init config
	Game.init = function(config){
		Game.config = config;
	};

	// Start game
	var gameLoop;
	var gameKilled = false;
	Game.start = function(){

		// HACK: Any way to pause the RAF? It does take a lot of CPU...

		// Update loop
		gameLoop = setInterval(function(){
			if(Game.level) Game.level.update();
		},1000/30);

		// Draw Loop
		var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
		function draw(){
			if(Game.level) Game.level.draw();
			else Display.clear();
			Debug.fps();
			if(!gameKilled){
				RAF(draw);
			}
		}
		draw();

		// First level
		Game.gotoLevel(0);

	};

	// HACK: Just cause. 
	Game.kill = function(){
		gameKilled = true;
		clearInterval(gameLoop);
	};

	// Level Flow
	var levelIndex = 0;
	Game.level = null;
	Game.clearLevel = function(){
		if(Game.level){
			Game.level.kill();
			Game.level = null;
		}
		Display.clear();
	};
	Game.gotoLevel = function(index){

		Game.clearLevel();

		// HACK: Level Select
		var lvlSelectorCurrent = document.getElementById("level_"+levelIndex);
		var lvlSelectorNext = document.getElementById("level_"+index);
		if(lvlSelectorCurrent){
			lvlSelectorCurrent.style.background = "";
			lvlSelectorCurrent.style.color = "";
		}
		if(lvlSelectorNext){
			lvlSelectorNext.style.background = "#fff";
			lvlSelectorNext.style.color = "#000";
		}
		
		levelIndex = index;
		var nextLevelName = Game.config.levels[levelIndex];
		if(nextLevelName){
			
			var levelConfig = Asset.level[nextLevelName];
			Game.level = new Level(levelConfig);

			// HACK: Tutorial Message
			var message = {
				intro: "Arrow keys to move. Hold shift to run.",
				tut_look_1: "DON'T HIDE. Always be in plain view of at least one Eye.",
				tut_look_2: "If you can't see an Eye, it can't see you.",
				tut_pickup: "Space to pick up/drop an Eye.",
				puzzle_bridge: "Upgrade! Now you can see what the Eyes see!",
				tut_blackout: "The Eyes can see in the dark.",
				puzzle_huge: "Finally, have a big puzzle room."
			};
			document.getElementById("tutorial_message").innerHTML = message[nextLevelName];

		}else{
			
			// HACK: You Won The Game
			document.getElementById("ending_screen").style.display = "block";
			Game.kill();

		}

	}
	Game.nextLevel = function(){

		// HACK: Level Select
		var lvlSelectorCurrent = document.getElementById("level_"+levelIndex);
		if(lvlSelectorCurrent){
			lvlSelectorCurrent.style.background = "";
			lvlSelectorCurrent.style.color = "";
		}

		levelIndex++;
		Game.gotoLevel(levelIndex);
	};
	Game.resetLevel = function(){
		Game.gotoLevel(levelIndex);
	};

})(window);