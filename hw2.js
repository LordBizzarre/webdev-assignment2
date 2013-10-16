$.fn.hexed = function(settings) {
	$("#display").width(200).height(200);
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
	
	for(var i = 0; i < turns; i++) {
		var r = Math.floor(255*Math.random());
		var g = Math.floor(255*Math.random());
		var b = Math.floor(255*Math.random());
		var randomColor = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")"
		$("#display").css("background-color", randomColor);
	}
}

function refreshVal() {
    var red = $("#red_slider").slider("value")
      ,green = $("#green_slider").slider("value")
      ,blue = $("#blue_slider").slider("value")
      ,hex = hexFromRGB(red, green, blue);
    $("#display").css("background-color", "rgb(red, green, blue)");
    $("#red_val").val(red);
    $("#green_val").val(green);
    $("#blue_val").val(blue);
  }

$(function() {
    $( "#red_slider, #green_slider, #blue_slider" ).slider({
    	orientation: 'horizontal',
      	min: 0,
      	max: 255,
      	value: 0,
      	slide: function (event, ui) {
            $("#testval").text( ui.value);
        }
      	//slide: refreshVal,
      	change: refreshVal
    });
});
