//$.fn.hexed = function() {
$(function(){
  $( "#red, #green, #blue" ).slider({
    orientation: "horizontal",
    range: "min",
    min: 0,
    max: 255,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $( "#red" ).slider( "value", 0 );
  $( "#green" ).slider( "value", 0 );
  $( "#blue" ).slider( "value", 0 );

  $( "#input_red" ).change(function() {
    $( "#red" ).slider( "value", $(this).val() );
  });
  $( "#input_green" ).change(function() {
    $( "#green" ).slider( "value", $(this).val() );
  });
  $( "#input_blue" ).change(function() {
    $( "#blue" ).slider( "value", $(this).val() );
  });

});

function refreshSwatch() {
  var red = $( "#red" ).slider( "value" ),
  green = $( "#green" ).slider( "value" ),
  blue = $( "#blue" ).slider( "value" ),
  color = "rgb(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ")";
  $( "#swatch" ).css( "background-color", color);
  $('#input_red').val(red);
  $('#input_green').val(green);
  $('#input_blue').val(blue);
}
$.fn.hexed = function(options) {
    // Establish default settings
    var 
    defaults = {
		difficulty: 5,
		turns: 10
    },
    settings = $.extend({}, defaults, options),
    difficulty,
    turns;
    $("#display").width(200).height(200); 
    for (item in settings) {
      if(item.first = difficulty)
        difficulty = item.second;
      else if(item.first = turns)
        turns = item.second;
    }
    var start, r, g, b,
	startGame, showResult, next;
	
    startGame = function() {
    	  total_score = Math.floor(0);
	  $(this).text("Got it!");
	  start =  new Date().getTime();
	  
	  r = Math.floor(255*Math.random()); 
	  g = Math.floor(255*Math.random());
	  b = Math.floor(255*Math.random());
	  var randomCol = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
	  $("#rand_swatch").css("background-color", randomCol);
	  
	  $("input[name=difficulty]").attr("disabled", "disabled");
	  $("input[name=turns]").attr("disabled", "disabled");
	  $("#game").show("slow");
	  $(this).unbind().click(showResult);
	},
	

	showResult = function(){
	  $(this).text("Next");
	  var red = $( "#red" ).slider( "value" ),
	  green = $( "#green" ).slider( "value" ),
	  blue = $( "#blue" ).slider( "value" ),
	  
	  accuracy = (Math.abs(r - red) + Math.abs(g - green) + Math.abs(b - blue))/765,
	  milliseconds_taken =  new Date().getTime() - start,
	  score = Math.floor(((15 - accuracy*100)/(15))
			  * (15000-milliseconds_taken));
	  if(score < 0)
		score = 0;
	  total_score += score;
	  $("#scoreboard").text( score.toString() );
	  $("#swatch").show("slow");
	  $("#result").show("slow");
	  var y = $(window).scrollTop();
	  $("#result").scrollTop(y + 800);  
	  $( "#red, #green, #blue" ).slider({ disabled: true });
	  $("#input_red, #input_green, #input_blue").attr("disabled", "disabled");
	  $("input[type=submit]").attr("disabled", "disabled");
	  $(this).unbind().click(next);
	},

	next = function (){
	  if(turns != 0) {
        $(this).text("Got it!");
		turns--;
		$('#input_red').val(0);
        $('#input_green').val(0);
        $('#input_blue').val(0);
        $( "#red, #green, #blue").slider("option", "value", $("#red, #green, #blue").slider("option", "min"));
		$( "#red, #green, #blue" ).slider({ disabled: false});
	    $("#input_red").attr("disabled", false);
	    $("#input_green").attr("disabled", false);
		$("#input_blue").attr("disabled", false);
	    $("input[type=submit]").attr("disabled", false);
		$("#swatch").hide("slow");
	    $("#result").hide("slow");
		start =  new Date().getTime();
	    r = Math.floor(255*Math.random()); 
	    g = Math.floor(255*Math.random());
	    b = Math.floor(255*Math.random());
	    var randomCol = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
	    $("#rand_swatch").css("background-color", randomCol);
		$(this).unbind().click(showResult);
		start =  new Date().getTime();
	  } else {
	  	$("#total_score").text(total_score);
		$("#final_score").show();
		//end of game
	  }
	};
	$(this).click(startGame);
}
