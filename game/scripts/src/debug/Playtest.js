(function(exports){

	// MODIFIES GAME CONTROLLER

	// Go To Level
	var _prevGotoLevel = Game.gotoLevel;
	Game.gotoLevel = function(index){

		// Level Select
		var lvlSelectorCurrent = document.getElementById("level_"+Game.levelIndex);
		var lvlSelectorNext = document.getElementById("level_"+index);
		if(lvlSelectorCurrent){
			lvlSelectorCurrent.style.background = "";
			lvlSelectorCurrent.style.color = "";
		}
		if(lvlSelectorNext){
			lvlSelectorNext.style.background = "#fff";
			lvlSelectorNext.style.color = "#000";
		}

		// IS there a next level?
		if(_prevGotoLevel(index)){
	
			// Tutorial Message
			var message = {
				intro: "Arrow keys to move. Hold shift to run.",
				tut_look_1: "DON'T HIDE. Always be in plain view of at least one Eye.",
				tut_look_2: "If you can't see an Eye, it can't see you.",
				tut_pickup: "Space to pick up/drop an Eye.",
				puzzle_bridge: "Upgrade! Now you can see what the Eyes see!",
				tut_blackout: "The Eyes can see in the dark.",
				puzzle_huge: "Finally, have a big puzzle room."
			};
			
			var nextLevelName = Game.config.levels[Game.levelIndex];
			document.getElementById("tutorial_message").innerHTML = message[nextLevelName];

		}else{
			
			// You Won The Game
			document.getElementById("ending_screen").style.display = "block";
			Game.kill();

		}

	};

	// Next Level
	var _prevNextLevel = Game.nextLevel;
	Game.nextLevel = function(){
		
		// Clear the currently selected bar
		var lvlSelectorCurrent = document.getElementById("level_"+Game.levelIndex);
		if(lvlSelectorCurrent){
			lvlSelectorCurrent.style.background = "";
			lvlSelectorCurrent.style.color = "";
		}

		_prevNextLevel();

	};

})(window);