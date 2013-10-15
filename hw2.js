//Javascript File for hw2
 $.fn.hexed = function(settings) {
	var difficulty = -1;
	var turns = -1;
	if(settings != null) {
		for item in settings {
			if(item.first = "difficulty")
				difficulty = item.second;
			else if(item.first = "turns")
				turns = item.second;
		}
	}
	if(turns == -1)
		turns = 10;
	if(difficulty == -1)
		difficulty = 5;
}
