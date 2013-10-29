Display.init({
	dom: document.getElementById("game_container"),
	width:960, height:600
});

Asset.init({
	images:{
		//snow:'assets/textures/snow.png'
	},
	sprites:{
		girl:'assets/sprites/girl',
		girlWithPrism:'assets/sprites/girlWithPrism',
		MrPrism:'assets/sprites/MrPrism'
	},
	sounds:{
		//music_creepy:{src:'assets/music/bg.ogg', data:1},

		sfx_shotdown:{src:'assets/sounds/shotdown.ogg', data:1},
		sfx_alarm:{src:'assets/sounds/alarm.ogg', data:1},
		
		sfx_prism_pickup:{src:'assets/sounds/prism_pickup.ogg', data:2},
		sfx_prism_putdown:{src:'assets/sounds/prism_putdown.ogg', data:2},
		sfx_prism_pickup_soft:{src:'assets/sounds/prism_pickup_soft.ogg', data:2},
		sfx_prism_putdown_soft:{src:'assets/sounds/prism_putdown_soft.ogg', data:2},

		sfx_footstep_1:{src:'assets/sounds/step_1.ogg', data:2},
		sfx_footstep_2:{src:'assets/sounds/step_2.ogg', data:2},
		sfx_metal_footstep_1:{src:'assets/sounds/metal_step_1.ogg', data:2},
		sfx_metal_footstep_2:{src:'assets/sounds/metal_step_2.ogg', data:2}

	},
	levels:{
		intro: 'levels/intro',
		tut_look_1: 'levels/tut_look_1',
		tut_look_2: 'levels/tut_look_2',
		tut_pickup: 'levels/tut_pickup',
		tut_blackout: 'levels/tut_blackout',
		puzzle_bridge: 'levels/puzzle_bridge',
		puzzle_huge: 'levels/puzzle_huge'
	},
});

Game.init({
	levels:[
		'intro',
		'tut_look_1',
		'tut_look_2',
		'tut_pickup',
		'puzzle_bridge',
		'tut_blackout',
		'puzzle_huge'
	]
});